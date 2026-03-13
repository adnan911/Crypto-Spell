import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoAsset, MarketTier, HintType, Currency } from '../types';
import SpellingEngine from './SpellingEngine';
import HintsMenu from './HintsMenu';
import HUD from './HUD';
import { Clock } from 'lucide-react';
import { getTier, getLevelBand, getLevelEra } from '../constants';

interface GameAreaProps {
  asset: CryptoAsset;
  input: string[];
  pool: string[];
  isCompleted: boolean;
  onSelect: (char: string, index: number) => void;
  onRemove: (index: number) => void;
  onNext: () => void;
  onUseHint: (type: HintType, cost: { currency: Currency, amount: number }) => void;
  coins: number;
  unlockedHints: HintType[];
  level: number;
  xp: number;
  streak: number;
  levelProgress: number;
  levelTotal: number;
  timeLeft: number | null;
  maxTime: number | null;
  hintedIndex?: number | null;
  validationState: 'idle' | 'success' | 'near-miss';
  highlightedIndices?: number[];
  disabledIndices?: number[];
  learningTokens: number;
  onSelectSlot?: (index: number) => void;
  selectedSlotIndex?: number | null;
  onSpendTokens: (action: 'HINT' | 'TIME' | 'TICKER') => void;
  onOpenLevels?: () => void;
  onBack?: () => void;
}

const GameArea: React.FC<GameAreaProps> = React.memo(({
  asset, input, pool, isCompleted, onSelect, onRemove, onNext, onUseHint,
  coins, unlockedHints, level, xp, streak, timeLeft, maxTime, hintedIndex, validationState,
  highlightedIndices, disabledIndices, learningTokens, onSpendTokens, onOpenLevels,
  onSelectSlot, selectedSlotIndex = null
}) => {
  const [showHintsMenu, setShowHintsMenu] = useState(false);
  
  // Global Keyboard Listener for Backspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted || validationState === 'success') return;
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (validationState === 'success') return;
        if (selectedSlotIndex !== null) {
          if (input[selectedSlotIndex] !== null) {
            onRemove(selectedSlotIndex);
          } else if (selectedSlotIndex > 0) {
            onRemove(selectedSlotIndex - 1);
          }
        } else {
          const lastIdx = input.map((v, idx) => v !== null ? idx : -1).filter(v => v !== -1).pop();
          if (lastIdx !== undefined) onRemove(lastIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input.length, isCompleted, validationState, onRemove, selectedSlotIndex, input]);

  const currentTier = useMemo(() => getTier(level), [level]);
  const hideTimerBar = currentTier === MarketTier.BLACK_SWAN;
  const bandBadge = useMemo(() => getLevelBand(level), [level]);
  const eraBadge = useMemo(() => getLevelEra(level), [level]);
  const currentHintCost = useMemo(() => 20 + Math.floor(Math.pow(level, 1.2) * 2), [level]);

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-2 relative pt-12">

      {/* Game Header Area */}
      <div className="w-full relative flex items-center justify-center px-2 pt-2 z-10 mb-1 min-h-[50px]">
        <div className="flex-1 flex justify-center w-full">
          <HUD coins={coins} level={level} xp={xp} streak={streak} />
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      <div className="floating-orb orb-4" />

      {/* Game Content - Blurred if completed */}
      <div className={`w-full flex-1 flex flex-col transition-all duration-300 ${isCompleted ? 'blur-md brightness-50 scale-[0.95] pointer-events-none' : ''}`}>
        <SpellingEngine
          asset={asset}
          input={input}
          pool={pool}
          onSelect={onSelect}
          onRemove={onRemove}
          onSelectSlot={onSelectSlot}
          selectedSlotIndex={selectedSlotIndex}
          onHint={() => setShowHintsMenu(true)}
          coins={coins}
          hintCost={currentHintCost}
          level={level}
          bandBadge={bandBadge}
          eraBadge={eraBadge}
          onOpenLevels={onOpenLevels}
          hintedIndex={hintedIndex}
          validationState={validationState}
          highlightedIndices={highlightedIndices}
          disabledIndices={disabledIndices}
          timeLeft={timeLeft}
          maxTime={maxTime}
          hideTimerBar={hideTimerBar}
          isCompleted={isCompleted}
          learningTokens={learningTokens}
          onSpendTokens={onSpendTokens}
        />
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {isCompleted && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center gap-8 w-full max-w-sm"
            >
              {/* Animated Success Label */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ["drop-shadow(0 0 20px var(--theme-accent-1))", "drop-shadow(0 0 40px var(--theme-accent-2))", "drop-shadow(0 0 20px var(--theme-accent-1))"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center relative"
              >
                <div className="absolute -inset-16 bg-gradient-to-r from-[var(--theme-accent-1)] via-[var(--theme-accent-2)] to-[var(--theme-accent-3)] blur-[80px] rounded-full opacity-40" />
                <h2 className="text-6xl font-black bg-gradient-to-b from-white via-[var(--theme-accent-2)] to-[var(--theme-accent-1)] bg-clip-text text-transparent mb-2 relative z-10 tracking-[0.1em] drop-shadow-[0_0_20px_var(--theme-accent-1)]">
                  VALIDATED
                </h2>
                <div className="h-2 w-40 mx-auto bg-gradient-to-r from-transparent via-[var(--theme-accent-3)] to-transparent opacity-60 rounded-full blur-[1px]" />
              </motion.div>

              {/* Centered Next Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px var(--theme-accent-2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="w-full py-5 bg-gradient-to-br from-[var(--theme-accent-2)] to-[var(--theme-accent-1)] text-white font-black text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                style={{ borderRadius: 'var(--theme-radius)' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 tracking-[0.2em]">NEXT BLOCK</span>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hints Menu Overlay */}
      <HintsMenu
        isOpen={showHintsMenu}
        onClose={() => setShowHintsMenu(false)}
        onUseHint={onUseHint}
        coins={coins}
        unlockedHints={unlockedHints}
        level={level}
      />
    </div>
  );
});

export default GameArea;