import React, { useEffect, useState } from 'react';
import CryptoBackground from './CryptoBackground';

interface StudioSplashProps {
  onComplete: () => void;
}

const StudioSplash: React.FC<StudioSplashProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Phase 1: Fade in
    const showTimer = setTimeout(() => setVisible(true), 100);
    // Phase 2: Show for 1s then exit
    const leaveTimer = setTimeout(() => setVisible(false), 950);
    // Phase 3: Complete
    const completeTimer = setTimeout(() => onComplete(), 1150);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(leaveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[310] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <CryptoBackground />
      
      <div 
        className="w-full h-full p-4 flex items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.98)',
          transition: 'opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img 
          src="studio_logo.svg" 
          alt="Digital Spells Studio" 
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 0 50px rgba(55, 182, 232, 0.4))'
          }}
        />
      </div>

      {/* Subtle screen border glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        boxShadow: 'inset 0 0 100px rgba(55, 182, 232, 0.2)'
      }} />
      
      {/* Decorative corner accents */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/20" />
    </div>
  );
};

export default StudioSplash;
