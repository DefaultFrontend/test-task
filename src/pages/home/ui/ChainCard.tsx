const ChainCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col text-white text-center gap-4 items-center border border-white/10 rounded-xl p-10 backdrop-blur-[100px] h-[50vh]">
      <p className="text-[40px] font-bold">{title}</p>
      <p className="text-[20px]">{description}</p>
      <div className="flex h-full flex-col gap-2">{children}</div>
    </div>
  );
};

export default ChainCard;
