import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Experience",
  description:
    "Professional experience, internships, and achievements in AI engineering and software development.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main aria-label="Experience page" className="min-h-dvh bg-[#09090B]">
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-[#A1A1AA] font-mono text-sm">Experience — Phase 5</p>
      </div>
    </main>
  );
}
