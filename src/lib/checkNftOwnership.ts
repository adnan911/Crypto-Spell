import { Connection } from "@solana/web3.js";

const RPC_URL = import.meta.env.VITE_HELIUS_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=0244eab8-f8f1-4afb-b984-714b588e8f84";
const CRYPTOSPELL_NFT_NAME = "CryptoSpell Genesis";
const CRYPTOSPELL_NFT_URI = "https://ipfs.io/ipfs/bafybeiefyrm242d77x5fzikegstptavk2pscb5g3wbrbrgycweq644b7ei";

interface NftCheckResult {
  owned: boolean;
  assetAddress?: string;
}

/**
 * Query the Helius DAS API to check if a wallet owns a CryptoSpell NFT.
 * Uses the `searchAssets` method to find Core assets owned by this wallet.
 */
export async function checkNftOwnership(walletBase58: string): Promise<NftCheckResult> {
  try {
    // Helius DAS API: searchAssets by owner
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "cryptospell-nft-check",
        method: "searchAssets",
        params: {
          ownerAddress: walletBase58,
          page: 1,
          limit: 100,
        },
      }),
    });

    const data = await response.json();

    if (!data.result || !data.result.items) {
      return { owned: false };
    }

    // Search through the wallet's assets for a CryptoSpell NFT
    const cryptospellNft = (data.result.items as any[]).find((item) => {
      const name = item.content?.metadata?.name || "";
      const uri = item.content?.json_uri || "";
      return name === CRYPTOSPELL_NFT_NAME || uri === CRYPTOSPELL_NFT_URI;
    });

    if (cryptospellNft) {
      return {
        owned: true,
        assetAddress: cryptospellNft.id,
      };
    }

    return { owned: false };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("[NFT Check] Error querying on-chain:", error);
    }
    return { owned: false };
  }
}
