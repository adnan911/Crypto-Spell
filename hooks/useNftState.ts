import { useState, useEffect, useCallback } from 'react';
import { SolanaMobile } from '../src/plugins/solanaMobile';
import { checkNftOwnership } from '../src/lib/checkNftOwnership';

export interface NftOwnership {
  owned: boolean;
  walletAddress: string;
  mintedAt: string;
}

export const NFT_STORAGE_KEY = 'cryptospell_nft_ownership';
export const WALLET_STORAGE_KEY = 'cryptospell_wallet';

// Custom event name for syncing between components
const NFT_STATE_EVENT = 'cryptospell_nft_state_changed';

export function useNftState() {
  const [nftOwnership, setNftOwnershipState] = useState<NftOwnership | null>(null);
  const [walletAddress, setWalletAddressState] = useState<string>('');

  // Load initial state
  useEffect(() => {
    const loadState = () => {
      try {
        const nftData = localStorage.getItem(NFT_STORAGE_KEY);
        if (nftData) {
          setNftOwnershipState(JSON.parse(nftData));
        } else {
          setNftOwnershipState(null);
        }

        const walletData = localStorage.getItem(WALLET_STORAGE_KEY);
        setWalletAddressState(walletData || '');
      } catch (err) {
        console.error('Failed to parse NFT ownership from localStorage', err);
      }
    };

    // Load immediately
    loadState();

    // Listen for custom broadcast events from other components
    const handleStateChange = () => {
      loadState();
    };

    window.addEventListener(NFT_STATE_EVENT, handleStateChange);
    
    return () => {
      window.removeEventListener(NFT_STATE_EVENT, handleStateChange);
    };
  }, []);

  const setGlobalNftState = useCallback((ownership: NftOwnership) => {
    localStorage.setItem(NFT_STORAGE_KEY, JSON.stringify(ownership));
    localStorage.setItem(WALLET_STORAGE_KEY, ownership.walletAddress);
    
    // Update local state immediately
    setNftOwnershipState(ownership);
    setWalletAddressState(ownership.walletAddress);
    
    // Broadcast to other components
    window.dispatchEvent(new Event(NFT_STATE_EVENT));
  }, []);

  const clearGlobalNftState = useCallback(() => {
    localStorage.removeItem(NFT_STORAGE_KEY);
    localStorage.removeItem(WALLET_STORAGE_KEY);
    
    // Update local state immediately
    setNftOwnershipState(null);
    setWalletAddressState('');
    
    // Broadcast to other components
    window.dispatchEvent(new Event(NFT_STATE_EVENT));
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const res = await SolanaMobile.connect();
      const addr = res.publicKeyBase58 || res.publicKeyBase64 || '';
      
      if (addr) {
        // Check ownership immediately upon connection
        const ownershipCheck = await checkNftOwnership(addr);
        const newState: NftOwnership = {
          owned: ownershipCheck.owned,
          walletAddress: addr,
          mintedAt: ownershipCheck.owned ? new Date().toISOString() : ''
        };
        
        setGlobalNftState(newState);
        return { success: true, address: addr, owned: ownershipCheck.owned };
      }
      return { success: false, error: 'No address returned' };
    } catch (e: any) {
      console.error('Wallet connection failed', e);
      return { success: false, error: e.message || String(e) };
    }
  }, [setGlobalNftState]);

  const disconnectWallet = useCallback(async () => {
    try {
      await SolanaMobile.disconnect();
    } catch (e) {
      console.warn('Disconnect call failed or ignored:', e);
    }
    clearGlobalNftState();
  }, [clearGlobalNftState]);

  return {
    nftOwnership,
    walletAddress,
    setGlobalNftState,
    clearGlobalNftState,
    connectWallet,
    disconnectWallet
  };
}
