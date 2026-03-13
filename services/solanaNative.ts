import { registerPlugin } from '@capacitor/core';

export interface SolanaAuthResult {
  publicKey: string;
  accountName?: string;
  authToken?: string;
}

export interface SolanaMobilePlugin {
  authorize(options: { name: string; uri: string; icon: string }): Promise<SolanaAuthResult>;
}

const SolanaMobile = registerPlugin<SolanaMobilePlugin>('SolanaMobile');

export const solanaNativeService = {
  async connect(): Promise<SolanaAuthResult | null> {
    try {
      const result = await SolanaMobile.authorize({
        name: 'Cryptospell',
        uri: 'https://cryptospell.app',
        icon: 'favicon.ico'
      });
      return result;
    } catch (e) {
      console.error('Native Solana connection failed:', e);
      return null;
    }
  }
};
