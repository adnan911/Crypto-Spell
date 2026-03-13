import React, { useState } from 'react';
import { ThemeId, ThemeDefinition, getAllThemes } from '../themes';
import { KeyboardId, KeyboardDefinition, getAllKeyboards } from '../keyboards';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../services/soundManager';
import { ThemeIcon } from './ThemeIcon';

interface MetaShopProps {
    onBack: () => void;
    coins: number;
    onPurchaseCoins?: (cost: number) => void;
}

const MetaShop: React.FC<MetaShopProps> = ({ onBack, coins, onPurchaseCoins }) => {
    const {
        currentTheme, setTheme, purchaseTheme, isUnlocked, canAfford,
        currentKeyboard, setKeyboard, purchaseKeyboard, isKeyboardUnlocked, canAffordKeyboard
    } = useTheme();
    
    const themes = getAllThemes();
    const keyboards = getAllKeyboards();

    const nftData = (() => {
        try {
            const raw = localStorage.getItem('cryptospell_nft_ownership');
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    })();
    const isNftHolder = nftData?.owned === true;

    const [activeTab, setActiveTab] = useState<'themes' | 'keyboards'>('themes');

    const handlePurchaseTheme = (theme: ThemeDefinition) => {
        // NFT Holders get everything for free
        if (isNftHolder) {
            setTheme(theme.id);
            soundManager.playClick();
            onBack();
            return;
        }

        if (theme.nftExclusive) {
            soundManager.playError();
            return;
        }

        if (isUnlocked(theme.id)) {
            setTheme(theme.id);
            soundManager.playClick();
            onBack();
            return;
        }

        if (canAfford(theme.id, coins)) {
            if (onPurchaseCoins) onPurchaseCoins(theme.price);
            const success = purchaseTheme(theme.id);
            if (success) {
                soundManager.playSuccess();
                setTheme(theme.id);
                onBack();
            }
        } else {
            soundManager.playError();
        }
    };

    const handlePurchaseKeyboard = (kb: KeyboardDefinition) => {
        // NFT Holders get everything for free
        if (isNftHolder) {
            setKeyboard(kb.id);
            soundManager.playClick();
            onBack();
            return;
        }

        if (kb.nftExclusive) {
            soundManager.playError();
            return;
        }

        if (isKeyboardUnlocked(kb.id)) {
            setKeyboard(kb.id);
            soundManager.playClick();
            onBack();
            return;
        }

        if (canAffordKeyboard(kb.id, coins)) {
            if (onPurchaseCoins) onPurchaseCoins(kb.price);
            const success = purchaseKeyboard(kb.id);
            if (success) {
                soundManager.playSuccess();
                setKeyboard(kb.id);
                onBack();
            }
        } else {
            soundManager.playError();
        }
    };

    const getThemeState = (theme: ThemeDefinition) => {
        if (currentTheme.id === theme.id) return 'active';
        if (isNftHolder) return 'owned'; // Holders can equip anything
        if (theme.nftExclusive) return 'nft_locked';
        if (isUnlocked(theme.id)) return 'owned';
        if (canAfford(theme.id, coins)) return 'available';
        return 'locked';
    };

    const getKeyboardStatus = (kb: KeyboardDefinition) => {
        if (currentKeyboard?.id === kb.id) return 'active';
        if (isNftHolder) return 'owned'; // Holders can equip anything
        if (kb.nftExclusive) return 'nft_locked';
        if (isKeyboardUnlocked(kb.id)) return 'owned';
        if (canAffordKeyboard(kb.id, coins)) return 'available';
        return 'locked';
    };

    return (
        <div className="fixed inset-0 min-h-[100dvh] bg-[#0d1a35] z-50 text-[#e4e4e4] flex justify-center overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Exo+2:wght@300;400;600;700;900&display=swap');

                .shop-container {
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
                    background: radial-gradient(circle, rgba(255,175,0,0.18) 0%, transparent 70%);
                    pointer-events: none;
                }
                .orb-2 {
                    position: absolute; bottom: 30%; left: -80px; width: 260px; height: 260px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(26,93,148,0.28) 0%, transparent 70%);
                    pointer-events: none;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    padding: 0 0 100px;
                    height: 100%;
                    overflow-y: auto;
                    scrollbar-width: none;
                }
                .content-wrapper::-webkit-scrollbar { display: none; }

                /* HEADER */
                .header { display: flex; align-items: center; justify-content: space-between; padding: 52px 22px 18px; }
                .header-back {
                    width: 38px; height: 38px; border-radius: 10px;
                    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center; cursor: pointer;
                }
                .header-back svg { width:16px; height:16px; stroke: var(--silver); }
                .header-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 20px; font-weight: 800; letter-spacing: 3px;
                    text-transform: uppercase; color: var(--silver);
                }
                .credits-badge {
                    display: flex; align-items: center; gap: 6px;
                    background: linear-gradient(135deg, #1a3a6e, #142143);
                    border: 1px solid rgba(255,175,0,0.4); border-radius: 20px;
                    padding: 6px 14px 6px 8px;
                    box-shadow: 0 0 14px rgba(255,175,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .credits-badge span {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 17px;
                    font-weight: 700; color: var(--gold); letter-spacing: 1px;
                }

                /* TABS */
                .tabs {
                    display: flex; gap: 0; margin: 0 18px 20px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px; padding: 4px; overflow: hidden;
                }
                .tab {
                    flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
                    padding: 10px 0; border-radius: 10px; cursor: pointer;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 14px;
                    font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--dim); transition: all 0.25s;
                }
                .tab svg { width: 15px; height: 15px; }
                .tab.active {
                    background: linear-gradient(135deg, var(--blue) 0%, #0e3a60 100%);
                    color: #fff; box-shadow: 0 0 16px rgba(26,93,148,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
                    border: 1px solid rgba(26,93,148,0.6);
                }

                /* EQUIPPED CARD */
                .equipped-card {
                    margin: 0 18px 14px;
                    background: linear-gradient(135deg, rgba(26,93,148,0.4), rgba(17,34,91,0.6));
                    border: 1.5px solid var(--blue);
                    border-radius: 16px; padding: 14px 16px;
                    display: flex; align-items: center; gap: 14px;
                    position: relative; overflow: hidden;
                    box-shadow: 0 0 24px rgba(26,93,148,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .equipped-card::before {
                    content: ''; position: absolute; top:0; left:0; right:0; height:1.5px;
                    background: linear-gradient(90deg, transparent, var(--gold), var(--blue), transparent);
                    opacity: 0.7;
                }
                .equipped-icon {
                    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 14px rgba(26,93,148,0.3);
                    font-size: 20px;
                }
                .equipped-name {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 18px;
                    font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; flex:1;
                }
                .equipped-badge {
                    display: flex; align-items: center; gap: 5px;
                    background: linear-gradient(135deg, rgba(255,175,0,0.2), rgba(255,175,0,0.08));
                    border: 1px solid rgba(255,175,0,0.5); border-radius: 20px;
                    padding: 5px 12px;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
                    font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold);
                    box-shadow: 0 0 10px rgba(255,175,0,0.2);
                }
                .equipped-badge svg { width:12px; height:12px; stroke: var(--gold); }

                /* SECTION LABEL */
                .section-label {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 10px;
                    font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
                    color: rgba(255,175,0,0.6); padding: 6px 22px 10px;
                    display: flex; align-items: center; gap: 10px;
                }
                .section-label::after {
                    content: ''; flex: 1; height: 1px;
                    background: linear-gradient(90deg, rgba(255,175,0,0.2), transparent);
                }

                /* STORE ITEMS */
                .store-list { display: flex; flex-direction: column; gap: 10px; padding: 0 18px; }

                .store-item {
                    position: relative; border-radius: 14px; overflow: hidden;
                    cursor: pointer; transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
                }
                .store-item:hover { transform: translateY(-2px); }

                .store-item-inner {
                    position: relative;
                    background: linear-gradient(135deg, rgba(20,33,67,0.9), rgba(14,24,50,0.95));
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px; padding: 13px 14px;
                    display: flex; align-items: center; gap: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .theme-preview-bg {
                    position: absolute; inset: 0; opacity: 0.12;
                    background-size: cover; background-position: center;
                    filter: blur(8px); border-radius: 14px;
                }

                .item-icon {
                    width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; z-index: 2;
                    font-size: 18px;
                }

                .item-body { flex: 1; min-width: 0; position: relative; z-index: 2; }
                .item-name {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 15px;
                    font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
                    color: rgba(228,228,228,0.8);
                }
                .item-sub {
                    font-family: 'Exo 2', sans-serif; font-size: 10px;
                    color: rgba(228,228,228,0.4); letter-spacing: 0.5px; margin-top: 2px;
                }

                .item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; position: relative; z-index: 2; }
                .item-price {
                    display: flex; align-items: center; gap: 4px;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 14px;
                    font-weight: 700; color: var(--gold); letter-spacing: 0.5px;
                }
                .item-price svg { width: 12px; height: 12px; }
                .lock-btn {
                    display: flex; align-items: center; gap: 5px;
                    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px; padding: 5px 10px;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 11px;
                    font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
                    color: rgba(228,228,228,0.35); cursor: pointer;
                }
                .lock-btn svg { width: 10px; height: 10px; stroke: rgba(228,228,228,0.3); }

                /* NFT items */
                .nft-item-card .store-item-inner {
                    border-color: rgba(255,175,0,0.12);
                    background: linear-gradient(135deg, rgba(20,30,60,0.95), rgba(15,22,48,0.98));
                }
                .nft-badge {
                    display: flex; flex-direction: column; align-items: center; gap: 4px;
                    width: 100%;
                }
                .nft-badge-inner {
                    display: flex; align-items: center; gap: 6px;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
                    font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
                    color: rgba(255,175,0,0.55);
                }
                .nft-badge-inner svg { width: 16px; height: 16px; stroke: rgba(255,175,0,0.5); }
            `}</style>

            <div className="shop-container">
                <div className="bg-grid"></div>
                <div className="orb-1"></div>
                <div className="orb-2"></div>

                <div className="content-wrapper">
                    {/* Header */}
                    <div className="header">
                        <div className="header-back" onClick={onBack}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </div>
                        <span className="header-title">The Store</span>
                        <div className="credits-badge">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="11" r="8" fill="#ffaf00"/>
                                <text x="11" y="14" textAnchor="middle" fontSize="10" fontProject="Barlow Condensed" fontWeight="900" fill="#7a4800">$</text>
                            </svg>
                            <span>{coins}</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="tabs">
                        <div className={`tab ${activeTab === 'themes' ? 'active' : ''}`} onClick={() => setActiveTab('themes')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                            Themes
                        </div>
                        <div className={`tab ${activeTab === 'keyboards' ? 'active' : ''}`} onClick={() => setActiveTab('keyboards')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            Keys
                        </div>
                    </div>

                    {/* Equipped Slot */}
                    <div className="section-label">Equipped</div>
                    <div className="equipped-card">
                        <div className="equipped-icon" style={
                            activeTab === 'themes' 
                                ? { background: currentTheme.colors.accent1 + '22', border: `1px solid ${currentTheme.colors.accent1}55` }
                                : currentKeyboard ? { ...currentKeyboard.keyStyles, fontSize: '14px' } : { background: 'rgba(255,255,255,0.05)', border: '1px border-dashed rgba(255,255,255,0.2)' }
                        }>
                            {activeTab === 'themes' ? (
                                <ThemeIcon themeId={currentTheme.id} size={28} className="text-white" />
                            ) : (currentKeyboard ? '⌨️' : '🔘')}
                        </div>
                        <div className="equipped-name">
                            {activeTab === 'themes' ? currentTheme.name : (currentKeyboard?.name || 'Default Keyboard')}
                        </div>
                        <div className="equipped-badge">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Active
                        </div>
                    </div>

                    {/* Store List */}
                    <div className="section-label">Available {activeTab === 'themes' ? 'Themes' : 'Keyboards'}</div>
                    <div className="store-list">
                        
                        {activeTab === 'themes' && themes.map((theme) => {
                            const state = getThemeState(theme);
                            return (
                                <div key={theme.id} className="store-item" onClick={() => handlePurchaseTheme(theme)}>
                                    <div className="store-item-inner">
                                        <div className="theme-preview-bg" style={{ background: theme.gradients.background }}></div>
                                        <div className="item-icon" style={{ background: theme.colors.accent1 + '22', border: `1px solid ${theme.colors.accent1}55` }}>
                                            <ThemeIcon themeId={theme.id} size={24} className="text-white" />
                                        </div>
                                        <div className="item-body">
                                            <div className="item-name" style={{ color: state === 'active' ? '#fff' : '' }}>{theme.name}</div>
                                            <div className="item-sub">{theme.description}</div>
                                        </div>
                                        <div className="item-right">
                                            {state === 'active' ? (
                                                <div className="equipped-badge">Equipped</div>
                                            ) : state === 'owned' ? (
                                                <div className="lock-btn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Equip</div>
                                            ) : state === 'nft_locked' ? (
                                                <div className="nft-badge-inner"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>NFT</div>
                                            ) : (
                                                <>
                                                    <div className="item-price">
                                                        <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" fill="#ffaf00"/></svg>
                                                        {theme.price}
                                                    </div>
                                                    <div className="lock-btn">
                                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                                        Locked
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {activeTab === 'keyboards' && (
                            <>
                                {/* Default keyboard option */}
                                <div className="store-item" onClick={() => { setKeyboard(null); soundManager.playClick(); onBack(); }}>
                                    <div className="store-item-inner">
                                        <div className="item-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px border-dashed rgba(255,255,255,0.2)' }}>🔘</div>
                                        <div className="item-body">
                                            <div className="item-name">Default Keyboard</div>
                                            <div className="item-sub">Dynamic styling based on active theme</div>
                                        </div>
                                        <div className="item-right">
                                            {currentKeyboard === null ? <div className="equipped-badge">Active</div> : <div className="lock-btn">Equip</div>}
                                        </div>
                                    </div>
                                </div>

                                {keyboards.map(kb => {
                                    const status = getKeyboardStatus(kb);
                                    return (
                                        <div key={kb.id} className={`store-item ${status === 'nft_locked' ? 'nft-item-card' : ''}`} onClick={() => handlePurchaseKeyboard(kb)}>
                                            <div className="store-item-inner">
                                                <div className="item-icon" style={{ ...kb.keyStyles, fontSize: '14px' }}>⌨️</div>
                                                <div className="item-body">
                                                    <div className="item-name" style={{ color: status === 'active' ? '#fff' : '' }}>{kb.name}</div>
                                                    <div className="item-sub">{kb.description}</div>
                                                </div>
                                                <div className="item-right">
                                                    {status === 'active' ? (
                                                        <div className="equipped-badge">Equipped</div>
                                                    ) : status === 'owned' ? (
                                                        <div className="lock-btn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Equip</div>
                                                    ) : status === 'nft_locked' ? (
                                                        <div className="nft-badge-inner"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>NFT</div>
                                                    ) : (
                                                        <>
                                                            <div className="item-price">
                                                                <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" fill="#ffaf00"/></svg>
                                                                {kb.price}
                                                            </div>
                                                            <div className="lock-btn">
                                                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                                                Locked
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaShop;
