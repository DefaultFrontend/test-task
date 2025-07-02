import { useCallback } from "react";
import { BtcWalletApi } from "../api/walletApi";
import { toast } from "sonner";
import type { BtcWalletState } from "../model/types";

export const useBtcConnectWallet = (
  setState: React.Dispatch<React.SetStateAction<BtcWalletState>>,
  saveState: (newState: Partial<BtcWalletState>) => void
) => {
  const connectWallet = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    toast.loading("Connecting wallet...");

    await BtcWalletApi.connectWallet()
      .then((res) => {
        saveState({
          isConnected: true,
          address: res.address,
          publicKey: res.publicKey,
          isLoading: false,
          error: null,
        });
        toast.dismiss();
        toast.success("Wallet connected successfully");
        return res;
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        toast.dismiss();

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        toast.error(`Error: ${errorMessage}`);
        return errorMessage;
      });
  }, [setState, saveState]);

  return { connectWallet };
};
