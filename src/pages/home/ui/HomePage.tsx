import BtcCard from "./BtcCard";
import SolanaCard from "./SolanaCard";

export const HomePage = () => {
  return (
    <div className="min-h-screen  bg-[#0F0F0F] overflow-hidden relative p-4">
      <div className="bg-gradient-to-tl  from-[#9945FF] to-[#14F195] h-[40vw] aspect-square rounded-full absolute right-0 top-0 max-md:top-auto max-md:bottom-0 translate-x-[30%] translate-y-[-30%] blur-[120px] z-0" />
      <div className="bg-[#F7931A] h-[40vw] aspect-square rounded-full absolute left-0 top-0 translate-x-[-30%] translate-y-[-30%] blur-[120px] z-0" />
      <div className="bg-[#0F0F0F] h-[60vw] w-[100vw] rounded-full absolute left-[50%] top-0 translate-x-[-50%] blur-[120px]  z-0" />

      <div className="items-center grid md:grid-cols-2 z-10 relative min-h-screen gap-2">
        <BtcCard />
        <SolanaCard />
      </div>
    </div>
  );
};
