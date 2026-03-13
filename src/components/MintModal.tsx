import React, { useState, useRef } from 'react';
import { Pickaxe, CheckCircle, AlertCircle, Loader2, X, Wallet, Star, Shield, Zap, Gift, Crown, Gem, Trophy, RotateCcw } from 'lucide-react';
import { mintStandardNftNative } from '../lib/mintNftNative';
import { SolanaMobile } from '../plugins/solanaMobile';
import { useNftState } from '../../hooks/useNftState';
import { checkNftOwnership } from '../lib/checkNftOwnership';
import { soundManager } from '../../services/soundManager';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMintSuccess: () => void;
}

const HOLDER_BENEFITS = [
  { icon: Crown, title: '2x Daily Bonus', desc: 'Double your daily challenge rewards' },
  { icon: Gem, title: 'Exclusive Themes', desc: 'Unlock NFT-holder-only UI themes' },
  { icon: Trophy, title: 'Leaderboard Badge', desc: 'Gold verified badge on leaderboard' },
  { icon: Gift, title: 'Airdrop Priority', desc: 'First access to future token airdrops' },
  { icon: Star, title: 'Genesis Status', desc: 'Permanent OG holder recognition' },
];

export function MintModal({ isOpen, onClose, onMintSuccess }: MintModalProps) {
  const { nftOwnership, walletAddress, setGlobalNftState, connectWallet } = useNftState();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [txSignature, setTxSignature] = useState('');
  const [flipped, setFlipped] = useState(false);
  const connectionGuard = useRef(false);

  if (!isOpen) return null;

  const handleConnect = async () => {
    if (connectionGuard.current) return;
    try {
      connectionGuard.current = true;
      setBusy(true);
      setStatus('idle');
      setMessage('');
      
      const result = await connectWallet();
      
      if (result.success && result.owned) {
        setStatus('success');
        setMessage('Wallet connected. NFT already owned!');
      } else if (!result.success && result.error && !result.error.toLowerCase().includes('cancelled')) {
        setStatus('error');
        setMessage('Connection Error: ' + result.error);
      }

    } finally {
      setBusy(false);
      connectionGuard.current = false;
    }
  };

  const handleMint = async () => {
    if (!walletAddress) return;
    
    try {
      setBusy(true);
      setStatus('minting');
      setMessage('Approve transaction in Wallet...');
      
      const result = await mintStandardNftNative({ ownerBase58: walletAddress });
      
      setStatus('success');
      setMessage('Mint Successful!');
      setTxSignature(result.signature);

      // Save to global state hook
      setGlobalNftState({
        owned: true,
        walletAddress: walletAddress,
        mintedAt: new Date().toISOString()
      });

      onMintSuccess();
      
      // Close automatically after success
      setTimeout(() => {
        onClose();
        // Reset state for next time
        setStatus('idle');
        setMessage('');
        setTxSignature('');
      }, 4000);
      
    } catch (e) {
      console.error("Minting failed", e);
      setStatus('error');
      const errorMsg = e instanceof Error ? e.message : 'Transaction failed or rejected';
      setMessage(errorMsg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={status !== 'minting' ? onClose : undefined}
      />
      
      {/* Holographic Console Modal */}
      <div 
         className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto custom-scrollbar"
         style={{
           background: 'linear-gradient(145deg, #0c0a14 0%, #12101f 40%, #0e0c18 100%)',
           borderRadius: '20px',
           border: '1px solid rgba(212, 175, 55, 0.25)',
           boxShadow: '0 0 60px rgba(212, 175, 55, 0.12), 0 0 120px rgba(212, 175, 55, 0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
         }}
      >
        {/* Holographic scanlines overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.3) 2px, rgba(212, 175, 55, 0.3) 4px)',
          }}
        />

        {/* Corner ornaments - top left */}
        <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-[2]">
          <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: 'linear-gradient(180deg, #d4af37, transparent)' }} />
        </div>
        {/* Corner ornaments - top right */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-[2]">
          <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: 'linear-gradient(270deg, #d4af37, transparent)' }} />
          <div className="absolute top-0 right-0 h-full w-[1px]" style={{ background: 'linear-gradient(180deg, #d4af37, transparent)' }} />
        </div>
        {/* Corner ornaments - bottom left */}
        <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-[2]">
          <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <div className="absolute bottom-0 left-0 h-full w-[1px]" style={{ background: 'linear-gradient(0deg, #d4af37, transparent)' }} />
        </div>
        {/* Corner ornaments - bottom right */}
        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-[2]">
          <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: 'linear-gradient(270deg, #d4af37, transparent)' }} />
          <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ background: 'linear-gradient(0deg, #d4af37, transparent)' }} />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />
        <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #b8860b, transparent)' }} />

        {/* Close button */}
        <button 
          onClick={onClose}
          disabled={status === 'minting'}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full disabled:opacity-50"
          style={{
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#d4af37',
          }}
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="relative z-10 p-6">

          {/* 3D Flip Card Container */}
          <div style={{ perspective: '1000px' }} className="mb-4">
            <div 
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ===== FRONT FACE: NFT Card ===== */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* NFT Image with holographic floating effect */}
                <div className="flex justify-center mb-5">
                  <div 
                    className="relative group"
                    style={{
                      width: '240px',
                      height: '320px', // Scaled for 1024x1366 ratio (approx 3:4)
                    }}
                  >
                    {/* Outer glow ring */}
                    <div 
                      className="absolute inset-[-3px] rounded-2xl opacity-60"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37, #b8860b, #ffd700, #b8860b, #d4af37)',
                        filter: 'blur(1px)',
                      }}
                    />
                    {/* Inner shadow depth */}
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3), 0 0 80px rgba(212, 175, 55, 0.1)',
                      }}
                    />
                    <img 
                      src="cryptospell_nft.png" 
                      alt="CryptoSpell NFT" 
                      className="relative w-full h-full object-cover rounded-2xl z-[1]"
                    />
                    {/* Shine reflection */}
                    <div 
                      className="absolute inset-0 rounded-2xl z-[2] pointer-events-none opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                      }}
                    />
                  </div>
                </div>

                {/* Title & Info */}
                <div className="text-center mb-1">
                  <h3 
                    className="text-2xl font-black tracking-wider uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #ffd700, #d4af37, #b8860b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
                    }}
                  >
                    CRYPTOSPELL NFT
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2 h-4" />

                  {/* Price Tag */}
                  <div 
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full"
                    style={{
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
                    }}
                  >
                    <Zap size={14} style={{ color: '#ffd700' }} className="fill-current" />
                    <span className="text-lg font-black" style={{ color: '#ffd700' }}>~0.0025 SOL</span>
                    <span className="text-[10px] font-bold opacity-60" style={{ color: '#ffd700' }}>(network fee)</span>
                  </div>

                  <p className="text-[9px] mt-2 tracking-widest uppercase font-bold" style={{ color: 'rgba(212, 175, 55, 0.4)' }}>
                    <Shield size={8} className="inline mr-1" />
                    Secure Cryptographic Transaction
                  </p>
                </div>
              </div>

              {/* ===== BACK FACE: Holder Benefits ===== */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <div 
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(212, 175, 55, 0.04)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <h4 
                    className="text-center text-sm font-black tracking-[0.2em] uppercase mb-4"
                    style={{ color: '#d4af37' }}
                  >
                    <Crown size={14} className="inline mr-2" />
                    Holder Benefits
                  </h4>

                  <div className="flex flex-col gap-3">
                    {HOLDER_BENEFITS.map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div 
                          key={i}
                          className="flex items-start gap-3 p-2.5 rounded-xl"
                          style={{
                            background: 'rgba(212, 175, 55, 0.04)',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                          }}
                        >
                          <div 
                            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                            style={{
                              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(184, 134, 11, 0.1))',
                              border: '1px solid rgba(212, 175, 55, 0.2)',
                            }}
                          >
                            <Icon size={14} style={{ color: '#ffd700' }} />
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#d4af37' }}>
                              {benefit.title}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: 'rgba(212, 175, 55, 0.5)' }}>
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Toggle Button */}
          <button
            onClick={() => { soundManager?.playClick && soundManager.playClick(); setFlipped(!flipped); }}
            className="w-full py-3 flex items-center justify-center gap-2 mb-4 hover:bg-white/5"
            style={{
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              color: '#d4af37',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <RotateCcw size={14} />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase">
              {flipped ? 'Back to NFT' : 'View Holder Benefits'}
            </span>
          </button>

          {/* Action Area */}
          <div className="flex flex-col gap-3">
            {status === 'success' ? (
              <div 
                className="p-4 rounded-xl flex flex-col items-center gap-2 text-center"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle className="text-emerald-400 mb-1" size={32} />
                <h4 className="font-black tracking-widest text-emerald-300 uppercase text-xs mb-1">Status Verified</h4>
                <p className="text-emerald-200/80 text-[10px] leading-relaxed px-4">{message}</p>
                {txSignature && (
                  <a 
                    href={`https://explorer.solana.com/tx/${txSignature}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] hover:underline mt-2 font-bold tracking-wider"
                    style={{ color: '#d4af37' }}
                  >
                    View on Explorer →
                  </a>
                )}
              </div>
            ) : (
              <>
                {!walletAddress ? (
                   <button
                      onClick={handleConnect}
                      disabled={busy}
                      className="w-full py-4 font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg"
                      style={{
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '14px',
                        color: '#d4af37',
                      }}
                   >
                      {busy ? <Loader2 size={18} /> : <Wallet size={18} />}
                      <span className="tracking-widest text-xs font-black uppercase">{busy ? 'CONNECTING...' : 'CONNECT WALLET'}</span>
                   </button>
                ) : (
                   <>
                       {/* Wallet Address Row */}
                       <div 
                         className="flex justify-between items-center px-4 py-3"
                         style={{
                           background: 'rgba(0,0,0,0.4)',
                           borderRadius: '12px',
                           border: '1px solid rgba(212, 175, 55, 0.15)',
                         }}
                       >
                         <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'rgba(212, 175, 55, 0.5)' }}>Wallet</span>
                         <span className="font-mono text-xs font-bold" style={{ color: '#d4af37' }}>
                           {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 6)}
                         </span>
                      </div>

                      {/* CONFIRM MINT Button */}
                      <button
                        onClick={handleMint}
                        disabled={busy}
                        className="w-full py-4 font-black tracking-[0.2em] text-sm flex justify-center items-center gap-2.5 relative overflow-hidden group"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37, #b8860b, #8b6914)',
                          borderRadius: '14px',
                          color: '#0c0a14',
                          boxShadow: '0 4px 25px rgba(212, 175, 55, 0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
                          opacity: busy ? 0.7 : 1,
                        }}
                      >
                        {/* Shine sweep */}
                        <div 
                          className="absolute inset-0 -translate-x-full skew-x-12"
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                        />
                        {busy ? <Loader2 className="relative z-10" size={20} /> : <Pickaxe className="relative z-10" size={20} />}
                        <span className="relative z-10 uppercase">{busy ? 'MINTING...' : 'CONFIRM MINT'}</span>
                      </button>
                   </>
                )}
              </>
            )}

            {status === 'error' && (
              <div 
                className="flex items-start gap-2 text-xs mt-2 p-3 rounded-lg"
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#f87171',
                }}
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="break-words w-full text-left">{message}</p>
              </div>
            )}

            {status === 'minting' && (
              <p className="text-center text-xs mt-2" style={{ color: 'rgba(212, 175, 55, 0.5)' }}>
                Please approve the transaction in your external wallet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
