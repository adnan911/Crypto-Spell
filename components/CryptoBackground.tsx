import React, { useMemo } from 'react';

// A mix of crypto symbols and spelling letters that fit the CryptoSpell theme
const SYMBOLS = ['₿', 'Ξ', 'SOL', 'E T H', 'USDC', 'H', 'T', 'XRP', 'Z', 'N', 'NFT', 'A', 'B', 'C', 'DOGE'];

interface FloatingElement {
  id: number;
  symbol: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  fontSize: string;
  opacity: number;
  rotation: string;
}

const CryptoBackground: React.FC = () => {
  // Generate a random stable array of floating elements on component mount
  const floatingElements: FloatingElement[] = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      // Randomize the duration between 10s and 25s
      animationDuration: `${10 + Math.random() * 15}s`,
      // Randomize the start delay so they don't all pop up at once
      animationDelay: `-${Math.random() * 20}s`,
      // Size varies heavily: some huge blurred ones in the back, small crisp ones up front
      fontSize: `${0.8 + Math.random() * 3}rem`,
      // Opacity between 0.1 and 0.4
      opacity: 0.1 + Math.random() * 0.3,
      // Random starting rotation
      rotation: `${Math.random() * 360}deg`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
      {/* Container for the floating symbols */}
      <div className="absolute inset-0 w-full h-full">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute bottom-[-100px] text-white font-mono font-bold crypto-symbol"
            style={{
              left: el.left,
              fontSize: el.fontSize,
              opacity: el.opacity,
              animationName: 'floatUp',
              animationDuration: el.animationDuration,
              animationDelay: el.animationDelay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              // Initial transform so we can animate strictly via CSS keyframes
              transform: `rotate(${el.rotation}) translateZ(0)`,
            }}
          >
            {el.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoBackground;
