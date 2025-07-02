import { useWallet } from "@solana/wallet-adapter-react";
import ChainCard from "./ChainCard";
import { Button } from "@/shared/ui";
import { SolButtonWithConnect, useSolSignMessage } from "@/features/sol";
import { truncateAddress } from "@/shared/lib/utils";

const SolanaCard = () => {
  const { connected, disconnect, publicKey } = useWallet();
  const { handleSignMessage, isLoading, signature } = useSolSignMessage();

  return (
    <ChainCard title="Solana" description="Sign message to get a job">
      <div className="flex flex-col gap-2">
        {publicKey && <p>Address: {truncateAddress(publicKey.toString())}</p>}

        {signature && <p>Signature: {truncateAddress(signature)}</p>}
      </div>

      <div className="flex gap-2 max-md:flex-col mt-auto">
        <SolButtonWithConnect variant="sol" disabled={isLoading} onClick={() => handleSignMessage("Hello, world!")}>
          Sign Message
        </SolButtonWithConnect>

        {connected && (
          <Button variant="outline" disabled={isLoading} onClick={disconnect}>
            Disconnect Wallet
          </Button>
        )}
      </div>
    </ChainCard>
  );
};

export default SolanaCard;
