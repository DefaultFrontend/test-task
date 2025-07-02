import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, ButtonProps } from "@/shared";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

export const SolButtonWithConnect = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  const { publicKey, connected, connecting } = useWallet();
  const { setVisible, visible } = useWalletModal();

  useEffect(() => {
    if (visible) {
      toast.loading("Connecting wallet...");
    } else {
      toast.dismiss();
    }
  }, [visible]);

  if (connected && publicKey) {
    return <Button {...props}>{children}</Button>;
  }

  return (
    <Button variant="sol" {...props} disabled={connecting || visible} onClick={() => setVisible(true)}>
      {connecting || visible ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </div>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};
