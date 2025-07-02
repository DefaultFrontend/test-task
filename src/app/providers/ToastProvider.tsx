import { Toaster } from "sonner";
import type { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={true}
        visibleToasts={5}
        toastOptions={{
          classNames: {
            toast:
              "group toast border-none shadow-lg rounded-[12px] font-medium text-[17px] leading-[22px] tracking-[-0.024em] px-[10px] py-[10px] min-h-0 max-w-[382px] justify-center",
            description: "text-[#0F0F0F] opacity-80",
            actionButton: "bg-[#0F0F0F] text-[#31D158] hover:bg-[#0F0F0F]/90",
            cancelButton: "bg-transparent text-[#0F0F0F] hover:bg-[#0F0F0F]/10",
            success: "bg-[#31D158] text-[#0F0F0F]",
            error: "bg-[#FF3B30] text-white",
          },
          style: {
            border: "none",
            borderRadius: "12px",
            padding: "10px",
            fontSize: "17px",
            fontWeight: "500",
            lineHeight: "22px",
            textAlign: "center",
            minHeight: "auto",
            maxWidth: "382px",
          },
        }}
      />
    </>
  );
};
