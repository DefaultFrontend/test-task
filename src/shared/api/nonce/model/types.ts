export interface Nonce {
  value: string;
  timestamp: number;
  isExpired: boolean;
}

export interface NonceState {
  current: string | null;
  loading: boolean;
  error: string | null;
}
