import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      aria-label="404 error page"
      className="min-h-dvh bg-[#09090B] flex flex-col items-center justify-center gap-6 px-4"
    >
      <span
        aria-hidden="true"
        className="font-mono text-[#2563EB] text-sm tracking-widest uppercase"
      >
        404
      </span>
      <h1 className="text-4xl font-semibold text-[#FAFAFA] tracking-tight">
        Page not found
      </h1>
      <p className="text-[#A1A1AA] text-center max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-[#2563EB] text-white text-sm font-medium transition-colors hover:bg-[#3b82f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        Back to home
      </Link>
    </main>
  );
}
