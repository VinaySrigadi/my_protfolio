import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch for collaborations, opportunities, or just to say hello.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main aria-label="Contact page" className="min-h-dvh bg-[#09090B]">
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-[#A1A1AA] font-mono text-sm">Contact — Phase 5</p>
      </div>
    </main>
  );
}
