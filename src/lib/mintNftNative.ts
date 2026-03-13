import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createNoopSigner,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { mplCore, create } from "@metaplex-foundation/mpl-core";
import { Connection } from "@solana/web3.js";
import { Buffer } from "buffer";
import { SolanaMobile } from "../plugins/solanaMobile";

// ─── Config ───────────────────────────────────────────────────────────────
// The metadata JSON uploaded to Pinata. This points to the NFT image CID.
// Image CID: bafybeiefyrm242d77x5fzikegstptavk2pscb5g3wbrbrgycweq644b7ei
const METADATA_URI =
  "https://ipfs.io/ipfs/bafybeiefyrm242d77x5fzikegstptavk2pscb5g3wbrbrgycweq644b7ei";

const RPC_URL = import.meta.env.VITE_HELIUS_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=0244eab8-f8f1-4afb-b984-714b588e8f84";

// ─── Main mint function ────────────────────────────────────────────────────
// No backend required. User pays all fees (Solana network fee + Metaplex
// account rent ~0.0025 SOL total) directly via their connected wallet.
export async function mintStandardNftNative(params: {
  ownerBase58: string;
}) {
  // 1. Build UMI with a NoopSigner — has the correct public key
  //    but doesn't sign locally. MWA handles the real signing on Android.
  const ownerPk = publicKey(params.ownerBase58);
  const noopSigner = createNoopSigner(ownerPk);

  const umi = createUmi(RPC_URL)
    .use(mplCore())
    .use(signerIdentity(noopSigner));

  // 2. Generate a fresh keypair for the NFT asset account
  const asset = generateSigner(umi);

  // 3. Build the create NFT instruction only — no fee transfer needed!
  //    The user's wallet pays for:
  //    - Solana network fee (~0.000005 SOL)
  //    - Metaplex account rent (~0.012 SOL, one-time per NFT)
  const builder = create(umi, {
    asset,
    name: "CryptoSpell Genesis",
    uri: METADATA_URI,
    owner: ownerPk,
  });

  // 4. Build + get latest blockhash
  const tx = await builder.buildWithLatestBlockhash(umi);

  // 5. Pre-sign with the newly generated asset keypair
  //    (authorizes minting this specific NFT account)
  const signedTx = await asset.signTransaction(tx);

  // 6. Serialize to Base64 for the native MWA plugin
  const serializedTx = umi.transactions.serialize(signedTx);
  const base64Tx = Buffer.from(serializedTx).toString("base64");

  // 7. Hand off to Android MWA plugin — wallet signs and broadcasts
  const result = await SolanaMobile.signAndSendTransaction({
    txBase64: base64Tx,
    rpcUrl: RPC_URL,
  });

  if (!result.ok || !result.txSignature) {
    throw new Error("MWA signing failed or returned no signature.");
  }


  // 8. Confirm on-chain
  const connection = new Connection(RPC_URL, "confirmed");
  const latest = await connection.getLatestBlockhash();
  await connection.confirmTransaction(
    { signature: result.txSignature, ...latest },
    "confirmed"
  );

  return {
    assetAddress: asset.publicKey.toString(),
    signature: result.txSignature,
  };
}
