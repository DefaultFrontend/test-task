import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export const useSolSignMessage = () => {
  const { signMessage } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignMessage = async (message: string) => {
    try {
      toast.loading("Signing message...");
      setIsLoading(true);
      if (!signMessage) {
        throw new Error("Wallet does not support message signing");
      }
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(messageBytes);
      const signatureBase64 = Buffer.from(signatureBytes).toString("base64");
      toast.dismiss();
      toast.success("Message signed successfully");
      setSignature(signatureBase64);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast.dismiss();
      toast.error(errorMessage, {
        action: {
          label: "Retry",
          onClick: () => handleSignMessage(message),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignMessage,
    isLoading,
    signature,
  };
};
