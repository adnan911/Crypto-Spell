import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface WelcomeProps {
    onEnter: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleEnter = () => {
        setIsExiting(true);
        onEnter(); // Immediate enter for instantaneous feel
    };

    return (
        <div 
            className={`fixed inset-0 z-[150] flex flex-col items-center justify-end pb-24 overflow-hidden ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            style={{
                backgroundImage: 'url("welcome.png")',
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
                    width: 12em;
                    height: 3.5em;
                    line-height: 2em;
                    text-align: center;
                    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
                    background-size: 300%;
                    border-radius: 30px;
                    z-index: 1;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .uiverse-button:hover {
                    animation: ani 8s linear infinite;
                    border: none;
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
            `}</style>

            {/* Dark gradient overlay for better legibility at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom Content Area */}
            <div className={`relative z-10 flex flex-col items-center w-full max-w-xs px-6 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                
                {/* Enter Button */}
                <button 
                    onClick={handleEnter}
                    className="uiverse-button shadow-2xl"
                >
                    Enter Game
                </button>

                {/* Subtext */}
                <p className="mt-8 text-white/40 text-[10px] font-black tracking-[0.4em] uppercase text-center">
                    Touch to start spelling
                </p>
            </div>
            {/* Central Logo and Art */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 mb-24 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                <img 
                    src="logo.png" 
                    alt="CryptoSpell Logo" 
                    className="h-auto object-contain z-20 relative"
                    style={{
                        width: '100vw',
                        maxWidth: '850px',
                        filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))'
                    }}
                />
                <img 
                    src="cryptospell_nft.png" 
                    alt="CryptoSpell NFT" 
                    className="h-auto object-contain z-10 relative mt-[-60px] animate-pulse"
                    style={{
                        width: '65vw',
                        maxWidth: '450px',
                        filter: 'drop-shadow(0 0 60px rgba(55, 182, 232, 0.5))',
                        animationDuration: '4s'
                    }}
                />
            </div>
        </div>
    );
};

export default Welcome;
