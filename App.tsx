import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { GameState, GameSettings, ActiveGameState, CryptoAsset, LevelBand, HintType, PopularityTier } from './types';
import { persistenceService } from './services/persistence';
import { gameLogic } from './services/gameLogic';
import { soundManager } from './services/soundManager';
import { CRYPTO_ASSETS, getLevelConfig, getLevelBand } from './constants';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Splash from './components/Splash';
import Landing from './components/Landing';
import HUD from './components/HUD';
import GameArea from './components/GameArea';
import Confetti from './components/Confetti';
import GameOver from './components/GameOver';
import DailyChallenge from './components/DailyChallenge';
import MetaShop from './components/MetaShop';
import Settings from './components/Settings';
import ConfirmModal from './components/ConfirmModal';
import HintToast from './components/HintToast';
import MilestoneModal from './components/MilestoneModal';
import TimeoutModal from './components/TimeoutModal';
import LevelsModal from './components/LevelsModal';
import { getMilestone, Milestone } from './services/milestones';
import { haptics } from './services/haptics';
import { checkNftOwnership } from './src/lib/checkNftOwnership';
import { useDailyMissions } from './hooks/useDailyMissions';
import { ArrowLeft, Flame } from 'lucide-react';
import NavBar from './components/NavBar';
import { useNftState } from './hooks/useNftState';
import StudioSplash from './components/StudioSplash';
import { SplashScreen } from '@capacitor/splash-screen';

const INITIAL_SESSION: ActiveGameState = {
  stars: 0,
  coins: 100,
  level: 1,
  xp: 0,
  streak: 0,
  loginStreak: 0,
  bestStreak: 0,
  progressInLevel: 0,
  totalInLevel: 10, // Not strictly used in continuous mode but kept for compat
  currentInput: [],
  selectedSlotIndex: null,
  selectionPool: [],
  hintsUsed: [],
  failedAttempts: 0,
  wasNearMissSaved: false,
  consecutiveFailsOnLevel: 0,
  learningTokens: 0,
  unlockedHints: [HintType.REVEAL_ONE], // Default unlock
  dailyHintCounts: { date: new Date().toDateString(), counts: {} },
  milestonesClaimed: [],
  totalPerfects: 0,
  recentAssetIds: [],
  unlockedKeyboards: [],
  currentKeyboard: null,
  dailyMissions: {
    date: new Date().toDateString(),
    missions: {
      'tier_a_5': { progress: 0, isClaimed: false },
      'streak_10': { progress: 0, isClaimed: false },
      'boss_1': { progress: 0, isClaimed: false }
    },
    loginRewardClaimed: false,
    milestonesClaimed: [],
    completionHistory: [] // New 7-day tracker
  }
};

// Optimized OrderBook with subtle CSS-based animation for premium feel
const OrderBook = React.memo(() => {
  const lines = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? 'SELL' : 'BUY',
    amount: (Math.random() * 5).toFixed(3),
    price: (30000 + Math.random() * 40000).toFixed(2),
    col: Math.floor(Math.random() * 4),
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10
  })), []);

  return (
    <div className="order-book-bg fixed inset-0 opacity-[0.04] pointer-events-none select-none z-0 overflow-hidden">
      <div className="flex justify-around w-full h-full font-mono text-[10px]">
        {[0, 1, 2, 3].map(colIdx => (
          <div key={colIdx} className="order-book-column flex flex-col gap-1 w-1/4">
            {lines.filter(l => l.col === colIdx).map(line => (
              <div 
                key={line.id} 
                className={line.type === 'SELL' ? 'text-red-500' : 'text-emerald-500'}
                style={{
                  position: 'absolute',
                  animation: 'none'
                }}
              >
                {line.type} {line.amount} @ ${line.price}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

// Main game component (will be wrapped by ThemeProvider)
const GameContent: React.FC = () => {
  const { currentTheme } = useTheme();
  const [gameState, setGameState] = useState<GameState>(GameState.STUDIO_SPLASH);
  const [activeAsset, setActiveAsset] = useState<CryptoAsset>(CRYPTO_ASSETS[0]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [streakBonusAnim, setStreakBonusAnim] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [particles, setParticles] = useState<{ id: number, tx: number, ty: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hintedIndex, setHintedIndex] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hintToast, setHintToast] = useState<{ visible: boolean, message: string, subtext?: string }>({ visible: false, message: '' });
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [openMintTrigger, setOpenMintTrigger] = useState(0);
  const [openInventoryTrigger, setOpenInventoryTrigger] = useState(0);
  const { nftOwnership, setGlobalNftState } = useNftState();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [session, setSession] = useState<ActiveGameState>(INITIAL_SESSION);
  const [startTime, setStartTime] = useState<number>(0); // To track time used

  // Add autoOpenMint state
  const [autoOpenMint, setAutoOpenMint] = useState<boolean>(false);

  // Use refactored Mission Hook
  useDailyMissions(INITIAL_SESSION, persistenceService, setSession);

  // Background NFT Verification + Initial flow check
  useEffect(() => {
    // Hide native splash screen safely
    try {
      SplashScreen.hide();
    } catch (e) {
      console.warn('Splash screen hide failed or not on mobile', e);
    }

    const hasShownAutoMint = sessionStorage.getItem('cryptospell_auto_mint_shown') === 'true';

    const checkNFT = async () => {
      const wallet = localStorage.getItem('cryptospell_wallet');

      if (wallet) {
        try {
          const result = await checkNftOwnership(wallet);
          if (result.owned) {
            setGlobalNftState({
              owned: true,
              walletAddress: wallet,
              mintedAt: new Date().toISOString()
            });
          } else {
            if (!hasShownAutoMint) {
              setAutoOpenMint(true);
              sessionStorage.setItem('cryptospell_auto_mint_shown', 'true');
            }
          }
        } catch (e) {
          if (!hasShownAutoMint) {
            setAutoOpenMint(true);
            sessionStorage.setItem('cryptospell_auto_mint_shown', 'true');
          }
        }
      } else {
        if (!hasShownAutoMint) {
          setAutoOpenMint(true);
          sessionStorage.setItem('cryptospell_auto_mint_shown', 'true');
        }
      }
    };

    checkNFT();

    const isFirstTime = localStorage.getItem('cryptospell_is_first_time');
    if (!isFirstTime) {
      setGameState(GameState.STUDIO_SPLASH);
      localStorage.setItem('cryptospell_is_first_time', 'false');
      if (!hasShownAutoMint) {
        setAutoOpenMint(true);
        sessionStorage.setItem('cryptospell_auto_mint_shown', 'true');
      }
    } else {
      setGameState(GameState.STUDIO_SPLASH);
      setTimeout(() => {
         const ownershipStr = localStorage.getItem('cryptospell_nft_ownership');
         if (!ownershipStr && !hasShownAutoMint) {
             setAutoOpenMint(true);
             sessionStorage.setItem('cryptospell_auto_mint_shown', 'true');
         }
      }, 500);
    }
  }, []);

  // Save progress whenever relevant state changes
  useEffect(() => {
    if (session.level > 1 || session.coins !== 100) {
      persistenceService.saveProgress(session);
    }
  }, [session.coins, session.level, session.xp, session.unlockedHints, session.dailyMissions, session.loginStreak]);

  // Unlock Hints Progression
  useEffect(() => {
    const unlocks = [
      { level: 12, type: HintType.SHOW_TICKER },
      { level: 15, type: HintType.USE_SHORT_NAME },
      { level: 28, type: HintType.REMOVE_WRONG },
      { level: 45, type: HintType.SHOW_CATEGORY },
      { level: 55, type: HintType.REVEAL_FIRST_LAST },
      { level: 65, type: HintType.SHOW_CHAIN },
      { level: 70, type: HintType.REVEAL_VOWELS }
    ];

    const newUnlocks = unlocks.filter(u =>
      session.level >= u.level && !session.unlockedHints.includes(u.type)
    ).map(u => u.type);

    if (newUnlocks.length > 0) {
      setSession(prev => ({
        ...prev,
        unlockedHints: [...prev.unlockedHints, ...newUnlocks]
      }));
      soundManager.playSuccess();
    }
  }, [session.level, session.unlockedHints]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const spawnParticles = useCallback((count: number) => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      tx: (Math.random() - 0.5) * 600,
      ty: -500 - Math.random() * 300
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  }, []);

  const startTimer = useCallback((seconds: number, isHard: boolean) => {
    stopTimer();
    setTimeLeft(seconds);
    setStartTime(Date.now());

    if (seconds <= 0) return; // No timer

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (isHard) {
            stopTimer();
            setGameState(GameState.GAME_OVER);
            soundManager.playError();
            setSession(s => ({ ...s, streak: 0, failedAttempts: s.failedAttempts + 1 }));
            return 0;
          } else {
            // Soft timer just hits 0 but game continues (bonus lost)
            // Show timeout modal
            stopTimer();
            setShowTimeoutModal(true);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const loadNextWord = useCallback((resetAdaptive = true) => {
    // Plan A: Use band-based filtering and recent ID exclusion
    const asset = gameLogic.getRandomAsset(
      session.level,
      [], // Exclude IDs (manual)
      session.recentAssetIds
    );
    setActiveAsset(asset);

    // Update Recent list (Limit to 20 to prevent unbounded growth but keep enough history)
    let newRecents = [asset.id, ...session.recentAssetIds];
    if (newRecents.length > 20) newRecents = newRecents.slice(0, 20);

    const config = getLevelConfig(session.level);
    const targetWord = gameLogic.getTargetWord(asset);
    const pool = gameLogic.generatePool(targetWord, session.level, asset.legacyNames || []);

    // Adaptive Timer Calculation
    let timeToSet = config.timer;
    // If not resetting adaptive (i.e. retry after fail), and we have 2+ fails
    if (!resetAdaptive && session.consecutiveFailsOnLevel >= 2) {
      timeToSet += 5;
    }

    setSession(prev => ({
      ...prev,
      currentInput: Array(targetWord.replace(/\s+/g, '').length).fill(null),
      selectedSlotIndex: 0,
      selectionPool: pool,
      hintsUsed: [],
      failedAttempts: 0,
      wasNearMissSaved: false,
      consecutiveFailsOnLevel: resetAdaptive ? 0 : prev.consecutiveFailsOnLevel,
      recentAssetIds: newRecents
    }));

    setValidationState('idle');
    startTimer(timeToSet, config.isHardTimer);
    setGameState(GameState.PLAYING);
  }, [session.level, session.recentAssetIds, session.consecutiveFailsOnLevel, startTimer]);

  const handleContinue = () => loadNextWord(true); // Win -> Next Level -> Reset

  // For Game Over retry, we need a separate handler or pass param
  // But GameOver calls onRestart={handleContinue} currently.
  // We need to change that in the render of GameOver.

  const claimMission = useCallback((id: string, reward: number) => {
    setSession(prev => {
      const ms = { ...prev.dailyMissions.missions };
      if (!ms[id] || ms[id].isClaimed) return prev;
      ms[id] = { ...ms[id], isClaimed: true };
      
      soundManager.playCoin();

      return {
        ...prev,
        coins: prev.coins + reward,
        dailyMissions: {
          ...prev.dailyMissions,
          missions: ms
        }
      };
    });
  }, []);

  const claimLoginReward = (reward: { currency: 'COINS' | 'GEMS', amount: number }) => {
    setSession(prev => {
      if (prev.dailyMissions.loginRewardClaimed) return prev;
      soundManager.playCoin();
      return {
        ...prev,
        coins: prev.coins + reward.amount,
        dailyMissions: {
          ...prev.dailyMissions,
          loginRewardClaimed: true
        }
      };
    });
  };

  const claimMilestoneChest = (chestIndex: number, reward: { currency: 'COINS' | 'GEMS', amount: number }) => {
    setSession(prev => {
      if (prev.dailyMissions.milestonesClaimed.includes(chestIndex)) return prev;
      soundManager.playCoin();
      return {
        ...prev,
        coins: prev.coins + reward.amount,
        dailyMissions: {
          ...prev.dailyMissions,
          milestonesClaimed: [...prev.dailyMissions.milestonesClaimed, chestIndex]
        }
      };
    });
  };

  const handleNewGame = () => {
    if (session.level <= 1) {
      // New user — no progress to lose, start immediately
      confirmNewGame();
    } else {
      setShowResetConfirm(true);
    }
  };

  const handleTabClick = useCallback((id: string) => {
    switch (id) {
      case 'challenges':
        setGameState(GameState.DAILY_CHALLENGE);
        break;
      case 'shop':
        setGameState(GameState.META_SHOP);
        break;
      case 'play':
        setGameState(GameState.LANDING);
        break;
      case 'nft':
        setGameState(GameState.NFT);
        if (nftOwnership?.owned) {
          setOpenInventoryTrigger(prev => prev + 1);
        } else {
          setOpenMintTrigger(prev => prev + 1);
        }
        break;
      case 'settings':
        setGameState(GameState.SETTINGS);
        break;
      default:
        setGameState(GameState.LANDING);
    }
  }, [nftOwnership?.owned]);

  const activeTab = useMemo(() => {
    switch (gameState) {
      case GameState.DAILY_CHALLENGE: return 'challenges';
      case GameState.META_SHOP: return 'shop';
      case GameState.SETTINGS: return 'settings';
      case GameState.NFT: return 'nft';
      case GameState.LANDING: return 'play';
      default: return 'none';
    }
  }, [gameState]);

  const confirmNewGame = () => {
    const freshStart = { ...INITIAL_SESSION };
    setSession(freshStart);
    persistenceService.saveProgress(freshStart);

    // Start immediately
    const asset = gameLogic.getRandomAsset(1, [], []);
    setActiveAsset(asset);
    const config = getLevelConfig(1);
    const targetWord = gameLogic.getTargetWord(asset);
    const pool = gameLogic.generatePool(targetWord, 1, asset.legacyNames || []);

    setSession(prev => ({
      ...prev,
      ...freshStart, // Ensure reset
      currentInput: Array(targetWord.replace(/\s+/g, '').length).fill(null),
      selectedSlotIndex: 0,
      selectionPool: pool,
      recentAssetIds: [asset.id]
    }));

    startTimer(config.timer, config.isHardTimer);
    setGameState(GameState.PLAYING);
    setShowResetConfirm(false);
  };

  // (Adaptive logic moved to loadNextWord)

  const [validationState, setValidationState] = useState<'idle' | 'success' | 'near-miss'>('idle');

  const handleLetterSelect = useCallback((char: string, index: number) => {
    if (gameState !== GameState.PLAYING) return;

    // Use selectedSlotIndex if available, otherwise find first null
    const targetWord = gameLogic.getTargetWord(activeAsset);
    const strippedName = targetWord.replace(/\s+/g, '');
    let targetIndex = session.selectedSlotIndex;
    if (targetIndex === null || targetIndex >= strippedName.length) {
      targetIndex = session.currentInput.findIndex(val => val === null);
    }

    if (targetIndex !== -1 && targetIndex < strippedName.length) {
      soundManager.playClick();
      const newInput = [...session.currentInput];
      newInput[targetIndex] = char;
      
      // Find next empty slot or just move to next
      let nextSlot = targetIndex + 1;
      if (nextSlot >= strippedName.length) nextSlot = 0; // Wrap or stay? Let's find next null

      setSession(prev => ({ 
        ...prev, 
        currentInput: newInput,
        selectedSlotIndex: nextSlot
      }));

      // Trigger validation if no nulls left
      if (!newInput.includes(null)) {
        validateInput(newInput as string[]);
      }
    }
  }, [gameState, activeAsset, session.selectedSlotIndex, session.currentInput]);

  const handleLetterRemove = useCallback((index: number) => {
    if (gameState !== GameState.PLAYING && gameState !== GameState.COMPLETED_WORD) return;
    if (validationState === 'success') return; // Only block if they already won
    
    soundManager.playClick();
    const newInput = [...session.currentInput];
    newInput[index] = null;
    setSession(prev => ({ 
      ...prev, 
      currentInput: newInput,
      selectedSlotIndex: index
    }));
    
    if (validationState !== 'idle') {
       setValidationState('idle'); 
    }
  }, [gameState, validationState, session.currentInput]);

  const validateInput = useCallback((input: string[]) => {
    const inputStr = input.join('');
    const result = gameLogic.checkSubmission(inputStr, activeAsset);

    if (result === 'WIN' || result === 'REBRAND_WIN') {
      stopTimer();
      setValidationState('success');
      spawnParticles(12);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      soundManager.playSuccess();

      const config = getLevelConfig(session.level);
      const timeUsed = config.timer > 0 ? (config.timer - (timeLeft || 0)) : 0;

      const isPerfect = session.hintsUsed.length === 0 && session.failedAttempts === 0 && !session.wasNearMissSaved;

      const earnedCoins = gameLogic.calculateCoinsEarned(
        session.level,
        config.timer,
        timeUsed,
        session.streak,
        session.hintsUsed.length,
        session.failedAttempts,
        isPerfect
      );

      const earnedXP = gameLogic.calculateXP(
        session.level,
        isPerfect,
        session.hintsUsed.length,
        session.failedAttempts
      );

      setSession(prev => {
        const newStreak = prev.streak + 1;
        const isBonus = newStreak >= 5 && newStreak % 5 === 0;

        if (isBonus) {
          haptics.triggerSuccess(); // Strong vibe for bonus
        } else {
          haptics.triggerImpactMedium(); // Medium vibe for regular win
        }
        const nextLevel = prev.level + 1;

        const achievedMilestone = getMilestone(nextLevel);
        if (achievedMilestone && !prev.milestonesClaimed.includes(nextLevel)) {
          setTimeout(() => setActiveMilestone(achievedMilestone), 1000); // Delay slightly for effect
        }

        if (isBonus) {
          setStreakBonusAnim(true);
          soundManager.playStreak();
          setTimeout(() => setStreakBonusAnim(false), 2000);
        }
        soundManager.playCoin();

        return {
          ...prev,
          coins: prev.coins + earnedCoins + (isBonus ? 100 : 0),
          xp: (prev.xp || 0) + earnedXP,
          level: nextLevel,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          progressInLevel: 0,
          totalPerfects: isPerfect ? prev.totalPerfects + 1 : prev.totalPerfects,
          wasNearMissSaved: false, // Reset for next
          dailyMissions: {
            ...prev.dailyMissions,
            missions: {
              ...prev.dailyMissions.missions,
              'tier_a_5': {
                ...prev.dailyMissions.missions['tier_a_5'],
                progress: prev.dailyMissions.missions['tier_a_5'].progress + (activeAsset.tier === PopularityTier.A ? 1 : 0)
              },
              'streak_10': {
                ...prev.dailyMissions.missions['streak_10'],
                progress: Math.max(prev.dailyMissions.missions['streak_10'].progress, newStreak)
              },
              'boss_1': {
                ...prev.dailyMissions.missions['boss_1'],
                progress: Math.max(prev.dailyMissions.missions['boss_1'].progress, prev.level >= 50 ? 1 : 0)
              }
            }
          }
        };
      });

      setHintedIndex(null);
      setGameState(GameState.COMPLETED_WORD);

    } else if (result === 'NEAR_MISS') {
      soundManager.playHint(); // Constructive sound
      haptics.triggerImpactMedium();
      setValidationState('near-miss');
      setSession(s => ({ ...s, wasNearMissSaved: true })); // Mark as saved for penalty
      setIsErrorState(true);
      setTimeout(() => setIsErrorState(false), 400);
    } else {
      // FAIL
      soundManager.playError();
      haptics.triggerError();
      setIsErrorState(true);
      setTimeout(() => setIsErrorState(false), 400);
      setValidationState('idle');

      // Penalty
      setSession(prev => ({
        ...prev,
        coins: Math.max(0, prev.coins - 15),
        streak: 0,
        failedAttempts: prev.failedAttempts + 1,
        consecutiveFailsOnLevel: prev.consecutiveFailsOnLevel + 1, // Track for adaptive
        learningTokens: prev.learningTokens < 3 ? prev.learningTokens + 1 : prev.learningTokens
      }));
    }
  }, [activeAsset, session.level, session.streak, session.hintsUsed.length, session.failedAttempts, session.wasNearMissSaved, session.milestonesClaimed, timeLeft, stopTimer, spawnParticles]);

  // Handle Hint Usage (Plan A)
  const handleUseHint = useCallback((type: HintType, cost: { currency: 'COINS' | 'GEMS', amount: number }) => {
    if (gameState !== GameState.PLAYING) return;

    // Check affordability
    if (cost.currency === 'COINS' && session.coins < cost.amount) {
      soundManager.playError();
      return;
    }

    // Deduct cost and track usage
    setSession(prev => ({
      ...prev,
      coins: prev.coins - cost.amount,
      hintsUsed: [...prev.hintsUsed, type]
    }));
    soundManager.playHint();

    // Apply Specific Hint Effects
    switch (type) {
      case HintType.REVEAL_ONE: {
        // Reveal next missing letter
        const targetWord = gameLogic.getTargetWord(activeAsset);
        const strippedName = targetWord.replace(/\s+/g, '');
        const nextIndex = session.currentInput.findIndex(v => v === null);
        if (nextIndex !== -1 && nextIndex < strippedName.length) {
          const char = strippedName[nextIndex];
          handleLetterSelect(char, -1); // -1 indicates hint/auto
        }
        break;
      }
      case HintType.SHOW_TICKER:
        setHintToast({ visible: true, message: `TICKER: ${activeAsset.symbol}`, subtext: '3-Letter Symbol' });
        break;
      case HintType.SHOW_CATEGORY:
        setHintToast({ visible: true, message: `CATEGORY: ${activeAsset.sector}`, subtext: 'Market Sector' });
        break;
      case HintType.SHOW_CHAIN:
        setHintToast({ visible: true, message: `ECOSYSTEM: ${activeAsset.chain}`, subtext: 'Native Chain or Ecosystem' });
        break;
      case HintType.REVEAL_FIRST_LAST: {
        const targetWord = gameLogic.getTargetWord(activeAsset);
        const strippedName = targetWord.replace(/\s+/g, '');
        if (session.currentInput.every(v => v === null)) {
          handleLetterSelect(strippedName[0], -1);
          setHintToast({ visible: true, message: `First: ${strippedName[0]} / Last: ${strippedName[strippedName.length - 1]}`, subtext: 'First & Last Letters Revealed' });
        }
        break;
      }
      case HintType.REVEAL_VOWELS: {
        const targetWord = gameLogic.getTargetWord(activeAsset);
        const strippedName = targetWord.replace(/\s+/g, '');
        setHintToast({ visible: true, message: `VOWELS: ${strippedName.replace(/[^AEIOU]/g, '')}`, subtext: 'All vowels in the name' });
        break;
      }
      case HintType.REMOVE_WRONG:
        // Logic to filter pool would require deeper refactor of SpellingEngine
        // For V1 execution, we skip visual removal or implement in Phase 4.
        break;
      case HintType.USE_SHORT_NAME: {
        const shortAsset = { ...activeAsset, name: activeAsset.symbol };
        setActiveAsset(shortAsset);
        const pool = gameLogic.generatePool(shortAsset.name, session.level, shortAsset.legacyNames || []);
        
        // Reset current input since word changed, give more time maybe? No, keep it as is.
        setSession(prev => ({
          ...prev,
          currentInput: [],
          selectionPool: pool,
        }));
        setHintToast({ visible: true, message: `SHORT NAME ACTIVATED`, subtext: `Spell the Ticker: ${shortAsset.symbol}` });
        break;
      }
    }
  }, [gameState, session.coins, session.currentInput, activeAsset, handleLetterSelect]);

  // Toggle sound
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.setEnabled(newState);
  };

  const handleNext = () => {
    loadNextWord();
  };

  const config = getLevelConfig(session.level);
  const bandName = getLevelBand(session.level);

  const handleClaimMilestone = () => {
    if (!activeMilestone) return;

    setSession(prev => ({
      ...prev,
      coins: prev.coins + activeMilestone.coins,
      milestonesClaimed: [...prev.milestonesClaimed, activeMilestone.level]
    }));

    soundManager.playSuccess(); // Or a special sound
    setActiveMilestone(null);
  };

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden flex flex-col px-4 pb-4
      ${gameState !== GameState.LANDING && config.band === LevelBand.GRANDMASTER ? 'tier-black-swan' : ''}
      ${gameState === GameState.LANDING ? 'bg-transparent !important' : ''}
      ${isErrorState ? 'chromatic-aberration' : ''}
    `}
      style={{ paddingTop: '80px' }}
    >
      {/* <Confetti active={showConfetti} colors={currentTheme.confettiColors} /> */}

      <HintToast
        isVisible={hintToast.visible}
        message={hintToast.message}
        subtext={hintToast.subtext}
        onClose={() => setHintToast(prev => ({ ...prev, visible: false }))}
      />

      {particles.map(p => (
        <div key={p.id} className="particle-coin" style={{ left: '50%', top: '50%', '--tx': `${p.tx}px`, '--ty': `${p.ty}px` } as any} />
      ))}

      {streakBonusAnim && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-full font-black text-sm md:text-base tracking-[0.2em] shadow-[0_10px_30px_rgba(249,115,22,0.6)] border border-white/40 flex items-center gap-2 backdrop-blur-md">
            <Flame fill="currentColor" size={18} className="text-yellow-200" /> 
            <span className="drop-shadow-md">MEGA STREAK</span>
            <Flame fill="currentColor" size={18} className="text-yellow-200" />
          </div>
        </div>
      )}


      {(gameState === GameState.PLAYING || gameState === GameState.COMPLETED_WORD) && (
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={() => { stopTimer(); setGameState(GameState.LANDING); }}
            className="p-2.5 glass text-[var(--theme-text)] hover:bg-white/10 shadow-lg"
            style={{ borderRadius: 'var(--theme-radius)' }}
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      )}

      <main className="flex-1 min-h-0 w-full flex flex-col items-center justify-start relative z-10">
        <div className="w-full h-full flex flex-col items-center justify-start">
          {gameState === GameState.STUDIO_SPLASH ? (
            <div className="w-full h-full flex items-center justify-center">
              <StudioSplash onComplete={() => setGameState(GameState.SPLASH)} />
            </div>
          ) : gameState === GameState.SPLASH ? (
            <div className="w-full h-full flex items-center justify-center">
              <Splash onComplete={() => setGameState(GameState.LANDING)} />
            </div>
          ) : [GameState.LANDING, GameState.NFT].includes(gameState) ? (
            <div className="w-full h-full">
              <Landing
                onContinue={handleContinue}
                onNewGame={handleNewGame}
                onOpenDailyChallenge={() => setGameState(GameState.DAILY_CHALLENGE)}
                onOpenMetaShop={() => setGameState(GameState.META_SHOP)}
                onOpenSettings={() => setGameState(GameState.SETTINGS)}
                onOpenMint={openMintTrigger}
                onOpenInventory={openInventoryTrigger}
                stopAutoMint={() => setAutoOpenMint(false)}
                onNftClose={() => setGameState(GameState.LANDING)}
                level={session.level}
                coins={session.coins}
                autoOpenMint={autoOpenMint && [GameState.LANDING, GameState.NFT].includes(gameState)}
              />
            </div>
          ) : gameState === GameState.GAME_OVER ? (
            <div className="w-full h-full">
              <GameOver
                score={session.xp || 0}
                words={session.level}
                onRestart={() => loadNextWord(false)}
                onMenu={() => { stopTimer(); setGameState(GameState.LANDING); }}
              />
            </div>
          ) : gameState === GameState.DAILY_CHALLENGE ? (
            <div className="w-full h-full">
              <DailyChallenge 
                onBack={() => setGameState(GameState.LANDING)} 
                onPlay={handleContinue} 
                missions={session.dailyMissions.missions}
                loginRewardClaimed={session.dailyMissions.loginRewardClaimed}
                milestonesClaimed={session.dailyMissions.milestonesClaimed}
                completionHistory={session.dailyMissions.completionHistory || []}
                onClaim={claimMission}
                onClaimLoginReward={claimLoginReward}
                onClaimMilestoneChest={claimMilestoneChest}
                coins={session.coins}
                streak={session.loginStreak || session.streak}
              />
            </div>
          ) : gameState === GameState.META_SHOP ? (
            <div className="w-full h-full">
              <MetaShop 
                onBack={() => setGameState(GameState.LANDING)} 
                coins={session.coins} 
                onPurchaseCoins={(cost) => {
                  setSession(prev => ({
                    ...prev,
                    coins: prev.coins - cost
                  }));
                }}
              />
            </div>
          ) : gameState === GameState.SETTINGS ? (
            <div className="w-full h-full">
              <Settings 
                onBack={() => setGameState(GameState.LANDING)} 
                onResetProgress={() => {
                    confirmNewGame();
                    setGameState(GameState.LANDING);
                }} 
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <GameArea
                asset={activeAsset}
                input={session.currentInput}
                pool={session.selectionPool}
                isCompleted={gameState === GameState.COMPLETED_WORD}
                onSelect={handleLetterSelect}
                onRemove={handleLetterRemove}
                onNext={handleNext}
                onNextNoAnimation={handleNext}
                onUseHint={handleUseHint}
                coins={session.coins}
                unlockedHints={session.unlockedHints}
                level={session.level}
                xp={session.xp || 0}
                streak={session.streak}
                levelProgress={0}
                levelTotal={0}
                timeLeft={timeLeft}
                maxTime={config.timer}
                hintedIndex={hintedIndex}
                validationState={validationState}
                learningTokens={session.learningTokens}
                onSelectSlot={(index) => setSession(prev => ({ ...prev, selectedSlotIndex: index }))}
                selectedSlotIndex={session.selectedSlotIndex}
                onOpenLevels={() => setShowLevelsModal(true)}
                onBack={() => { stopTimer(); setGameState(GameState.LANDING); }}
                onSpendTokens={(action) => {
                  if (session.learningTokens < 3) return;
                  setSession(prev => ({ ...prev, learningTokens: prev.learningTokens - 3 }));
                  soundManager.playSuccess();
                  if (action === 'HINT') {
                    handleUseHint(HintType.REVEAL_ONE, { currency: 'COINS', amount: 0 });
                  } else if (action === 'TIME') {
                    setTimeLeft(prev => (prev || 0) + 5);
                  } else if (action === 'TICKER') {
                    handleUseHint(HintType.SHOW_TICKER, { currency: 'COINS', amount: 0 });
                  }
                }}
              />
            </div>
          )}
        </div>
      </main>

      {gameState !== GameState.LANDING && (
        <footer className="h-10 flex items-center justify-center gap-4">

          {config.isHardTimer && (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/50">
              HARD TIMER
            </span>
          )}
        </footer>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset Progress?"
        message="This will wipe your current Level, XP, Coins/Gems and unlocked items. This is a full hard reset!"
        confirmLabel="Hard Reset"
        cancelLabel="Cancel"
        type="danger"
        onConfirm={confirmNewGame}
        onCancel={() => setShowResetConfirm(false)}
      />

      {/* Milestone Modal */}
      {activeMilestone && (
        <MilestoneModal
          milestone={activeMilestone}
          onClaim={handleClaimMilestone}
        />
      )}

      {/* Timeout Modal */}
      <TimeoutModal
        isOpen={showTimeoutModal}
        onRestart={() => {
            setShowTimeoutModal(false);
            loadNextWord(false);
        }}
        onMenu={() => {
            setShowTimeoutModal(false);
            stopTimer();
            setGameState(GameState.LANDING);
        }}
      />

      {/* Levels Timeline Modal */}
      <LevelsModal 
        isOpen={showLevelsModal}
        onClose={() => setShowLevelsModal(false)}
        currentLevel={session.level}
      />

      {/* Global NavBar */}
      {[GameState.LANDING, GameState.DAILY_CHALLENGE, GameState.META_SHOP, GameState.SETTINGS, GameState.NFT].includes(gameState) && (
        <NavBar 
          activeTab={activeTab}
          onTabClick={handleTabClick}
          isNftHolder={nftOwnership?.owned}
        />
      )}
    </div>
  );
};

// App wrapper with ThemeProvider
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <OrderBook />
      <GameContent />
    </ThemeProvider>
  );
};

export default App;
