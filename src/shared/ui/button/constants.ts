import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-xl border border-black/5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        sol: "bg-[#9945FF] text-white hover:bg-[#9945FF]/80",
        btc: "bg-[#F7931A] text-white hover:bg-[#F7931A]/80",
        outline: "bg-transparent text-white border border-white/50 hover:bg-white/10",
      },
      size: {
        default: "h-[42px] px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "sol",
      size: "default",
    },
  }
);
