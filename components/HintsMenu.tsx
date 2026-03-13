import React from 'react';
import { X, Lock, Coins, Lightbulb, Type, Hash, Layers, Globe, Eraser } from 'lucide-react';
import { HintType, Currency } from '../types';

interface HintsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onUseHint: (type: HintType, cost: { currency: Currency, amount: number }) => void;
  coins: number;
  unlockedHints: HintType[];
  level: number;
}

const getHintDefinitions = (level: number) => {
  return [
    {
      type: HintType.REVEAL_ONE,
      label: "Reveal Letter",
      desc: "Uncovers one random missing letter.",
      cost: 20 + Math.floor(Math.pow(level, 1.2) * 2),
      currency: Currency.COINS,
      icon: Lightbulb
    },
    {
      type: HintType.SHOW_TICKER,
      label: "Show Ticker",
      desc: "Displays the 3-4 letter symbol.",
      cost: 30 + Math.floor(Math.pow(level, 1.25) * 2.2),
      currency: Currency.COINS,
      icon: Hash
    },
    {
      type: HintType.SHOW_CATEGORY,
      label: "Show Category",
      desc: "Reveals sector (L1, DeFi, etc.).",
      cost: 40 + Math.floor(Math.pow(level, 1.3) * 2.5),
      currency: Currency.COINS,
      icon: Layers
    },
    {
      type: HintType.REMOVE_WRONG,
      label: "Remove Decoys",
      desc: "Removes incorrect letters.",
      cost: 50 + Math.floor(Math.pow(level, 1.35) * 3),
      currency: Currency.COINS,
      icon: Eraser
    },
    {
      type: HintType.REVEAL_FIRST_LAST,
      label: "First & Last",
      desc: "Reveals first and last letters.",
      cost: 80 + Math.floor(Math.pow(level, 1.45) * 4),
      currency: Currency.COINS,
      icon: Type
    },
    {
      type: HintType.SHOW_CHAIN,
      label: "Show Ecosystem",
      desc: "Which chain does this belong to?",
      cost: 100 + Math.floor(Math.pow(level, 1.5) * 4.5),
      currency: Currency.COINS,
      icon: Globe
    },
    {
      type: HintType.REVEAL_VOWELS,
      label: "Reveal Vowels",
      desc: "Uncovers all vowels.",
      cost: 150 + Math.floor(Math.pow(level, 1.55) * 5),
      currency: Currency.COINS,
      icon: Type
    },
    {
      type: HintType.USE_SHORT_NAME,
      label: "Short Name",
      desc: "Switch to 3-4 letter ticker symbol.",
      cost: 60 + Math.floor(Math.pow(level, 1.4) * 3.5),
      currency: Currency.COINS,
      icon: Hash
    }
  ];
};

const HintsMenu: React.FC<HintsMenuProps> = ({
  isOpen, onClose, onUseHint, coins, unlockedHints, level
}) => {
  const definitions = getHintDefinitions(level);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div 
        className="relative w-full max-w-sm bg-[var(--theme-bg-primary)] border border-[var(--theme-glass-border)] p-6 shadow-2xl"
        style={{ borderRadius: 'var(--theme-radius)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-[var(--theme-text)] flex items-center gap-2">
            <Lightbulb className="text-[var(--theme-accent-3)]" fill="currentColor" />
            POWER-UPS
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X size={20} className="text-white/60" />
          </button>
        </div>

        <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {definitions.map((hint) => {
            const isUnlocked = unlockedHints.includes(hint.type);
            const canAfford = coins >= hint.cost;
            const Icon = hint.icon;

            return (
              <button
                key={hint.type}
                disabled={!isUnlocked || !canAfford}
                onClick={() => {
                  onUseHint(hint.type, { currency: hint.currency, amount: hint.cost });
                  onClose();
                }}
                className={`group relative flex items-center gap-4 p-4 border
                  ${!isUnlocked
                    ? 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed grayscale'
                    : canAfford
                      ? 'bg-white/5 border-[var(--theme-accent-1)]/30 hover:bg-[var(--theme-accent-1)]/20 hover:border-[var(--theme-accent-1)]'
                      : 'bg-red-500/5 border-red-500/20 opacity-70 cursor-not-allowed'
                  }
                `}
                style={{ borderRadius: 'var(--theme-radius)' }}
              >
                {!isUnlocked && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 z-10"
                    style={{ borderRadius: 'var(--theme-radius)' }}
                  >
                    <Lock size={24} className="text-white/40" />
                  </div>
                )}

                <div 
                  className="w-12 h-12 flex items-center justify-center shrink-0 bg-[var(--theme-accent-3)]/20 text-[var(--theme-accent-3)]"
                  style={{ borderRadius: 'var(--theme-radius)' }}
                >
                  <Icon size={24} />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[var(--theme-text)]">{hint.label}</span>
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-lg">
                      <Coins size={12} className="text-[var(--theme-accent-3)]" />
                      <span className="font-mono font-bold text-xs text-[var(--theme-accent-3)]">
                        {hint.cost}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-tight">{hint.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <span className="text-[10px] text-white/30 uppercase tracking-widest">
            Unlock more by playing
          </span>
        </div>
      </div>
    </div>
  );
};

export default HintsMenu;
