import { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { SolanaMobile } from '../plugins/solanaMobile';

export default function WalletButtons() {
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);

  const onConnect = async () => {
    try {
      setBusy(true);
      const res = await SolanaMobile.connect();
      setAddress(res.publicKeyBase58 || res.publicKeyBase64 || '');
      console.log('connect result', res);
    } catch (e: any) {
      console.error('connect error', e);
      const errorMsg = e?.message || JSON.stringify(e);
      // Don't alert if the user intentionally cancelled the connection prompt
      if (!errorMsg.toLowerCase().includes('cancelled')) {
        alert('Connection Error: ' + errorMsg);
      }
    } finally {
      setBusy(false);
    }
  };

  const onDisconnect = async () => {
    try {
      setBusy(true);
      await SolanaMobile.disconnect();
      setAddress('');
    } catch (e) {
      console.error('disconnect error', e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      {!address ? (
        <button
          onClick={onConnect}
          disabled={busy}
          className="w-full py-4 glass border border-[var(--theme-glass-accent-border)] font-bold text-sm flex items-center justify-center gap-2 hover:border-[var(--theme-accent-1)] bg-[var(--theme-accent-3)]/10 text-white relative overflow-hidden"
          style={{ borderRadius: 'var(--theme-radius)' }}
        >
          {/* Subtle Glow Behind Button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-accent-1)] to-transparent opacity-20 hover:opacity-40 blur-md" />
          <Wallet size={18} className="text-[var(--theme-accent-2)] relative z-10" />
          <span className="tracking-widest relative z-10">{busy ? 'CONNECTING...' : 'CONNECT WALLET'}</span>
        </button>
      ) : (
        <div 
          className="w-full glass-accent p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          style={{ borderRadius: 'var(--theme-radius)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent-2)]/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">Connected Web3</span>
          </div>
          
          <div className="font-mono text-[var(--theme-text)] font-semibold tracking-wider bg-black/30 px-4 py-2 rounded-lg border border-white/5">
            {address.substring(0, 4)}...{address.substring(address.length - 4)}
          </div>
          
          <button
            onClick={onDisconnect}
            disabled={busy}
            className="mt-1 text-xs font-bold text-red-400/80 tracking-widest hover:text-red-400 flex items-center gap-1"
          >
            <LogOut size={12} />
            DISCONNECT
          </button>
        </div>
      )}
    </div>
  );
}
