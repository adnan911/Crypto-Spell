import { SolanaMobile } from '../plugins/solanaMobile';

export async function connectWalletNative() {
  return await SolanaMobile.connect();
}

export async function signAndSendTransactionNative(txBase64: string, rpcUrl?: string) {
  return await SolanaMobile.signAndSendTransaction({ txBase64, rpcUrl });
}

export async function disconnectWalletNative() {
  return await SolanaMobile.disconnect();
}
