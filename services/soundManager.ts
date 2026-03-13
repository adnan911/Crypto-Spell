// Sound Manager Service - Uses Web Audio API for game sounds
// No external audio files needed - generates sounds programmatically

class SoundManager {
    private audioContext: AudioContext | null = null;
    private enabled: boolean = true;
    private pitchModifier: number = 1.0;

    setPitchModifier(modifier: number) {
        this.pitchModifier = Math.max(0.5, Math.min(1.5, modifier)); // Clamp between 0.5 and 1.5
    }

    getPitchModifier(): number {
        return this.pitchModifier;
    }

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }
        return this.audioContext;
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    // Short click/tap sound
    playClick() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(800 * this.pitchModifier, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600 * this.pitchModifier, ctx.currentTime + 0.05);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
    }

    // Success jingle - ascending notes
    playSuccess() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.12;
            oscillator.frequency.setValueAtTime(freq * this.pitchModifier, startTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    }

    // Error buzz
    playError() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(150 * this.pitchModifier, ctx.currentTime);
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    }

    // Streak bonus - exciting ascending sweep
    playStreak() {
        if (!this.enabled) return;
        const ctx = this.getContext();

        for (let i = 0; i < 3; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            const startTime = ctx.currentTime + i * 0.08;
            oscillator.frequency.setValueAtTime((400 + i * 200) * this.pitchModifier, startTime);
            oscillator.frequency.exponentialRampToValueAtTime((800 + i * 200) * this.pitchModifier, startTime + 0.1);
            oscillator.type = 'triangle';

            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.2);
        }
    }

    // Hint sound - gentle notification
    playHint() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(880 * this.pitchModifier, ctx.currentTime);
        oscillator.frequency.setValueAtTime(660 * this.pitchModifier, ctx.currentTime + 0.1);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
    }

    // Coin earn sound
    playCoin() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(1200 * this.pitchModifier, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1600 * this.pitchModifier, ctx.currentTime + 0.1);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    }
}

export const soundManager = new SoundManager();
