import type { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { SolanaProvider } from "./SolanaProvider";
import { BtcWalletProvider } from "./BtcWalletProvider";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ToastProvider>
      <SolanaProvider>
        <BtcWalletProvider>{children}</BtcWalletProvider>
      </SolanaProvider>
    </ToastProvider>
  );
};
