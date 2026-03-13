import { useState, useEffect } from 'react';
import { Wallet, LogOut, Zap } from 'lucide-react';

interface WalletButtonsProps {
  onWalletConnect?: (address: string) => void;
}

export default function WalletButtons({ onWalletConnect }: WalletButtonsProps) {
  const [address, setAddress] = useState<string>('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cryptospell_wallet') ?? '';
    setAddress(saved);
  }, []);

  const onConnect = async () => {
    // Check if we're on a native mobile platform
    let native = false;
    try {
      const cap = (window as any).Capacitor;
      native = cap && typeof cap.isNativePlatform === 'function' && cap.isNativePlatform();
    } catch {
      native = false;
    }

    if (!native) {
      alert('Wallet connection requires the Android App. Please install the APK to connect your Solana wallet!');
      return;
    }

    try {
      setBusy(true);
      const { SolanaMobile } = await import('../plugins/solanaMobile');
      const res = await SolanaMobile.connect();
      const addr = res.publicKeyBase58 || res.publicKeyBase64 || '';
      if (addr) {
        localStorage.setItem('cryptospell_wallet', addr);
        setAddress(addr);
        onWalletConnect?.(addr);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.toLowerCase().includes('cancelled')) {
        alert('Connection Error: ' + msg);
      }
    } finally {
      setBusy(false);
    }
  };

  const onDisconnect = async () => {
    try {
      setBusy(true);
      try {
        const { SolanaMobile } = await import('../plugins/solanaMobile');
        await SolanaMobile.disconnect();
      } catch {
        // ignore on web
      }
      localStorage.removeItem('cryptospell_wallet');
      localStorage.removeItem('cryptospell_nft_ownership');
      setAddress('');
    } finally {
      setBusy(false);
    }
  };

  /* ─── Connected State ─── */
  if (address) {
    return (
      <div
        style={{
          background: 'rgba(10,10,20,0.6)',
          border: '1px solid rgba(55,182,232,0.3)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#34d399',
            boxShadow: '0 0 8px rgba(52,211,153,0.8)',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            Connected Web3
          </span>
        </div>
        <div style={{
          fontFamily: 'monospace', color: '#fff', fontWeight: 600,
          letterSpacing: '0.1em', background: 'rgba(0,0,0,0.4)',
          padding: '8px 16px', borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.05)',
          fontSize: '14px',
        }}>
          {address.substring(0, 4)}...{address.substring(address.length - 4)}
        </div>
        <button
          onClick={onDisconnect}
          disabled={busy}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(248,113,113,0.7)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          <LogOut size={12} />
          {busy ? 'Disconnecting…' : 'Disconnect'}
        </button>
      </div>
    );
  }

  /* ─── Connect Wallet Button ─── */
  return (
    <button
      onClick={onConnect}
      disabled={busy}
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: busy
          ? 'rgba(20,20,40,0.9)'
          : 'linear-gradient(135deg, #f7c948 0%, #37B6E8 55%, #a855f7 100%)',
        borderRadius: '16px',
        border: 'none',
        padding: '2px',
        cursor: busy ? 'not-allowed' : 'pointer',
        opacity: busy ? 0.7 : 1,
        display: 'block',
      }}
    >
      {/* Inner dark surface */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '14px 24px',
          borderRadius: '14px',
          background: busy ? 'rgba(20,20,40,0.97)' : 'rgba(8,8,18,0.80)',
        }}
      >
        {busy ? (
          <Zap size={20} color="#9ca3af" />
        ) : (
          <Wallet
            size={20}
            style={{ color: '#f7c948', filter: 'drop-shadow(0 0 6px #f7c94899)' }}
          />
        )}
        <span
          style={
            busy
              ? { color: '#9ca3af', fontWeight: 900, letterSpacing: '0.2em', fontSize: '14px', textTransform: 'uppercase' }
              : {
                  background: 'linear-gradient(90deg, #f7c948, #37B6E8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }
          }
        >
          {busy ? 'Connecting…' : 'Connect Wallet'}
        </span>
      </span>
    </button>
  );
}
