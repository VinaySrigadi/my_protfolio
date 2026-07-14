import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-8 animate-spin text-[#2563EB]" />
        <p className="text-sm font-medium tracking-wider text-[#A1A1AA] uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
