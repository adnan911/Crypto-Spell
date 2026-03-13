import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../services/soundManager';
import { haptics } from '../services/haptics';
import { useNftState } from '../hooks/useNftState';
import LegalModal from './LegalModal';
import { LEGAL_CONTENT } from '../constants/legalContent';

interface SettingsProps {
    onBack: () => void;
    onResetProgress: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onResetProgress }) => {
    const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
    const [hapticsEnabled, setHapticsEnabled] = useState(true);
    const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | 'risk' | 'refund' | null>(null);
    const { walletAddress, connectWallet, disconnectWallet } = useNftState();
    const [walletBusy, setWalletBusy] = useState(false);
    const connectionGuard = useRef(false);

    const handleConnectWallet = async () => {
        if (connectionGuard.current) return;
        
        const cap = (window as any).Capacitor;
        const isNative = cap && typeof cap.isNativePlatform === 'function' && cap.isNativePlatform();
        if (!isNative) {
            alert('Wallet connection requires the Android App. Please install the APK to connect your Solana wallet!');
            return;
        }

        try {
            connectionGuard.current = true;
            setWalletBusy(true);
            const result = await connectWallet();
            if (!result.success && result.error && !result.error.toLowerCase().includes('cancelled')) {
                alert('Connection Error: ' + result.error);
            }
        } finally {
            setWalletBusy(false);
            connectionGuard.current = false;
        }
    };

    const handleDisconnectWallet = async () => {
        setWalletBusy(true);
        try {
            await disconnectWallet();
        } finally {
            setWalletBusy(false);
        }
    };

    const toggleSound = () => {
        const newState = !soundEnabled;
        setSoundEnabled(newState);
        soundManager.setEnabled(newState);
        if (newState) soundManager.playClick();
    };

    const toggleHaptics = () => {
        const newState = !hapticsEnabled;
        setHapticsEnabled(newState);
        if (newState) {
            haptics.triggerImpactMedium();
        }
    };

    return (
        <div className="fixed inset-0 min-h-[100dvh] bg-[#0d1a35] z-50 text-[#e4e4e4] flex justify-center overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Exo+2:wght@300;400;600;700;900&display=swap');

                .settings-container {
                    --navy: #142143;
                    --gold: #ffaf00;
                    --gold-light: #ffd166;
                    --silver: #e4e4e4;
                    --blue: #1a5d94;
                    --blue-mid: #11225b;
                    --bg: #0d1a35;
                    --glow-gold: rgba(255,175,0,0.35);
                    --glow-blue: rgba(26,93,148,0.5);
                    --dim: rgba(228,228,228,0.45);
                    
                    font-family: 'Exo 2', sans-serif;
                    width: 100%;
                    max-width:390px;
                    height: 100%;
                    position: relative;
                    overflow-x: hidden;
                    background: linear-gradient(168deg, #0a1628 0%, #0d1a35 40%, #111e40 70%, #0b1830 100%);
                }

                .bg-grid {
                    position: absolute; inset: 0;
                    background-image: linear-gradient(rgba(26,93,148,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(26,93,148,0.07) 1px, transparent 1px);
                    background-size: 32px 32px;
                    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
                    pointer-events: none;
                }

                .orb-1 {
                    position: absolute; top: -40px; right: -60px; width: 280px; height: 280px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,175,0,0.16) 0%, transparent 70%);
                    pointer-events: none;
                }
                .orb-2 {
                    position: absolute; bottom: 30%; left: -80px; width: 260px; height: 260px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(26,93,148,0.25) 0%, transparent 70%);
                    pointer-events: none;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    padding: 0 0 40px;
                    height: 100%;
                    overflow-y: auto;
                    scrollbar-width: none;
                }
                .content-wrapper::-webkit-scrollbar { display: none; }

                /* HEADER */
                .header { display:flex; align-items:center; justify-content:space-between; padding: 52px 22px 24px; }
                .header-back {
                    width:38px; height:38px; border-radius:10px;
                    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
                    display:flex; align-items:center; justify-content:center; cursor:pointer;
                }
                .header-back svg { width:16px; height:16px; stroke:var(--silver); }
                .header-center { display:flex; align-items:center; gap:10px; }
                .header-title {
                    font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:800;
                    letter-spacing:3px; text-transform:uppercase; color:var(--silver);
                }
                .header-icon {
                    width:32px; height:32px;
                    background:linear-gradient(135deg,rgba(255,175,0,0.15),rgba(255,175,0,0.05));
                    border:1px solid rgba(255,175,0,0.3); border-radius:9px;
                    display:flex; align-items:center; justify-content:center;
                }
                .header-icon svg { width:16px; height:16px; stroke:var(--gold); }

                /* SECTION LABEL */
                .section-label {
                    font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700;
                    letter-spacing:4px; text-transform:uppercase; color:rgba(255,175,0,0.6);
                    padding: 6px 22px 10px;
                    display:flex; align-items:center; gap:10px;
                }
                .section-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,rgba(255,175,0,0.2),transparent); }

                /* SETTINGS GROUP CARD */
                .settings-group {
                    margin: 0 18px 20px;
                    background: linear-gradient(135deg, rgba(20,33,67,0.88), rgba(14,24,50,0.92));
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px; overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05);
                    position: relative;
                }
                .settings-group::before {
                    content:''; position:absolute; top:0; left:0; right:0; height:1.5px;
                    background:linear-gradient(90deg, transparent, rgba(255,175,0,0.4), rgba(26,93,148,0.3), transparent);
                }

                /* SETTING ROW */
                .setting-row {
                    display:flex; align-items:center; gap:14px; padding:16px 18px;
                    border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s;
                    cursor:pointer;
                }
                .setting-row:last-child { border-bottom:none; }
                .setting-row:hover { background:rgba(255,255,255,0.02); }

                .setting-row-icon {
                    width:42px; height:42px; border-radius:12px; flex-shrink:0;
                    display:flex; align-items:center; justify-content:center;
                }

                .setting-row-body { flex:1; }
                .setting-row-name {
                    font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:800;
                    letter-spacing:1.5px; text-transform:uppercase; color:#fff; line-height:1.1;
                }
                .setting-row-sub { font-family:'Exo 2',sans-serif; font-size:11px; color:var(--dim); margin-top:2px; letter-spacing:0.3px; }

                /* TOGGLE */
                .toggle-wrap { position:relative; flex-shrink:0; }
                .toggle-track {
                    display:block; width:48px; height:26px; border-radius:13px; cursor:pointer;
                    position:relative; transition:all 0.3s;
                    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
                }
                .active-toggle .toggle-track {
                    background:linear-gradient(90deg, var(--blue), #1a7ab8);
                    border-color: var(--blue);
                    box-shadow: 0 0 12px rgba(26,93,148,0.6);
                }
                .toggle-track::after {
                    content:''; position:absolute; top:3px; left:3px;
                    width:18px; height:18px; border-radius:50%;
                    background:rgba(228,228,228,0.4);
                    box-shadow:0 2px 4px rgba(0,0,0,0.3);
                    transition:transform 0.3s cubic-bezier(.34,1.56,.64,1), background 0.3s;
                }
                .active-toggle .toggle-track::after {
                    transform:translateX(22px);
                    background:#fff;
                    box-shadow:0 2px 8px rgba(26,93,148,0.5);
                }

                /* CONNECT WALLET BUTTON */
                .wallet-section { margin: 0 18px 20px; }
                .connect-wallet-btn {
                    width:100%; padding:18px 24px;
                    display:flex; align-items:center; justify-content:center; gap:12px;
                    background:linear-gradient(135deg, #1a5d94 0%, #ffaf00 50%, #1a5d94 100%);
                    background-size: 200% 100%; background-position: 0% 50%;
                    border:none; border-radius:16px; cursor:pointer;
                    font-family:'Barlow Condensed',sans-serif; font-size:18px;
                    font-weight:800; letter-spacing:3px; text-transform:uppercase; color:#fff;
                    box-shadow: 0 0 28px rgba(255,175,0,0.3), 0 8px 24px rgba(0,0,0,0.3);
                    position:relative; overflow:hidden;
                    transition: background-position 0.5s, box-shadow 0.3s, transform 0.2s;
                }
                .connect-wallet-btn:hover:not(:disabled) {
                    background-position: 100% 50%;
                    box-shadow: 0 0 40px rgba(255,175,0,0.5), 0 8px 32px rgba(0,0,0,0.35);
                    transform: translateY(-2px);
                }
                .connect-wallet-btn::before {
                    content:''; position:absolute; inset:0;
                    background:linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    border-radius:16px; pointer-events:none;
                }
                .connect-wallet-btn svg { width:22px; height:22px; stroke:#fff; flex-shrink:0; }

                /* LEGAL GRID */
                .legal-grid {
                    display:grid; grid-template-columns:1fr 1fr; gap:1px;
                    background:rgba(255,255,255,0.04);
                }
                .legal-item {
                    display:flex; align-items:center; gap:10px; padding:14px 18px;
                    background:linear-gradient(135deg, rgba(20,33,67,0.9), rgba(14,24,50,0.95));
                    cursor:pointer; transition:background 0.15s;
                }
                .legal-item:hover { background:rgba(255,255,255,0.04); }
                .legal-item-name {
                    font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700;
                    letter-spacing:2px; text-transform:uppercase; color:rgba(228,228,228,0.7);
                }
                .legal-item svg { width:14px; height:14px; stroke:rgba(26,93,148,0.8); flex-shrink:0; }
                .legal-full { grid-column:1/-1; justify-content:center; }
                .legal-full .legal-item-name { color:rgba(228,228,228,0.5); }

                /* DANGER ZONE */
                .danger-section {
                    margin: 0 18px 20px;
                    background:linear-gradient(135deg, rgba(80,10,10,0.4), rgba(40,5,5,0.6));
                    border:1px solid rgba(200,30,30,0.2); border-radius:18px; overflow:hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    position:relative;
                }
                .danger-section::before {
                    content:''; position:absolute; top:0; left:0; right:0; height:1.5px;
                    background:linear-gradient(90deg, transparent, rgba(200,40,40,0.6), transparent);
                }
                .danger-header {
                    display:flex; align-items:center; gap:8px; padding:14px 18px 10px;
                    border-bottom:1px solid rgba(200,30,30,0.15);
                }
                .danger-header span {
                    font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700;
                    letter-spacing:4px; text-transform:uppercase; color:rgba(220,60,60,0.7);
                }
                .danger-header svg { width:14px; height:14px; stroke:rgba(220,60,60,0.7); }
                .danger-row {
                    display:flex; align-items:center; gap:14px; padding:14px 18px;
                    border-bottom:1px solid rgba(200,30,30,0.08); cursor:pointer; transition:background 0.15s;
                }
                .danger-row:last-child { border-bottom:none; }
                .danger-row:hover { background:rgba(200,30,30,0.08); }
                .danger-row-icon {
                    width:36px; height:36px; border-radius:10px; flex-shrink:0;
                    display:flex; align-items:center; justify-content:center;
                    background:rgba(200,30,30,0.1); border:1px solid rgba(200,30,30,0.2);
                }
                .danger-row-icon svg { width:16px; height:16px; stroke:rgba(220,60,60,0.7); }
                .danger-row-name {
                    font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700;
                    letter-spacing:1.5px; text-transform:uppercase; color:rgba(220,100,100,0.8);
                }
                .danger-row-sub { font-family:'Exo 2',sans-serif; font-size:10px; color:rgba(220,100,100,0.4); margin-top:2px; }
                .danger-arrow { margin-left:auto; }
                .danger-arrow svg { width:14px; height:14px; stroke:rgba(220,60,60,0.4); }
                
                .version-info {
                    text-align: center;
                    color: rgba(228,228,228,0.2);
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
            `}</style>

            <div className="settings-container">
                <div className="bg-grid"></div>
                <div className="orb-1"></div>
                <div className="orb-2"></div>

                <div className="content-wrapper">
                    {/* Header */}
                    <div className="header">
                        <div className="header-back" onClick={() => { soundManager.playClick(); onBack(); }}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </div>
                        <div className="header-center">
                            <div className="header-icon">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                                </svg>
                            </div>
                            <span className="header-title">Settings</span>
                        </div>
                        <div style={{ width: 38 }}></div>
                    </div>

                    {/* Preferences */}
                    <div className="section-label">Preferences</div>
                    <div className="settings-group">
                        {/* Sound Effects */}
                        <div className="setting-row" onClick={toggleSound}>
                            <div className="setting-row-icon" style={{ background: 'linear-gradient(135deg,#0d2a3a,#071520)', border: '1px solid rgba(26,93,148,0.3)', boxShadow: '0 4px 12px rgba(26,93,148,0.2)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                </svg>
                            </div>
                            <div className="setting-row-body">
                                <div className="setting-row-name">Sound Effects</div>
                                <div className="setting-row-sub">UI and gameplay audio</div>
                            </div>
                            <div className={`toggle-wrap ${soundEnabled ? 'active-toggle' : ''}`}>
                                <div className="toggle-track"></div>
                            </div>
                        </div>

                        {/* Haptics */}
                        <div className="setting-row" onClick={toggleHaptics}>
                            <div className="setting-row-icon" style={{ background: 'linear-gradient(135deg,#0d2a3a,#071520)', border: '1px solid rgba(26,93,148,0.3)', boxShadow: '0 4px 12px rgba(26,93,148,0.2)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                                </svg>
                            </div>
                            <div className="setting-row-body">
                                <div className="setting-row-name">Haptics</div>
                                <div className="setting-row-sub">Device vibrations</div>
                            </div>
                            <div className={`toggle-wrap ${hapticsEnabled ? 'active-toggle' : ''}`}>
                                <div className="toggle-track"></div>
                            </div>
                        </div>
                    </div>

                    {/* Web3 Connection */}
                    <div className="section-label">Web3 Connection</div>
                    <div className="wallet-section">
                        {walletAddress ? (
                            <div className="settings-group" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.8)' }}></div>
                                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(228,228,228,0.5)', textTransform: 'uppercase' }}>Connected Solana</span>
                                </div>
                                <div style={{ fontFamily: 'monospace', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}>
                                    {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
                                </div>
                                <button
                                    onClick={handleDisconnectWallet}
                                    disabled={walletBusy}
                                    style={{ background: 'none', border: 'none', color: 'rgba(248,113,113,0.7)', fontSize: '10px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
                                >
                                    {walletBusy ? 'Disconnecting...' : 'Disconnect Wallet'}
                                </button>
                            </div>
                        ) : (
                            <button className="connect-wallet-btn" onClick={handleConnectWallet} disabled={walletBusy}>
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                    <path d="M1 10h22"/>
                                    <circle cx="17" cy="15" r="1" fill="white"/>
                                </svg>
                                {walletBusy ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                        )}
                    </div>

                    {/* Legal & Support */}
                    <div className="section-label">Legal & Support</div>
                    <div className="settings-group">
                        <div className="legal-grid">
                            {[
                                { id: 'privacy', label: 'Privacy', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
                                { id: 'terms', label: 'Terms', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
                                { id: 'risk', label: 'Risk', icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></> },
                                { id: 'refund', label: 'Refund', icon: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></> },
                            ].map((item) => (
                                <div key={item.id} className="legal-item" onClick={() => { soundManager.playClick(); setActiveLegalDoc(item.id as any); }}>
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">{item.icon}</svg>
                                    <span className="legal-item-name">{item.label}</span>
                                </div>
                            ))}
                            <a href="mailto:onchainersLab@gmail.com" className="legal-item legal-full" style={{ textDecoration: 'none' }}>
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <span className="legal-item-name">Contact Support</span>
                            </a>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="section-label" style={{ color: 'rgba(220,60,60,0.6)' }}>Danger Zone</div>
                    <div className="danger-section">
                        <div className="danger-row" onClick={() => {
                            if (window.confirm("Are you entirely sure you want to reset ALL progress? This cannot be undone.")) {
                                onResetProgress();
                            }
                        }}>
                            <div className="danger-row-icon">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="danger-row-name">Reset Progress</div>
                                <div className="danger-row-sub">Permanently wipe all data</div>
                            </div>
                            <div className="danger-arrow">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="version-info">
                        CryptoSpell v1.1.0 • Built for Solana
                    </div>
                </div>

                {/* Legal Modal */}
                {activeLegalDoc && (
                    <LegalModal 
                        isOpen={!!activeLegalDoc}
                        onClose={() => setActiveLegalDoc(null)}
                        title={LEGAL_CONTENT[activeLegalDoc].title}
                        content={LEGAL_CONTENT[activeLegalDoc].content}
                        type={activeLegalDoc}
                    />
                )}
            </div>
        </div>
    );
};

export default Settings;
