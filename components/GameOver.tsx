
import React from 'react';
import { RefreshCw, Home, Share2, Award } from 'lucide-react';

interface GameOverProps {
  score: number;
  words: number;
  onRestart: () => void;
  onMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, words, onRestart, onMenu }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">

      {/* Floating Orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      <div className="floating-orb orb-4" />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[var(--theme-accent-1)]/30 blur-3xl" />
        <div className="relative w-24 h-24 rounded-full glass-accent border-2 border-[var(--theme-glass-accent-border)] flex items-center justify-center">
          <Award size={48} className="text-[var(--theme-accent-1)]" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-black text-center mb-1 bg-gradient-to-r from-[var(--theme-accent-1)] to-[var(--theme-accent-2)] bg-clip-text text-transparent">MARKET CRASH</h2>
      <p className="text-[var(--theme-text-muted)] text-center mb-8">Your session has been liquidated.</p>

      {/* Score Card */}
      <div className="w-full max-w-xs glass-accent rounded-3xl p-6 shadow-2xl mb-8">
        <div className="grid grid-cols-2 gap-4 divide-x divide-[var(--theme-glass-accent-border)]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-[var(--theme-text-muted)] font-bold mb-1">Yield</span>
            <span className="text-3xl font-mono font-black text-[var(--theme-accent-2)]">{score.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-[var(--theme-text-muted)] font-bold mb-1">Blocks</span>
            <span className="text-3xl font-mono font-black text-[var(--theme-text)]">{words}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <button
          onClick={onRestart}
          className="w-full py-5 btn-theme-1 font-black text-xl rounded-2xl shadow-lg flex items-center justify-center gap-3"
        >
          <RefreshCw size={22} />
          RE-MINE
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onMenu}
            className="py-4 btn-theme-2 font-bold rounded-2xl flex items-center justify-center gap-2"
          >
            <Home size={18} />
            MENU
          </button>
          <button
            onClick={() => {
              const text = `I scored ${score} points and spelled ${words} crypto logos in CryptoSpell! Can you beat me?`;
              if (navigator.share) {
                navigator.share({ title: 'CryptoSpell Result', text, url: window.location.href });
              } else {
                alert('Score copied to clipboard!');
                navigator.clipboard.writeText(text);
              }
            }}
            className="py-4 btn-theme-3 font-bold rounded-2xl flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
