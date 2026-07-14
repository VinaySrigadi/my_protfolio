import { generatePageMetadata } from "@/lib/metadata";
import { ExperienceSection } from "@/components/sections/experience-section";

export const metadata = generatePageMetadata({
  title: "Experience",
  description:
    "Professional experience, internships, and achievements in AI engineering and software development.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main aria-label="Experience page" className="min-h-dvh bg-background">
      <ExperienceSection />
    </main>
  );
}
