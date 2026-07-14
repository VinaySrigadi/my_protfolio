import { generatePageMetadata } from "@/lib/metadata";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch for collaborations, opportunities, or just to say hello.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main aria-label="Contact page" className="min-h-dvh bg-background">
      <ContactSection />
    </main>
  );
}
