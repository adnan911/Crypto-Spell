// Haptic Feedback Service
// Uses the Vibration API: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API

class HapticManager {
    isEnabled: boolean = true;

    constructor() {
        // Check support
        if (typeof window !== 'undefined' && !window.navigator.vibrate) {
            console.log('Haptics not supported');
        }
    }

    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }

    // Light tap for typing (10-15ms)
    triggerImpactLight() {
        if (!this.isEnabled) return;
        if (navigator.vibrate) navigator.vibrate(10);
    }

    // Medium thud for selection/actions (30-40ms)
    triggerImpactMedium() {
        if (!this.isEnabled) return;
        if (navigator.vibrate) navigator.vibrate(40);
    }

    // Heavy buzz for errors
    triggerError() {
        if (!this.isEnabled) return;
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Double buzz
    }

    // Success pattern
    triggerSuccess() {
        if (!this.isEnabled) return;
        if (navigator.vibrate) navigator.vibrate([30, 50, 30, 50, 50]);
    }
}

export const haptics = new HapticManager();
