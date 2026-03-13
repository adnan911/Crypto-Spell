import React from "react";

interface NavBarProps {
  activeTab?: string;
  onTabClick: (id: string) => void;
  isNftHolder?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab = "mint", onTabClick, isNftHolder }) => {
  const navItems = [
    {
      id: "challenges",
      label: "Challenges",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
          <rect x="3" y="4" width="18" height="16" rx="2" fill="url(#calGrad)" stroke="url(#calStroke)" strokeWidth="1.5"/>
          <rect x="8" y="2" width="2" height="4" rx="1" fill="#a78bfa"/>
          <rect x="14" y="2" width="2" height="4" rx="1" fill="#a78bfa"/>
          <rect x="7" y="11" width="4" height="4" rx="1" fill="url(#dotGrad)"/>
          <rect x="13" y="11" width="4" height="4" rx="1" fill="url(#dotGrad)" opacity="0.6"/>
          <defs>
            <linearGradient id="calGrad" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#312e81"/>
              <stop offset="1" stopColor="#1e1b4b"/>
            </linearGradient>
            <linearGradient id="calStroke" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8"/>
              <stop offset="1" stopColor="#6366f1"/>
            </linearGradient>
            <linearGradient id="dotGrad" x1="7" y1="11" x2="11" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4b5fd"/>
              <stop offset="1" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: "shop",
      label: "Shop",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill="url(#shopGrad)" stroke="url(#shopStroke)" strokeWidth="1.5" strokeLinejoin="round"/>
          <line x1="3" y1="6" x2="21" y2="6" stroke="url(#shopStroke2)" strokeWidth="1.5"/>
          <path d="M16 10a4 4 0 01-8 0" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
          <defs>
            <linearGradient id="shopGrad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3730a3"/>
              <stop offset="1" stopColor="#1e1b4b"/>
            </linearGradient>
            <linearGradient id="shopStroke" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5b4fc"/>
              <stop offset="1" stopColor="#6366f1"/>
            </linearGradient>
            <linearGradient id="shopStroke2" x1="3" y1="6" x2="21" y2="6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8"/>
              <stop offset="1" stopColor="#6366f1"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: "play",
      label: "Play",
      icon: null, // special center item
      isCenter: true,
    },
    {
      id: "nft",
      label: "NFT",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon nft-icon">
          {/* Beaming "NFT" Text */}
          <text 
            x="50%" 
            y="55%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="nft-text-beaming"
            style={{ 
              fontFamily: "'Barlow Condensed', sans-serif", 
              fontWeight: 900, 
              fontSize: '15px',
              letterSpacing: '0.05em'
            }}
          >
            NFT
          </text>
          
          {/* NFT Holder Indicator Badge */}
          {isNftHolder && (
            <g className="nft-holder-indicator">
              <circle cx="20" cy="5" r="4.5" fill="#10b981" stroke="#064e3b" strokeWidth="0.5"/>
              <path d="M18.5 5L19.5 6L21.5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="5" r="4.5" fill="none" stroke="#10b981" strokeWidth="1" className="indicator-pulse"/>
            </g>
          )}

          <defs>
            <linearGradient id="nftTextGrad" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4b5fd"/>
              <stop offset="0.5" stopColor="#a78bfa"/>
              <stop offset="1" stopColor="#818cf8"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon settings-icon">
          <circle cx="12" cy="12" r="3" fill="url(#setInner)" stroke="#c4b5fd" strokeWidth="1.2"/>
          <path className="settings-spokes" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="url(#setSpokes)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle className="settings-outer" cx="12" cy="12" r="6" stroke="url(#setOuter)" strokeWidth="1.5" strokeDasharray="2 2"/>
          <defs>
            <linearGradient id="setInner" x1="9" y1="9" x2="15" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa"/>
              <stop offset="1" stopColor="#6d28d9"/>
            </linearGradient>
            <linearGradient id="setSpokes" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c4b5fd"/>
              <stop offset="1" stopColor="#818cf8"/>
            </linearGradient>
            <linearGradient id="setOuter" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8" stopOpacity="0.6"/>
              <stop offset="1" stopColor="#6366f1" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .nav-wrapper {
          width: 100%;
          max-width: 400px;
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          padding-bottom: env(safe-area-inset-bottom, 8px);
          z-index: 100;
        }

        /* Ambient glow behind bar */
        .nav-ambient {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 100%; height: 60px;
          background: radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, transparent 70%);
          filter: blur(8px);
          pointer-events: none;
          z-index: 0;
        }

        .navbar {
          position: relative;
          z-index: 1;
          width: 100%;
          background: linear-gradient(180deg,
            rgba(30,27,75,0.98) 0%,
            rgba(15,12,45,1) 100%
          );
          border-top: 1px solid rgba(129,140,248,0.45);
          border-radius: 32px 32px 0 0;
          display: flex;
          align-items: center; /* Center icons vertically */
          justify-content: space-around;
          padding: 14px 8px 20px;
          box-shadow: 0 -4px 25px rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
        }

        /* Top highlight edge */
        

        .nav-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          flex: 1;
        }

        .nav-item:not(.center-item):hover { }
        .nav-item:not(.center-item):active { }

        .nav-icon {
          width: 28px; height: 28px;
          position: relative;
          z-index: 2;
        }

        /* Enhanced Active State */
        .nav-item.active .nav-icon {
          filter: drop-shadow(0 0 5px rgba(167,139,250,0.6));
        }

        .nav-item:not(.active) .nav-icon {
          filter: brightness(0.9) saturate(0.9);
          opacity: 0.8;
        }

        /* Item specific active colors */
        .nav-item[data-id="challenges"].active .nav-icon { color: #a78bfa; }
        .nav-item[data-id="shop"].active .nav-icon { color: #818cf8; }
        .nav-item[data-id="play"].active .nav-icon { color: #6366f1; }
        .nav-item[data-id="nft"].active .nav-icon { 
          color: #c4b5fd;
          filter: drop-shadow(0 0 10px rgba(167,139,250,0.9));
        }
        .nav-item[data-id="settings"].active .nav-icon { color: #c4b5fd; }

        /* Beaming Text Effect */
        .nft-text-beaming {
          fill: url(#nftTextGrad);
          filter: drop-shadow(0 0 2px rgba(196, 181, 253, 0.4));
          animation: text-beam 2s ease-in-out infinite;
        }

        .nav-item.active .nft-text-beaming {
          animation: text-beam-active 1.5s ease-in-out infinite;
        }

        @keyframes text-beam {
          0%, 100% { filter: drop-shadow(0 0 1px rgba(196, 181, 253, 0.3)); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 3px rgba(196, 181, 253, 0.6)); opacity: 1; }
        }

        @keyframes text-beam-active {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(196, 181, 253, 0.6)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 12px rgba(196, 181, 253, 1)); transform: scale(1.05); }
        }

        /* Indicator Animation */
        .indicator-pulse {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          transform-origin: center;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .nft-sparkle {
          animation: sparkle-float 3s ease-in-out infinite;
        }

        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-2px); opacity: 0.6; }
        }

        /* Active underline pip */
        .nav-pip {
          position: absolute;
          bottom: -4px; left: 50%;
          transform: translateX(-50%);
          width: 0px; height: 4px;
          border-radius: 4px;
          background: #ffffff;
          box-shadow: 0 0 15px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,0.8);
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
          z-index: 10;
        }

        .nav-item.active .nav-pip { 
          opacity: 1; 
          width: 22px; 
        }

        /* Effects removed as per user request */

        /* ========================
           CENTER 3D DIAMOND BUTTON
           ======================== */
        .center-item {
          flex: 0 0 auto;
          position: relative;
          z-index: 10;
          margin-top: -4px;
        }

        .center-pedestal {
          position: absolute;
          bottom: -6px; left: 50%;
          transform: translateX(-50%);
          width: 64px; height: 10px;
          background: radial-gradient(ellipse, rgba(245,158,11,0.4) 0%, transparent 70%);
          filter: blur(4px);
        }

        .center-btn {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 18px;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3), inset 0 2px 5px rgba(255, 255, 255, 0.4);
          cursor: pointer;
        }

        .center-btn:hover { }
        .center-btn:active { }

        .center-item.active .gem-outer {
          box-shadow:
            0 0 15px rgba(245,158,11,0.8),
            inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .gem-outer {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .gem-facet-top {
          position: absolute;
          top: 18%; left: 18%; right: 18%;
          height: 28%;
          background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%);
          border-radius: 2px 2px 50% 50%;
          transform: rotate(45deg);
          transform-origin: center;
        }

        .gem-facet-left {
          position: absolute;
          top: 18%; left: 18%; bottom: 18%;
          width: 14%;
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%);
          transform: rotate(45deg);
          transform-origin: center;
        }

        .gem-icon-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .gem-diamond-svg {
          width: 14px; height: 14px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
        }

        .gem-ring {
          position: absolute;
          inset: -4px;
          border-radius: 10px;
          border: 1px solid rgba(253,230,138,0.2);
          transform: rotate(45deg);
          opacity: 0.3;
        }

        .gem-ring-2 {
          inset: -8px;
          border-radius: 12px;
          border: 0.8px solid rgba(245,158,11,0.1);
          animation-delay: 1s;
        }

      `}</style>

      <div className="nav-wrapper">
        <div className="nav-ambient" />
        <nav className="navbar">
          {navItems.map((item) =>
            item.isCenter ? (
              <div
                key={item.id}
                data-id={item.id}
                className={`nav-item center-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => onTabClick(item.id)}
              >
                <div className="center-btn">
                  <div className="gem-ring" />
                  <div className="gem-ring gem-ring-2" />
                  <div className="gem-outer">
                    <div className="gem-facet-top" />
                    <div className="gem-facet-left" />
                  </div>
                  <div className="sparkle" />
                  <div className="sparkle" />
                  <div className="sparkle" />
                  <div className="gem-icon-wrap">
                    <svg className="gem-diamond-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 6V18L18 12L7 6Z" fill="white" opacity="0.9" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="center-pedestal" />
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                data-id={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => onTabClick(item.id)}
              >
                {item.icon}
                <div className="nav-pip" />
              </div>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
