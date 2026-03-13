package com.onchainerslab.cryptospell

import android.util.Base64
import android.util.Log
import androidx.core.net.toUri
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.solana.mobilewalletadapter.clientlib.ActivityResultSender
import com.solana.mobilewalletadapter.clientlib.ConnectionIdentity
import com.solana.mobilewalletadapter.clientlib.MobileWalletAdapter
import com.solana.mobilewalletadapter.clientlib.TransactionResult
import com.solana.mobilewalletadapter.clientlib.protocol.MobileWalletAdapterClient.AuthorizationResult
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.atomic.AtomicBoolean
import com.solana.mobilewalletadapter.common.signin.SignInWithSolana

@CapacitorPlugin(name = "SolanaMobile")
@Suppress("unused")
class SolanaMobilePlugin : Plugin() {
    private val tag = "SolanaMobilePlugin"

    interface NativeCallback {
        fun onSuccess(address: String)
        fun onError(message: String)
    }

    // --- Sanitized identity (share-safe) ---
    private val identity = ConnectionIdentity(
        identityUri = "https://cryptospell.app/".toUri(),
        iconUri = "favicon.ico".toUri(),
        identityName = "Cryptospell"
    )

    private val walletAdapter: MobileWalletAdapter by lazy {
        MobileWalletAdapter(identity, 10000)
    }

    private val scope = CoroutineScope(Dispatchers.IO)
    private lateinit var sender: ActivityResultSender

    @Volatile private var pendingCall: PluginCall? = null
    @Volatile private var connectInProgress = false
    @Volatile private var signingInProgress = false
    private var retryCount = 0
    private val mwaResultDelivered = AtomicBoolean(false)

    // Config & Feature Flags
    private var customRpcUrl = "https://mainnet.helius-rpc.com/?api-key=0244eab8-f8f1-4afb-b984-714b588e8f84"

    override fun load() {
        super.load()
        sender = ActivityResultSender(activity)
        Log.d(tag, "Plugin loaded, sender initialized")
    }

    override fun handleOnResume() {
        super.handleOnResume()
        scope.launch {
            delay(60000) // Give them 60 seconds to connect/sign
            if (pendingCall != null && connectInProgress && !signingInProgress && !mwaResultDelivered.get()) {
                withContext(Dispatchers.Main) {
                    Log.w(tag, "handleOnResume: MWA timeout — assuming user cancelled wallet connection")
                    pendingCall?.reject("Connection cancelled by user — wallet did not respond within 60 seconds.")
                    clearState()
                }
            }
        }
    }

    fun connectNatively(callback: NativeCallback) {
        val currentActivity = activity
        if (currentActivity == null) {
            callback.onError("Activity is null")
            return
        }

        val sender = ActivityResultSender(currentActivity)
        scope.launch {
            try {
                // Since walletAdapter is lazy, accessing it will initialize it.
                // MobileWalletAdapter doesn't throw on init usually.
                val result = walletAdapter.transact(sender) {
                    authorize(identity.identityUri, identity.iconUri, identity.identityName, chain = "solana:mainnet")
                }
                
                when (result) {
                    is TransactionResult.Success -> {
                        val firstAccount = result.payload.accounts.firstOrNull()
                        val address = firstAccount?.publicKey?.let { encodeBase58(it) } ?: ""
                        callback.onSuccess(address)
                    }
                    is TransactionResult.NoWalletFound -> callback.onError("No wallet found")
                    is TransactionResult.Failure -> callback.onError(result.message)
                }
            } catch (e: Exception) {
                Log.e(tag, "Connect natively crashed", e)
                callback.onError(e.message ?: "Crashed")
            }
        }
    }

    @PluginMethod
    fun connect(call: PluginCall) {
        if (connectInProgress || signingInProgress) {
            call.reject("Wallet operation already in progress")
            return
        }
        connectInProgress = true
        signingInProgress = false
        mwaResultDelivered.set(false)
        pendingCall = call
        retryCount = 0
        scope.launch {
            doConnect()
        }
    }

    private suspend fun doConnect() {

        val result: TransactionResult<AuthorizationResult> = try {
            walletAdapter.transact(sender) { 
                authorize(
                    identity.identityUri,
                    identity.iconUri,
                    identity.identityName,
                    chain = "solana:mainnet"
                )
            }
        } catch (e: Exception) {
            TransactionResult.Failure("MWA transact failed: ${e.message}", e)
        }

        withContext(Dispatchers.Main) {
            handleResult(result)
        }
    }

    private fun handleResult(result: TransactionResult<AuthorizationResult>) {
        mwaResultDelivered.set(true)
        val call = pendingCall ?: return

        when (result) {
            is TransactionResult.Success -> {
                try {
                    val authResult = result.payload
                    val first = authResult.accounts.first()
                    val pubKeyBytes = first.publicKey
                    val pubKeyBase64 = Base64.encodeToString(pubKeyBytes, Base64.NO_WRAP)
                    val pubKeyBase58 = encodeBase58(pubKeyBytes)
                    val authToken = authResult.authToken

                    val ret = JSObject().apply {
                        put("success", true)
                        put("publicKeyBase64", pubKeyBase64)
                        put("publicKeyBase58", pubKeyBase58)
                        put("authToken", authToken)
                    }

                    authResult.signInResult?.let {
                        ret.put("signature", Base64.encodeToString(it.signature, Base64.NO_WRAP))
                    }
                    call.resolve(ret)
                } catch (e: Exception) {
                    call.reject("Failed to parse wallet response: ${e.message}")
                }
                clearState()
            }
            is TransactionResult.Failure -> {
                Log.e(tag, "MWA returned Failure: ${result.message}", result.e)
                call.reject("MWA returned Failure: ${result.message}")
                clearState()
            }
            is TransactionResult.NoWalletFound -> {
                Log.w(tag, "MWA returned NoWalletFound")
                call.reject("No compatible wallet found. Please install Phantom or Solflare.")
                clearState()
            }
        }
    }

    @PluginMethod
    fun signAndSendTransaction(call: PluginCall) {
        val txBase64 = call.getString("txBase64") ?: return call.reject("Missing txBase64")
        val rpcUrl = call.getString("rpcUrl") ?: customRpcUrl
        if (connectInProgress || signingInProgress) return call.reject("Wallet operation already in progress")

        signingInProgress = true
        connectInProgress = false
        pendingCall = call
        mwaResultDelivered.set(false)

        scope.launch {
            try {
                val txBytes = Base64.decode(txBase64, Base64.DEFAULT)
                Log.d(tag, "signAndSendTransaction: requesting wallet signature...")
                val signResult = walletAdapter.transact(sender) {
                    signTransactions(arrayOf(txBytes))
                }

                mwaResultDelivered.set(true)

                if (signResult !is TransactionResult.Success) {
                    val reason = if (signResult is TransactionResult.Failure) signResult.message else "unknown"
                    call.reject("Transaction signing declined by wallet: $reason")
                    return@launch
                }

                Log.d(tag, "signAndSendTransaction: wallet signed, sending to RPC...")
                val signedTxBase64 = Base64.encodeToString(signResult.payload.signedPayloads.first(), Base64.NO_WRAP) 
                
                val signature: String
                try {
                    signature = sendTransactionToRpc(signedTxBase64, rpcUrl)
                        ?: throw Exception("RPC returned empty result — check your API key and network")
                } catch (e: Exception) {
                    call.reject("RPC submission failed: ${e.message}")
                    return@launch
                }

                Log.d(tag, "signAndSendTransaction: tx submitted, confirming $signature...")
                if (confirmTransaction(signature, rpcUrl)) {
                    call.resolve(JSObject().put("ok", true).put("txSignature", signature))
                } else {
                    call.resolve(JSObject().put("ok", true).put("txSignature", signature))
                    Log.w(tag, "Transaction sent but slow confirmation. Signature: $signature")
                }
            } catch (e: Exception) {
                Log.e(tag, "signAndSendTransaction error: ${e.message}", e)
                call.reject(e.message ?: "Unknown error in signAndSendTransaction")
            } finally {
                clearState()
            }
        }
    }

    // --- HELPER METHODS ---

    private fun sendTransactionToRpc(signedTxBase64: String, rpcUrl: String = customRpcUrl): String? {
        val params = JSONArray().put(signedTxBase64).put(JSONObject().put("encoding", "base64"))
        val request = JSONObject().put("jsonrpc", "2.0").put("id", 1).put("method", "sendTransaction").put("params", params)

        val result = postJsonDetailed(rpcUrl, request, emptyMap())
        val response = result.json

        if (response != null && response.has("error")) {
            val errorObj = response.optJSONObject("error")
            val message = errorObj?.optString("message") ?: "Unknown RPC error"
            throw Exception("RPC Error: $message")
        }

        return response?.optString("result")
    }

    private suspend fun confirmTransaction(signature: String, rpcUrl: String = customRpcUrl): Boolean {
        val start = System.currentTimeMillis()
        while (System.currentTimeMillis() - start < 60000) {
            delay(2000)
            val params = JSONArray().put(JSONArray().put(signature))
            val request = JSONObject().put("jsonrpc", "2.0").put("id", 1).put("method", "getSignatureStatuses").put("params", params)
            val result = postJson(rpcUrl, request)?.optJSONObject("result")?.optJSONArray("value")
            if (result != null && result.length() > 0 && !result.isNull(0)) {
                val status = result.getJSONObject(0).optString("confirmationStatus")
                if (status == "confirmed" || status == "finalized") return true
            }
        }
        return false
    }

    data class PostResult(val json: JSONObject?, val error: String? = null)

    private fun postJson(urlStr: String, jsonBody: JSONObject): JSONObject? {
        return postJsonDetailed(urlStr, jsonBody, emptyMap()).json
    }

    private fun postJsonDetailed(urlStr: String, jsonBody: JSONObject, headers: Map<String, String>): PostResult {
        var conn: HttpURLConnection? = null
        return try {
            val isDebug = try {
                val buildConfigClass = Class.forName("com.cryptospell.game.BuildConfig")
                val debugField = buildConfigClass.getField("DEBUG")
                debugField.getBoolean(null)
            } catch (e: Exception) {
                false
            }

            if (isDebug) {
                val safeHeaders = headers.toMutableMap().apply {
                    if (containsKey("x-app-key")) this["x-app-key"] = "REDACTED"
                    if (containsKey("Authorization")) this["Authorization"] = "REDACTED"
                    if (containsKey("apikey")) this["apikey"] = "REDACTED"
                }
                Log.d(tag, "postJson to: $urlStr body: $jsonBody headers: $safeHeaders")
            }
            val url = URL(urlStr)
            conn = url.openConnection() as HttpURLConnection
            conn.requestMethod = "POST"
            conn.setRequestProperty("Content-Type", "application/json")
            headers.forEach { (k, v) -> conn.setRequestProperty(k, v) }
            conn.doOutput = true
            val writer = OutputStreamWriter(conn.outputStream)
            writer.write(jsonBody.toString())
            writer.flush() 
            
            val code = conn.responseCode
            if (isDebug) {
                Log.d(tag, "postJson response code: $code")
            }

            if (code in 200..299) {
                val reader = BufferedReader(InputStreamReader(conn.inputStream))
                val text = reader.readText()
                if (isDebug) {
                    Log.d(tag, "postJson response text: $text")
                }
                PostResult(JSONObject(text))
            } else {
                val errorStreamText = try {
                    conn.errorStream?.bufferedReader()?.readText() ?: hostErrorStream(conn)
                } catch (@Suppress("UNUSED_PARAMETER") e: Exception) { "Failed to read error stream" }
                Log.e(tag, "postJson error ($code): $errorStreamText")
                PostResult(null, "HTTP $code: $errorStreamText")
            }
        } catch (e: Exception) {
            Log.e(tag, "postJson exception: ${e.message}", e)
            PostResult(null, "Exception: ${e.message}")
        }
        finally { conn?.disconnect() }
    }

    private fun hostErrorStream(conn: HttpURLConnection): String {
        return try {
            conn.inputStream?.bufferedReader()?.readText() ?: "No stream"
        } catch (@Suppress("UNUSED_PARAMETER") e: Exception) { "No stream" }
    }

    private fun clearState() {
        pendingCall = null
        connectInProgress = false
        signingInProgress = false
        retryCount = 0
    }

    private fun encodeBase58(input: ByteArray): String {
        val alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
        if (input.isEmpty()) return ""
        var zeros = 0
        while (zeros < input.size && input[zeros].toInt() == 0) zeros++
        val copy = input.copyOf()
        val encoded = CharArray(copy.size * 2)
        var outputStart = encoded.size
        var inputStart = zeros
        while (inputStart < copy.size) {
            var remainder = 0
            for (i in inputStart until copy.size) {
                val temp = remainder * 256 + (copy[i].toInt() and 0xFF)
                copy[i] = (temp / 58).toByte()
                remainder = temp % 58
            }
            if (copy[inputStart].toInt() == 0) inputStart++
            encoded[--outputStart] = alphabet[remainder]
        }
        while (outputStart < encoded.size && encoded[outputStart] == alphabet[0]) outputStart++
        repeat(zeros) { encoded[--outputStart] = alphabet[0] }
        return String(encoded, outputStart, encoded.size - outputStart)
    }

    @PluginMethod fun signMessages(call: PluginCall) { call.reject("signMessages not implemented") }
    @PluginMethod fun signTransaction(call: PluginCall) { call.reject("Use signAndSendTransaction instead") }
    @PluginMethod fun signMessage(call: PluginCall) { call.reject("signMessage not implemented") }
    @PluginMethod fun disconnect(call: PluginCall) { call.resolve() }
    @PluginMethod fun getCapabilities(call: PluginCall) { call.resolve(JSObject().put("supportsSignAndSend", true)) }
    @PluginMethod fun configure(call: PluginCall) { call.resolve() }
    @PluginMethod fun gateCheck(call: PluginCall) { call.reject("gateCheck runs via HTTP in JS — no native impl needed") }
    @PluginMethod fun mintPass(call: PluginCall) { call.reject("Use signAndSendTransaction — see client-side mint code") }
    @PluginMethod fun getSolBalance(call: PluginCall) { call.reject("getSolBalance not implemented") }
    @PluginMethod fun getTokenAccounts(call: PluginCall) { call.reject("getTokenAccounts not implemented") }
}
