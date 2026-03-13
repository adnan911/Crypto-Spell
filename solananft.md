# Solana NFT Minting Master Guide

This document contains everything related to Solana NFT Minting, Mobile Wallet Adapter (MWA) integration, and the exact release/deployment checklist used in the `Pixel Mint` project. Keep this as a reference to easily port these functionalities to other Solana React/Vite projects.

---

## 1. Required Dependencies

To start a new project with the exact same Web3 capabilities, install these dependencies:

```bash
npm i @metaplex-foundation/mpl-core @metaplex-foundation/mpl-toolbox @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/umi-signer-wallet-adapters

npm i @solana-mobile/wallet-adapter-mobile @solana-mobile/wallet-standard-mobile

npm i @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-solflare @solana/web3.js

npm i bs58
```

---

## 2. Environment Variables (`.env`)

Make sure your frontend and backend/API have access to these depending on your architecture:

```env
VITE_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com" # Or devnet
VITE_TREASURY_PUBKEY="GPPeDtd8kh7CB7jXsLDJmZcCgJZU3RxnkqzDUyEf61cX" # Wallet that receives the minting/maintenance fee
PINATA_JWT="YOUR_PINATA_PRIVATE_JWT" # For uploading images/metadata
```

---

## 3. Tooling Scripts (Node.js)

### 3.1 Generate Mint Authority

Run this script to generate a new `mint-authority.json` (Keep this private).

**`scripts/generate-mint-authority.js`**:

```javascript
import fs from "fs";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

// Generate new keypair
const keypair = Keypair.generate();

// Save as JSON array (standard Solana format)
const secretKey = Array.from(keypair.secretKey);
fs.writeFileSync("mint-authority.json", JSON.stringify(secretKey));

console.log("Mint Authority Keypair generated!");
console.log("Public Key:", keypair.publicKey.toBase58());
console.log("Private Key (Base58):", bs58.encode(keypair.secretKey));
```

### 3.2 Create Merkle Tree (For cNFTs)

If you decide to do Compressed NFTs (Bubblegum), you need a Merkle Tree.

**`scripts/create-merkle-tree.ts`**:

```typescript
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
import { createTree, mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { Connection, Keypair } from "@solana/web3.js";
import fs from "fs";
import bs58 from "bs58";

const RPC_URL = "https://api.mainnet-beta.solana.com";

async function main() {
  console.log("Initializing Umi...");
  const umi = createUmi(RPC_URL).use(mplBubblegum());

  // Load Authority
  const secret = new Uint8Array(
    JSON.parse(fs.readFileSync("mint-authority.json", "utf-8")),
  );
  const keypair = umi.eddsa.createKeypairFromSecretKey(secret);
  umi.use(keypairIdentity(keypair));

  console.log("Authority:", keypair.publicKey);

  // Check Balance
  const balance = await umi.rpc.getBalance(keypair.publicKey);
  console.log("Balance:", Number(balance.basisPoints) / 1e9, "SOL");

  if (Number(balance.basisPoints) < 0.05 * 1e9) {
    console.error(
      "❌ Insufficient balance! Please fund the wallet with at least 0.05 SOL.",
    );
    process.exit(1);
  }

  console.log("Creating Merkle Tree...");
  const merkleTree = umi.eddsa.generateKeypair();
  console.log("New Merkle Tree Address:", merkleTree.publicKey);

  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64, // Capacity: 16,384 cNFTs
  });

  const { signature } = await builder.sendAndConfirm(umi);
  console.log("✅ Tree Created! Signature:", bs58.encode(signature));
  console.log("\n*** ACTION REQUIRED ***");
  console.log("Add this to your Vercel Environment Variables:");
  console.log("CNFT_TREE_ADDRESS=" + merkleTree.publicKey);
}

main().catch(console.error);
```

---

## 4. Frontend Application Integration

### 4.1 Global Mobile Wallet Adapter (MWA) Registration

Must be called before React renders in **`src/main.tsx`** or **`index.tsx`**:

```tsx
import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from "@solana-mobile/wallet-standard-mobile";

// Register MWA via Wallet Standard
registerMwa({
  appIdentity: {
    name: "Pixel Mint", // Replace with your App Name
    uri: "https://pixel-mint-sol.vercel.app", // Replace with your Domain
    icon: "icons/icon-192.png", // Path to your icon
  },
  authorizationCache: createDefaultAuthorizationCache(),
  chains: ["solana:devnet", "solana:mainnet"],
  chainSelector: createDefaultChainSelector(),
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
});
```

### 4.2 Standard Core NFT Minting logic + Fee Transfer

This is the core standard NFT minting using Metaplex Core (`mpl-core`) ensuring that you collect a maintenance fee on every mint.

**`src/lib/mintStandardNft.ts`**:

```typescript
import bs58 from "bs58";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  generateSigner,
  publicKey,
  sol,
  transactionBuilder,
  type PublicKey,
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCore, create } from "@metaplex-foundation/mpl-core";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";

type UploadResp = { ipfsUrl: string; cid?: string; gatewayUrl?: string };

const MAINTENANCE_FEE_SOL = 0.0015;

function mustEnv(name: string) {
  const v = import.meta.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return String(v);
}

export async function mintStandardNftWithFee(params: {
  wallet: any; // from useWallet()
  ownerBase58: string;
  name: string;
  description: string;
  imagePngBase64: string; // WITHOUT "data:image/png;base64,"
  attributes?: Array<{ trait_type: string; value: string }>;
}) {
  const rpc = mustEnv("VITE_SOLANA_RPC_URL");
  const treasury = mustEnv("VITE_TREASURY_PUBKEY");
  const treasuryPk = publicKey(treasury);

  // 1) Upload PNG to Pinata (Assuming you have an API route '/api/upload-to-pinata')
  const imgUp: UploadResp = await fetch("/api/upload-to-pinata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileBase64: params.imagePngBase64,
      fileName: `pixelmint-${Date.now()}.png`,
      contentType: "image/png",
    }),
  }).then(async (r) => {
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "Pinata image upload failed");
    return j;
  });

  // 2) Upload metadata JSON to Pinata
  const metadata = {
    name: params.name,
    description: params.description,
    image: imgUp.ipfsUrl,
    attributes: params.attributes ?? [],
  };

  const metaBase64 = btoa(
    unescape(encodeURIComponent(JSON.stringify(metadata))),
  );
  const metaUp: UploadResp = await fetch("/api/upload-to-pinata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileBase64: metaBase64,
      fileName: `pixelmint-${Date.now()}.json`,
      contentType: "application/json",
    }),
  }).then(async (r) => {
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "Pinata metadata upload failed");
    return j;
  });

  // 3) Build tx: (A) your fee transfer + (B) Core mint
  // Create Umi instance and use the wallet adapter from React
  const umi = createUmi(rpc)
    .use(walletAdapterIdentity(params.wallet))
    .use(mplCore());

  const asset = generateSigner(umi);
  const ownerPk: PublicKey = publicKey(params.ownerBase58);

  const builder = transactionBuilder()
    .add(
      transferSol(umi, {
        source: umi.identity,
        destination: treasuryPk, // Pay the fee to Treasury
        amount: sol(MAINTENANCE_FEE_SOL),
      }),
    )
    .add(
      create(umi, {
        asset,
        name: params.name,
        uri: metaUp.ipfsUrl,
        owner: ownerPk,
      }),
    );

  const result = await builder.sendAndConfirm(umi, {
    confirm: { commitment: "finalized" },
  });

  return {
    assetAddress: asset.publicKey.toString(),
    signature: bs58.encode(result.signature),
    imageIpfs: imgUp.ipfsUrl,
    metadataIpfs: metaUp.ipfsUrl,
    treasury,
    maintenanceFeeSol: MAINTENANCE_FEE_SOL,
  };
}
```

### 4.3 Wallet Integration Checks & UI Actions

Example of interacting with the connected Wallet (Sign messages / Test transactions)

**`src/components/WalletActions.tsx`**:

```tsx
import React, { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";

function short(s: string) {
  return s.slice(0, 4) + "…" + s.slice(-4);
}

export function WalletActions() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [status, setStatus] = useState<string>("");

  const pubkey = wallet.publicKey?.toBase58();
  const canSignMessage = !!wallet.signMessage && !!wallet.publicKey;
  const canSendTx = !!wallet.sendTransaction && !!wallet.publicKey;

  const domain = useMemo(() => window.location.host, []);

  async function handleLoginSignMessage() {
    try {
      setStatus("Preparing message…");
      if (!wallet.publicKey || !wallet.signMessage)
        throw new Error("Wallet not connected or doesn't support signing.");

      const nonce = crypto.randomUUID();
      const message = `Login\nDomain: ${domain}\nWallet: ${wallet.publicKey.toBase58()}\nNonce: ${nonce}`;
      const encoded = new TextEncoder().encode(message);

      setStatus("Signing message in wallet…");
      const signature = await wallet.signMessage(encoded);

      setStatus(`✅ Signed. Proof saved.`);
    } catch (e: any) {
      setStatus(`❌ ${e?.message || String(e)}`);
    }
  }

  async function handleSendTestTx() {
    try {
      setStatus("Preparing transaction…");
      if (!wallet.publicKey || !wallet.sendTransaction)
        throw new Error("Wallet not connected.");

      // 0-lamport self-transfer to safely trigger sign/send without funds loss
      const ix = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey,
        lamports: 0,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = wallet.publicKey;

      setStatus("Sending…");
      const sig = await wallet.sendTransaction(tx, connection);

      setStatus("Confirming…");
      const latest = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature: sig, ...latest },
        "confirmed",
      );

      setStatus(`✅ Confirmed: ${sig}`);
    } catch (e: any) {
      setStatus(`❌ ${e?.message || String(e)}`);
    }
  }

  return (
    <div>
      <div>Connected: {pubkey ? short(pubkey) : "No"}</div>
      <button onClick={handleLoginSignMessage} disabled={!canSignMessage}>
        Sign Msg
      </button>
      <button onClick={handleSendTestTx} disabled={!canSendTx}>
        Test Tx
      </button>
      {status && <div>{status}</div>}
    </div>
  );
}
```

---

## 5. Production APK & Deployment Checklist

This is the final verification checklist required before generating the Production APK for Solana Seeker/Android Devices (Trusted Web Activity).

### A) Web App (Production)

Run in terminal:

```bash
npm run build
npm run typecheck
npm run lint
```

_Ensure no errors._

### B) Wallet + Seeker Checks

- Connect wallet via UI.
- Confirm that **Seed Vault / Mobile Wallet Adapter** shows up in the list inside the Seeker environment.
- Verify `VITE_SOLANA_RPC_URL` is pointed to Mainnet.

### C) Standard NFT Mint Flow

- Canvas/App UI export feature works properly.
- Mint API correctly POSTs to Pinata and gets back valid `cid` and `ipfsUrl`.
- Verify the variable `VITE_TREASURY_PUBKEY` is perfectly matching the desired fee collector wallet.
- Confirm that the `MAINTENANCE_FEE_SOL` (0.0015 SOL) logic executes.
- **On-chain Action**: Approve a real mint transaction.
- Check the transaction signature on Solana Explorer.
- Make sure the _0.0015 SOL_ has arrived at the treasury!

### D) Vercel + Secrets

- **Important:** Make sure `PINATA_JWT` or Mint Authority Secret Keys are never directly pushed to GitHub.
- Add `PINATA_JWT` under Vercel project Settings -> Environment Variables.
- Make sure to redeploy the app on Vercel after adjusting these env vars.

### E) TWA / APK Trust (Critical for Android without URL bar)

1. Provide the `.well-known/assetlinks.json` inside your app's public directory.
2. Ensure the JSON corresponds to your verified `package_name` (e.g. `com.onchainerslab.pixelmint`) and your real `sha256_cert_fingerprints`.
3. The APK installed should open in fullscreen view without a Chrome URL Bar showing at the top. (It's OK if a brief “Running in Chrome” bubble appears at first).

### F) Android Studio Release Build

- Ensure you have a **Keystore password** saved and locked away. If you lose this keystore, you will not be able to update your app on the Google Play Store!
- In Android Studio: `Build` -> `Generate Signed Bundle/APK` -> Output the production Release APK.

### G) Final "Pre-Submit" QA

1. Do a fresh install of the APK.
2. Notice fast load speeds.
3. Open Wallet via Seed Vault successfully.
4. Try to Mint and verify the Tx behaves exactly as planned.
5. Force close and Reopen the application—confirm wallet state and UX is intact.
