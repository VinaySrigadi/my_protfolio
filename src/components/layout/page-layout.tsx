"use client";

import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * PageLayout — the outermost wrapper rendered inside RootLayout.
 * Mounts all global feature components and the Navbar + Footer.
 *
 * Split from RootLayout so it can be a Client Component (needed for
 * hooks in ScrollProgress, BackToTop, etc.) without making the root
 * layout itself a client component.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Global feature components */}
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />

      {/* App shell */}
      <div className="flex min-h-dvh flex-col">
        <Navbar />

        {/* Main content — pt-16 offsets the fixed navbar height */}
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </div>

      {/* Back to top sits outside the flex column so it overlays */}
      <BackToTop />
    </>
  );
}
