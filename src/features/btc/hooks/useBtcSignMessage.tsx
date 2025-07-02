import { useCallback, useState } from "react";
import { BtcWalletApi } from "../api/walletApi";
import { toast } from "sonner";
import { useBtcWalletContext } from "./useBtcWalletContext";

export const useBtcSignMessage = () => {
  const { address } = useBtcWalletContext();
  const [signature, setSignature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signMessage = useCallback(
    async (message: string): Promise<string | null> => {
      if (!address) {
        throw new Error("Wallet not connected");
      }
      toast.loading("Signing message...");
      setIsLoading(true);
      const signature = await BtcWalletApi.signMessage(message, address)
        .then((res) => {
          toast.dismiss();
          toast.success("Message signed successfully");
          setSignature(res);
          return res;
        })
        .catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          toast.dismiss();

          toast.error(errorMessage, {
            action: {
              label: "Retry",
              onClick: () => signMessage(message),
            },
          });
          return error;
        })
        .finally(() => {
          setIsLoading(false);
        });
      return signature;
    },
    [address]
  );

  return { signMessage, signature, isLoading };
};
