import { registerPlugin } from '@capacitor/core';

export interface ConnectResult {
  success: boolean;
  publicKeyBase64?: string;
  publicKeyBase58?: string;
  authToken?: string;
  signature?: string;
}

export interface SignInResult {
  // Not explicitly defined in new KT code, might re-use ConnectResult if useSIWS=true
}

export interface SignAndSendResult {
  ok: boolean;
  txSignature: string;
}

export interface SolanaMobilePlugin {
  connect(): Promise<ConnectResult>;
  signAndSendTransaction(options: { txBase64: string; rpcUrl?: string }): Promise<SignAndSendResult>;
  disconnect(): Promise<{ ok?: boolean }>;
}

export const SolanaMobile = registerPlugin<SolanaMobilePlugin>('SolanaMobile');
