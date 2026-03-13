import React, { useEffect, useState } from 'react';
import CryptoBackground from '../components/CryptoBackground';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show the button after 2 seconds
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    // Short delay for exit animation before completing
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      style={{
        backgroundImage: 'url("bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        @keyframes ani {
          0% { background-position: 0%; }
          100% { background-position: 400%; }
        }
        .uiverse-button {
          text-decoration: none;
          position: relative;
          border: none;
          font-size: 16px;
          font-family: inherit;
          cursor: pointer;
          color: #fff;
          width: 14em;
          height: 3.5em;
          line-height: 2em;
          text-align: center;
          background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
          background-size: 300%;
          border-radius: 30px;
          z-index: 100;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.5s ease;
        }
        .uiverse-button:hover {
          animation: ani 8s linear infinite;
          border: none;
          transform: scale(1.05);
        }
        .uiverse-button:before {
          content: "";
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          z-index: -1;
          background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
          background-size: 400%;
          border-radius: 35px;
        }
        .uiverse-button:hover::before {
          filter: blur(20px);
        }
        .uiverse-button:active {
          background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Dynamic Background */}
      <CryptoBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--theme-accent-1)] rounded-full blur-[100px] opacity-30 mix-blend-screen" />

        {/* Branding Logo */}
        <div className="mb-12 relative z-20 w-full flex justify-center">
          <img 
            src="logo.png" 
            alt="CryptoSpell Logo" 
            className="h-auto object-contain relative z-20"
            style={{
              width: '90vw',
              maxWidth: '900px',
              filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))'
            }}
          />
        </div>

        {/* Start Button Area */}
        <div className={`mt-4 transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
          <button 
            onClick={handleStart}
            className="uiverse-button shadow-2xl"
          >
            Start Spelling
          </button>
        </div>

        {/* Subtext indicator until button appears */}
        {!showButton && (
          <div className="flex items-center gap-3 mt-12 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-[var(--theme-accent-1)] animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-[var(--theme-accent-2)] animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-[var(--theme-accent-3)] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Splash;
