import React, { useState, useCallback, useEffect, ReactNode } from "react";
import { useBtcConnectWallet, BtcWalletContext, type BtcWalletContextType, type BtcWalletState } from "@/features/btc";

const STORAGE_KEY = "bitcoin_wallet_state";

interface BtcWalletProviderProps {
  children: ReactNode;
}

export const BtcWalletProvider: React.FC<BtcWalletProviderProps> = ({ children }) => {
  const [state, setState] = useState<BtcWalletState>({
    isConnected: false,
    address: null,
    publicKey: null,
    balance: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState((prev) => ({
          ...prev,
          ...parsed,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error loading wallet state:", error);
      }
    }
  }, []);

  const saveState = useCallback((newState: Partial<BtcWalletState>) => {
    setState((prev) => {
      const updated = { ...prev, ...newState };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isConnected: updated.isConnected,
          address: updated.address,
          publicKey: updated.publicKey,
          balance: updated.balance,
        })
      );
      return updated;
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      isConnected: false,
      address: null,
      publicKey: null,
      balance: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const { connectWallet } = useBtcConnectWallet(setState, saveState);

  const value: BtcWalletContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    clearError,
  };

  return <BtcWalletContext.Provider value={value}>{children}</BtcWalletContext.Provider>;
};
