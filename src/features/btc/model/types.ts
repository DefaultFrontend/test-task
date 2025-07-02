export interface BtcWalletState {
  isConnected: boolean;
  address: string | null;
  publicKey: string | null;
  balance: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface BtcWalletConnection {
  address: string;
  publicKey: string;
}

export type BtcWalletCapability = "connect" | "signMessage" | "signTransaction" | "getBalance";

export interface BtcWalletInfo {
  name: string;
  icon: string;
  capabilities: BtcWalletCapability[];
}
