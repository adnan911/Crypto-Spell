import React, { useEffect, useState } from 'react';
import { RotateCcw, X, Shield, Star } from 'lucide-react';
import CryptoBackground from './CryptoBackground';
import { getTier } from '../constants';
import { MintModal } from '../src/components/MintModal';
import Confetti from './Confetti';
import { checkNftOwnership } from '../src/lib/checkNftOwnership';
import { useTheme } from '../contexts/ThemeContext';
import { useNftState } from '../hooks/useNftState';
import NavBar from './NavBar';

interface LandingProps {
  onContinue: () => void;
  onNewGame: () => void;
  onOpenDailyChallenge: () => void;
  onOpenMetaShop: () => void;
  onOpenSettings?: () => void;
  onOpenMint?: number;
  onOpenInventory?: number;
  level: number;
  coins?: number;
  autoOpenMint?: boolean;
  stopAutoMint?: () => void;
  onNftClose?: () => void;
}

const Landing: React.FC<LandingProps> = ({ 
  onContinue, 
  onNewGame, 
  onOpenDailyChallenge, 
  onOpenMetaShop, 
  onOpenSettings, 
  onOpenMint,
  onOpenInventory,
  level,
  coins = 100, 
  autoOpenMint = false,
  stopAutoMint,
  onNftClose
}) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNftViewer, setShowNftViewer] = useState(false);
  const [checkingNft, setCheckingNft] = useState(false);
  const { nftOwnership, setGlobalNftState } = useNftState();
  const { currentTheme } = useTheme();
  const currentTier = getTier(level);

  // Use refs to track handled triggers
  const lastMintTrigger = React.useRef(onOpenMint || 0);
  const lastInventoryTrigger = React.useRef(onOpenInventory || 0);

  // Auto-open mint modal if requested and user doesn't own NFT
  useEffect(() => {
    if (autoOpenMint && nftOwnership?.owned === false) {
      setShowMintModal(true);
      // Clear the trigger immediately after consuming
      stopAutoMint?.();
    }
  }, [autoOpenMint, nftOwnership, stopAutoMint]);

  // Handle external triggers from global NavBar
  useEffect(() => {
    if (onOpenMint !== undefined && onOpenMint > lastMintTrigger.current) {
      setShowMintModal(true);
      lastMintTrigger.current = onOpenMint;
    }
  }, [onOpenMint]);

  useEffect(() => {
    if (onOpenInventory !== undefined && onOpenInventory > lastInventoryTrigger.current) {
      if (nftOwnership?.owned) {
        setShowNftViewer(true);
      } else {
        setShowMintModal(true);
      }
      lastInventoryTrigger.current = onOpenInventory;
    }
  }, [onOpenInventory, nftOwnership]);

  const handleMintSuccess = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    const ownership = {
      owned: true,
      walletAddress: localStorage.getItem('cryptospell_wallet') || 'Not Available',
      mintedAt: new Date().toISOString()
    };
    setGlobalNftState(ownership);
  };

  const handleMintModalClose = () => {
    setShowMintModal(false);
    stopAutoMint?.();
    onNftClose?.();
  };


  const progressPercentage = Math.min(100, (level / 60) * 100);

  return (
    <div 
      className="fixed inset-0 z-0 flex flex-col items-center justify-start overflow-x-hidden"
      style={{
        backgroundImage: 'url("bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CryptoBackground />
      {/* <Confetti active={showConfetti} /> */}

      {/* Central Branding Logo */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-10"
      >
        <img 
          src="cryptospell logo.png" 
          alt="CryptoSpell Logo" 
          className="h-auto object-contain"
          style={{
            width: '90vw',
            maxWidth: '900px',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))'
          }}
        />
      </div>

      <main className="w-full max-w-[400px] flex flex-col items-center z-20 px-6 pt-12 pb-32 h-full overflow-y-auto no-scrollbar">
        
        {/* Branding Section (Empty for layout flow) */}
        <section className="text-center mb-8 flex flex-col items-center w-full h-80 opacity-0">
          <div className="w-full h-full"></div>
        </section>

        {/* Primary Navigation Buttons */}
        <section className="w-full flex flex-col gap-4 mt-auto mb-8 justify-center items-stretch px-2">
          <style>{`
            .btn-primary {
              width: 100%;
              background: linear-gradient(135deg, #1a6aaa 0%, #1a5d94 40%, #0e3a60 100%);
              border: none; border-radius: 18px;
              padding: 0;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              box-shadow:
                0 0 0 1px rgba(26,93,148,0.8),
                0 0 28px rgba(26,93,148,0.5),
                0 8px 32px rgba(0,0,0,0.4);
              transition: transform 0.2s, box-shadow 0.2s;
            }
            .btn-primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 0 0 1px rgba(26,93,148,0.9), 0 0 40px rgba(26,93,148,0.65), 0 12px 36px rgba(0,0,0,0.4);
            }
            .btn-primary:active { transform: scale(0.98); }
            .btn-primary::before {
              content:'';
              position:absolute; top:0; left:0; right:0; height:50%;
              background: linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%);
              border-radius:18px 18px 0 0;
              pointer-events:none;
            }
            .btn-primary::after {
              content:'';
              position:absolute; top:0; left:20%; right:20%; height:1.5px;
              background: linear-gradient(90deg, transparent, rgba(255,175,0,0.6), transparent);
              pointer-events:none;
            }
            .btn-inner {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 14px 16px 14px 22px;
              position: relative;
              z-index: 2;
            }
            .btn-text-group { display:flex; flex-direction:column; align-items:flex-start; }
            .btn-label-top {
              font-family: 'Barlow Condensed', sans-serif;
              font-size: 10px; font-weight: 700; letter-spacing: 3px;
              text-transform: uppercase; color: rgba(255,175,0,0.8);
              line-height: 1;
            }
            .btn-label-main {
              font-family: 'Barlow Condensed', sans-serif;
              font-size: 26px; font-weight: 900; letter-spacing: 2px;
              text-transform: uppercase; color: #fff;
              line-height: 1.1;
              text-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }
            .btn-icon {
              width: 46px; height: 46px;
              background: linear-gradient(135deg, rgba(255,175,0,0.2), rgba(255,175,0,0.06));
              border: 1px solid rgba(255,175,0,0.35);
              border-radius: 13px;
              display: flex; align-items:center; justify-content:center;
              box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.3);
              flex-shrink: 0;
            }
            .btn-secondary {
              width: 100%;
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 14px; padding: 13px 22px;
              cursor: pointer;
              display: flex; align-items:center; justify-content:center; gap:10px;
              font-family: 'Barlow Condensed', sans-serif;
              font-size: 16px; font-weight: 700; letter-spacing: 2.5px;
              text-transform: uppercase; color: rgba(228,228,228,0.6);
              transition: all 0.2s; position:relative; overflow:hidden;
            }
            .btn-secondary:hover {
              background: rgba(26,93,148,0.15);
              border-color: rgba(26,93,148,0.4);
              color: rgba(228,228,228,0.85);
            }
          `}</style>

          {/* New Game Button (Primary) */}
          <button 
            className="btn-primary"
            onClick={() => {
              const skipWarning = localStorage.getItem('cryptospell_skip_reset_warning') === 'true';
              
              if (level <= 1 || skipWarning) {
                  onNewGame();
              } else if (window.confirm("Starting a New Game will reset your current progress. Continue?")) {
                  localStorage.setItem('cryptospell_skip_reset_warning', 'true');
                  onNewGame();
              }
            }}
          >
            <div className="btn-inner">
              <div className="btn-text-group">
                <span className="btn-label-top">{level > 1 ? 'Legacy Reset' : 'Begin Journey'}</span>
                <span className="btn-label-main">New Game</span>
              </div>
              <div className="btn-icon">
                <RotateCcw size={22} color="#ffaf00" />
              </div>
            </div>
          </button>

          {/* Continue Button (Secondary) */}
          {level > 1 && (
            <button 
              className="btn-secondary"
              onClick={onContinue}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Continue (LVL {level})
            </button>
          )}
        </section>

      </main>

      {/* New Premium NavBar - MOVED TO APP.TX */}

      <MintModal 
        isOpen={showMintModal} 
        onClose={handleMintModalClose} 
        onMintSuccess={handleMintSuccess} 
      />

      {showNftViewer && nftOwnership && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => { setShowNftViewer(false); onNftClose?.(); }}
          />
          <div 
            className="relative w-full max-w-sm border border-white/10 p-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden rounded-3xl"
            style={{ backgroundColor: 'var(--theme-bg-tertiary)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20" style={{ backgroundColor: 'var(--theme-accent-1)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 blur-3xl rounded-full opacity-20" style={{ backgroundColor: 'var(--theme-accent-2)' }} />

            <button 
              onClick={() => { setShowNftViewer(false); onNftClose?.(); }}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-20 bg-black/50 backdrop-blur-sm p-1.5 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-5 relative z-10">
              <div className="w-full aspect-square max-w-[260px] rounded-2xl overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.3)] relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E94C91]/10 to-[#37B6E8]/10 z-10 pointer-events-none" />
                <img 
                  src="cryptospell_nft.png" 
                  alt="CryptoSpell NFT" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">CRYPTOSPELL NFT</h3>
                <p className="text-[10px] text-yellow-400 font-black tracking-[0.3em] mt-1 flex items-center justify-center gap-1 uppercase">
                  <Star size={10} className="fill-current" /> EXCLUSIVE HOLDER <Star size={10} className="fill-current" />
                </p>
              </div>

              <div className="w-full bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Owner</span>
                  <span className="font-mono text-[11px] font-bold text-[#E94C91]">
                    {nftOwnership.walletAddress.length > 12 
                      ? `${nftOwnership.walletAddress.substring(0, 6)}...${nftOwnership.walletAddress.substring(nftOwnership.walletAddress.length - 6)}`
                      : nftOwnership.walletAddress
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-2 py-1 -mx-2 rounded-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Minted</span>
                  <span className="text-xs font-bold text-white/90 font-mono tracking-wider">
                    {new Date(nftOwnership.mintedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center w-full gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                <Shield size={16} className="text-emerald-400" />
                <span className="text-[11px] font-black text-emerald-400 tracking-[0.2em] relative top-[1px]">VERIFIED OWNER</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
