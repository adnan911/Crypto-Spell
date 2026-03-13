import React from 'react';
import { Flame, Coins } from 'lucide-react';

interface HUDProps {
  coins: number;
  level: number;
  xp: number;
  streak: number;
}

const HUD: React.FC<HUDProps> = React.memo(({ coins, level, xp, streak }) => {
  const isOnFire = streak >= 5;

  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 w-full max-w-[450px] mx-auto">
      <div className="flex items-center gap-2 w-full">

        {/* Streak Badge */}
        <div 
          className={`flex-[0.8] flex items-center glass p-1 pl-0 relative h-9 ${isOnFire ? 'border-2 border-[var(--theme-accent-3)] shadow-[0_0_15px_var(--theme-accent-3)]' : ''}`}
          style={{ borderRadius: 'var(--theme-radius)' }}
        >
          <div 
            className={`absolute -left-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 ${streak > 0 ? 'bg-gradient-to-br from-[var(--theme-accent-3)] to-[var(--theme-accent-1)] border-[var(--theme-accent-3)]/50' : 'bg-[var(--theme-bg-tertiary)] border-[var(--theme-text-muted)]/30'}`}
          >
            <Flame
              fill={streak > 0 ? "white" : "none"}
              size={16}
              className={`${streak > 0 ? "text-white" : "text-[var(--theme-text-muted)]"}`}
            />
          </div>
          <span className={`flex-1 text-center font-black text-base ml-7 ${isOnFire ? 'text-[var(--theme-accent-3)]' : streak > 0 ? 'text-white' : 'text-[var(--theme-text-muted)]'}`}>
            {streak}
          </span>
        </div>

        {/* Level Indicator (New Position) */}
        <div 
          className="flex-1 flex items-center glass h-9 px-2 justify-center gap-1.5"
          style={{ borderRadius: 'var(--theme-radius)' }}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] whitespace-nowrap">
            Lvl {level}
          </span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-[10px] font-bold text-[var(--theme-accent-2)] whitespace-nowrap">
             {xp} XP
          </span>
        </div>

        {/* Coins Badge */}
        <div 
          className="flex-[0.8] flex items-center glass p-1 pl-0 relative h-9"
          style={{ borderRadius: 'var(--theme-radius)' }}
        >
          <div 
            className="absolute -left-1 w-9 h-9 rounded-full coin-badge flex items-center justify-center shadow-lg border-2 border-[var(--theme-accent-3)]/50"
          >
            <span className="text-base font-black text-[var(--theme-bg-primary)]">$</span>
          </div>
          <span className="flex-1 text-center font-black text-base ml-7 text-[var(--theme-accent-3)]">{coins}</span>
        </div>
      </div>
    </div>
  );
});

export default HUD;