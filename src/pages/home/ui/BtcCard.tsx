import { BtcButtonWithConnect, useBtcSignMessage, useBtcWalletContext } from "@/features/btc";
import ChainCard from "./ChainCard";
import { Button } from "@/shared/ui";
import { truncateAddress } from "@/shared/lib/utils";

const BtcCard = () => {
  const { isConnected, disconnectWallet, address } = useBtcWalletContext();
  const { signMessage, isLoading, signature } = useBtcSignMessage();

  return (
    <ChainCard title="BTC" description="Sign message to get a job">
      <div className="flex flex-col gap-2">
        {address && <p>Address: {truncateAddress(address)}</p>}

        {signature && <p>Signature: {truncateAddress(signature)}</p>}
      </div>

      <div className="flex gap-2 max-md:flex-col mt-auto">
        <BtcButtonWithConnect variant="btc" disabled={isLoading} onClick={() => signMessage("Hello, world!")}>
          Sign Message
        </BtcButtonWithConnect>

        {isConnected && (
          <Button variant="outline" disabled={isLoading} onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        )}
      </div>
    </ChainCard>
  );
};

export default BtcCard;
