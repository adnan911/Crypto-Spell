import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoAsset, MarketTier } from '../types';
import { getCryptoIcon, getTier, getLevelConfig } from '../constants';
import { gameLogic } from '../services/gameLogic';
import { Zap, Skull, Lightbulb, Clock, Delete } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SpellingEngineProps {
  asset: CryptoAsset;
  input: string[];
  pool: string[];
  onSelect: (char: string, index: number) => void;
  onSelectSlot?: (index: number) => void;
  selectedSlotIndex?: number | null;
  onRemove: (index: number) => void;
  onHint: () => void;
  coins: number;
  hintCost: number;
  level: number;
  bandBadge?: string;
  eraBadge?: string;
  onOpenLevels?: () => void;
  hintedIndex?: number | null;
  validationState?: 'idle' | 'success' | 'near-miss';
  highlightedIndices?: number[]; // For Vowel/Reveal hints
  disabledIndices?: number[];    // For Remove Decoys hint
  timeLeft: number | null;
  maxTime: number | null;
  hideTimerBar?: boolean;
  isCompleted?: boolean;
  learningTokens?: number;
  onSpendTokens?: (action: 'HINT' | 'TIME' | 'TICKER') => void;
}

const SpellingEngine: React.FC<SpellingEngineProps> = React.memo(({
  asset, input, pool, onSelect, onSelectSlot, selectedSlotIndex = null, onRemove, onHint, coins, hintCost, level, bandBadge, eraBadge, onOpenLevels, hintedIndex, validationState = 'idle',
  highlightedIndices = [], disabledIndices = [], timeLeft, maxTime, hideTimerBar = false, isCompleted = false,
  learningTokens = 0, onSpendTokens
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentKeyboard } = useTheme();
  const config = useMemo(() => getLevelConfig(level), [level]); // Use new config
  const { visual, isHardTimer } = config;
  // Restore hidden slots logic: Only after level 100
  const hasHiddenSlots = level > 100;

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-xl mx-auto px-4">
      {/* ... (Previous Logo/Slot code unchanged) ... */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Main Logo Container */}
        <div className="flex flex-col items-center gap-3">
          
          {/* Premium Elegant Badges */}
          <div className="flex items-center gap-3 z-10 w-full justify-center">
            {eraBadge && (
              <button 
                onClick={onOpenLevels}
                className="group relative flex items-center justify-center px-4 py-1.5 overflow-hidden backdrop-blur-md"
                style={{ borderRadius: '20px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 rounded-full border border-white/10 group-hover:border-[var(--theme-accent-2)]/50"></div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-[var(--theme-accent-2)] to-transparent rounded-full blur-md`}></div>
                
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.25em] text-white/80 group-hover:text-white">
                  <span className="text-[var(--theme-accent-2)] opacity-90 mr-1.5 font-black">ERA</span>
                  {eraBadge}
                </span>
              </button>
            )}
            {bandBadge && (
              <button 
                onClick={onOpenLevels}
                className="group relative flex items-center justify-center px-4 py-1.5 overflow-hidden backdrop-blur-md"
                style={{ borderRadius: '20px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 rounded-full border border-white/10 group-hover:border-[var(--theme-accent-3)]/50"></div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-[var(--theme-accent-3)] to-transparent rounded-full blur-md`}></div>
                
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.25em] text-white/80 group-hover:text-white">
                  <span className="text-[var(--theme-accent-3)] opacity-90 mr-1.5 font-black">RANK</span>
                  {bandBadge}
                </span>
              </button>
            )}
          </div>

          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {isHardTimer && (
            <>
              <div className="blood-drip" style={{ left: '10%', height: '50px', animationDelay: '0s' }} />
              <div className="blood-drip" style={{ left: '50%', height: '30px', animationDelay: '0.6s' }} />
              <div className="blood-drip" style={{ left: '90%', height: '40px', animationDelay: '1.2s' }} />
            </>
          )}

          <div
            className={`w-40 h-40 md:w-48 md:h-48 flex items-center justify-center border-4 relative overflow-hidden bg-white/95
              ${isHardTimer ? 'effect-bloody border-red-500' : 'border-white/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]'}
              ${visual.filterClass}
              ${isHovered 
                ? 'scale-110 -translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_30px_var(--theme-accent-1)]' 
                : 'shadow-[0_10px_30px_rgba(0,0,0,0.2)]'}
            `}
            style={{ 
              borderRadius: 'calc(var(--theme-radius) * 1.5)',
              opacity: visual.opacity
             }}
          >
            {/* Animated Hover Glow */}
            <div 
              className={`absolute inset-0 bg-gradient-to-tr from-[var(--theme-accent-1)]/40 via-transparent to-[var(--theme-accent-2)]/40 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
            />
            <div 
              className={`${isHovered ? 'scale-110' : 'scale-100'}`}
              style={{
                transform: `rotate(${visual.rotation}deg) scale(${visual.scale})`
              }}
            >
              {getCryptoIcon(asset.symbol, 100)}
            </div>
          </div>
        </div>
      </div>

      {/* Timer Bar - Integrated between Logo and Slots */}
      {!isCompleted && !hideTimerBar && timeLeft !== null && maxTime !== null && (
        <div className="w-full max-w-[280px] flex flex-col items-center mt-4">
          <div 
            className="w-full h-4 bg-[var(--theme-bg-tertiary)] overflow-hidden p-[2px] relative flex items-center justify-center shadow-inner"
            style={{ borderRadius: 'var(--theme-radius)' }}
          >
            <div
              className={`absolute left-0 h-full ${timeLeft < 5 ? 'bg-gradient-to-r from-[var(--theme-accent-1)] to-red-500 shadow-[0_0_15px_var(--theme-accent-1)]' : ''}`}
              style={{
                width: `${(timeLeft / maxTime) * 100}%`,
                background: timeLeft < 5 ? undefined : 'var(--theme-gradient-progress)',
                borderRadius: 'var(--theme-radius)'
              }}
            />
            <div className="relative z-10 flex items-center gap-2">
              <Clock size={14} className={`${timeLeft < 5 ? 'text-white' : 'text-white/50'}`} />
              <span className={`font-mono font-black text-sm tracking-widest ${timeLeft < 5 ? 'text-white' : 'text-white/90'}`}>
                {timeLeft}S
              </span>
            </div>
          </div>

          {/* Learning Tokens UI - Positioned beneath countdown */}
          {learningTokens > 0 && (
            <div className="w-full mt-3 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent-3)]" />
                <span className="text-[10px] font-bold text-[var(--theme-accent-3)] uppercase tracking-widest">
                  Power: {learningTokens}/3
                </span>
              </div>
              {learningTokens >= 3 && onSpendTokens && (
                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() => onSpendTokens('HINT')}
                    className="flex-1 max-w-[120px] py-2 bg-[var(--theme-accent-3)]/20 hover:bg-[var(--theme-accent-3)] text-[9px] font-black text-[var(--theme-accent-3)] hover:text-black border border-[var(--theme-accent-3)]/30 rounded-lg uppercase tracking-tighter"
                  >
                    Free Hint
                  </button>
                  <button
                    onClick={() => onSpendTokens('TIME')}
                    className="flex-1 max-w-[120px] py-2 bg-[var(--theme-accent-3)]/20 hover:bg-[var(--theme-accent-3)] text-[9px] font-black text-[var(--theme-accent-3)] hover:text-black border border-[var(--theme-accent-3)]/30 rounded-lg uppercase tracking-tighter"
                  >
                    +5s Time
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Answer Slots */}
      <div className="flex flex-nowrap justify-center gap-1 w-full max-w-full overflow-hidden px-2">
          {gameLogic.getTargetWord(asset).replace(/\s+/g, '').split('').map((char, i) => {
            const targetWord = gameLogic.getTargetWord(asset);
            const strippedName = targetWord.replace(/\s+/g, '');
            const isFilled = i < input.length && input[i] !== null;
            const isFirstOrLast = i === 0 || i === strippedName.length - 1;
            const hideSlot = hasHiddenSlots && !isFirstOrLast && !isFilled;

            // Styles based on state
            let slotStyle = 'border-[var(--theme-glass-accent-border)] glass-accent text-[var(--theme-accent-1)]'; // Default
            if (isFilled) {
               if (validationState === 'success') {
                 slotStyle = 'border-[var(--theme-accent-2)] bg-[var(--theme-accent-2)]/20 text-[var(--theme-accent-2)] shadow-[0_0_20px_var(--theme-accent-2)]';
               } else if (validationState === 'near-miss') {
                 slotStyle = 'border-[var(--theme-accent-3)] bg-[var(--theme-accent-3)]/20 text-[var(--theme-accent-3)]';
               } else {
                 slotStyle = 'border-[var(--theme-accent-2)] bg-[var(--theme-accent-2)]/10 text-[var(--theme-accent-2)] shadow-[0_0_10px_var(--theme-accent-2)]';
               }
            } else if (hideSlot) {
               slotStyle = 'border-[var(--theme-bg-tertiary)] bg-transparent';
            }
            
            const isSelected = selectedSlotIndex === i && validationState !== 'success';
            if (isSelected) {
              slotStyle += ' ring-2 ring-[var(--theme-accent-1)] ring-offset-2 ring-offset-transparent border-[var(--theme-accent-1)] shadow-[0_0_15px_var(--theme-accent-1)]';
            }

            return (
              <button
                key={i}
                onClick={() => validationState !== 'success' && onSelectSlot?.(i)}
                disabled={validationState === 'success'}
                className={`flex-1 min-w-[32px] max-w-[48px] aspect-[10/14] flex items-center justify-center border-2
                  ${slotStyle}
                  ${!isFilled && !hideSlot ? '' : ''}
                  ${validationState !== 'success' ? 'cursor-pointer hover:border-[var(--theme-accent-1)]/50' : ''}
                  ${isSelected ? 'animate-pulse' : ''}
                `}
                style={{ borderRadius: 'calc(var(--theme-radius) * 0.4)' }}
              >
                {isFilled && (
                  <span className="text-2xl font-black font-mono">
                    {input[i]}
                  </span>
                )}
                {!isFilled && !hideSlot && (
                  <span className="text-2xl font-black font-mono opacity-20">?</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="w-full flex justify-center mt-6 mb-4 gap-4">
        <button
          onClick={() => {
            if (validationState === 'success') return;
            if (selectedSlotIndex !== null) {
               // Backspace on selected slot
               if (input[selectedSlotIndex] !== null) {
                  onRemove(selectedSlotIndex);
               } else if (selectedSlotIndex > 0) {
                  // If empty, backspace the previous one
                  onRemove(selectedSlotIndex - 1);
               }
            } else {
               // Default backspace (last element)
               const lastIdx = input.map((v, idx) => v !== null ? idx : -1).filter(v => v !== -1).pop();
               if (lastIdx !== undefined) onRemove(lastIdx);
            }
          }}
          disabled={validationState === 'success'}
          className={`flex items-center justify-center p-3 font-bold text-sm h-10 w-16
            ${input.length > 0 && validationState !== 'success'
              ? 'glass border-[var(--theme-accent-1)]/30 hover:bg-[var(--theme-accent-1)]/20 hover:border-[var(--theme-accent-1)] text-[var(--theme-accent-1)]'
              : 'glass border-[var(--theme-bg-tertiary)] text-white/20 cursor-not-allowed'
            }`}
          style={{ borderRadius: 'calc(var(--theme-radius) * 0.5)' }}
          aria-label="Backspace"
        >
          <Delete size={20} />
        </button>

        <button
          onClick={onHint}
          disabled={coins < hintCost}
          className={`flex items-center gap-2 px-5 font-bold text-sm h-10 min-w-32 justify-center
            ${coins >= hintCost
              ? 'btn-theme-3'
              : 'glass border-[var(--theme-bg-tertiary)] text-[var(--theme-text-muted)] cursor-not-allowed'
            }`}
          style={{ borderRadius: 'calc(var(--theme-radius) * 0.5)' }}
        >
          <Lightbulb size={18} />
          <span>HINT</span>
          <span className="text-xs opacity-70">({hintCost})</span>
        </button>
      </div>

      {/* Input Pool */}
      <div 
        className="w-full glass-accent p-4 shadow-2xl mb-2"
        style={{ 
            borderRadius: 'calc(var(--theme-radius) * 1.2)',
            ...(currentKeyboard?.containerStyles || {})
        }}
      >
        <div className="grid grid-cols-5 gap-2">
          {pool.map((char, i) => {
            const isHighlighted = highlightedIndices.includes(i) || hintedIndex === i;
            const isDisabled = disabledIndices.includes(i);
            
            const baseStyles = currentKeyboard?.keyStyles || {};
            
            return (
              <div 
                key={`${char}-${i}`} 
                className="relative h-14 md:h-16 w-full flex"
              >
                <button
                  onClick={() => !isDisabled && onSelect(char, i)}
                  disabled={isDisabled}
                  className={`w-full h-full flex items-center justify-center text-xl font-black font-mono
                    ${isDisabled
                      ? 'opacity-20 border-[var(--theme-glass-border)] bg-[var(--theme-bg-tertiary)] text-[var(--theme-text)] cursor-not-allowed scale-90 border-2'
                      : isHighlighted
                        ? 'bg-[var(--theme-accent-3)]/30 border-2 border-[var(--theme-accent-3)] text-[var(--theme-accent-3)] shadow-[0_0_20px_var(--theme-accent-3)] scale-[1.05] z-10'
                        : currentKeyboard 
                            ? ''
                            : 'border-2 glass border-[var(--theme-glass-accent-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent-2)] hover:bg-[var(--theme-accent-2)]/10 hover:text-[var(--theme-accent-2)]'
                    }`}
                  style={{ 
                      borderRadius: baseStyles.borderRadius || 'calc(var(--theme-radius) * 0.5)',
                      ...((!isDisabled && !isHighlighted) ? baseStyles : {} )
                  }}
                >
                  {char}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default SpellingEngine;