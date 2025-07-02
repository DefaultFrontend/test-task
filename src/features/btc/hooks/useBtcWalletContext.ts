import { createContext, useContext } from "react";
import type { BtcWalletState } from "../model/types";

export interface BtcWalletContextType extends BtcWalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  clearError: () => void;
}

export const BtcWalletContext = createContext<BtcWalletContextType | undefined>(undefined);

export const useBtcWalletContext = () => {
  const context = useContext(BtcWalletContext);
  if (context === undefined) {
    throw new Error("useBtcWalletContext must be used within a BtcWalletProvider");
  }
  return context;
};
