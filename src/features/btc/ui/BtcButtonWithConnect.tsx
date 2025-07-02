import { Button, ButtonProps } from "@/shared/ui";
import { PropsWithChildren } from "react";
import { useBtcWalletContext } from "../hooks";

export const BtcButtonWithConnect = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  const { isConnected, address, isLoading, connectWallet } = useBtcWalletContext();

  if (isConnected && address) {
    return <Button {...props}>{children}</Button>;
  }

  return (
    <Button variant="sol" {...props} disabled={isLoading} onClick={connectWallet}>
      {isLoading ? (
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
