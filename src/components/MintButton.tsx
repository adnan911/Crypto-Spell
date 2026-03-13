import React, { useState } from 'react';
import { Pickaxe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { mintStandardNftNative } from '../lib/mintNftNative';

interface MintButtonProps {
  walletAddressBase58: string;
}

export function MintButton({ walletAddressBase58 }: MintButtonProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [txSignature, setTxSignature] = useState('');

  const handleMint = async () => {
    try {
      setBusy(true);
      setStatus('minting');
      setMessage('Approve transaction in Wallet...');
      
      const result = await mintStandardNftNative({ ownerBase58: walletAddressBase58 });
      
      setStatus('success');
      setMessage('Mint Successful!');
      setTxSignature(result.signature);
    } catch (e: any) {
      console.error("Minting failed", e);
      setStatus('error');
      setMessage(e?.message || 'Transaction failed or rejected');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-3 flex-col gap-2">
      {status === 'success' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg flex flex-col items-center gap-2 text-center">
          <CheckCircle className="text-emerald-400" size={24} />
          <p className="text-emerald-300 font-bold text-sm">{message}</p>
          <a 
            href={`https://explorer.solana.com/tx/${txSignature}`} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-[var(--theme-accent-1)] hover:underline"
          >
            View on Explorer
          </a>
        </div>
      ) : (
        <button
          onClick={handleMint}
          disabled={busy}
          className="w-full py-3 bg-gradient-to-r from-[var(--theme-accent-3)] to-[var(--theme-accent-1)] font-bold text-sm flex items-center justify-center gap-2 text-white relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ borderRadius: 'var(--theme-radius)', opacity: busy ? 0.7 : 1 }}
        >
          {busy ? (
            <Loader2 className="text-white" size={18} />
          ) : (
            <Pickaxe className="text-white relative z-10" size={18} />
          )}
          <span className="tracking-widest relative z-10">
            {busy ? 'MINTING...' : 'MINT NFT (~0.0025 SOL)'}
          </span>
        </button>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-2 text-red-400 text-xs mt-1 p-2 bg-red-500/10 rounded">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <p className="break-words w-full text-left">{message}</p>
        </div>
      )}
      
      {status === 'minting' && (
        <p className="text-center text-xs text-[var(--theme-text-muted)]">
          Please check your connected wallet...
        </p>
      )}
    </div>
  );
}
