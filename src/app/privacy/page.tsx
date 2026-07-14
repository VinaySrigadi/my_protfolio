import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Vinay Srigadi's portfolio website.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <main
      aria-label="Privacy policy page"
      className="min-h-dvh bg-background py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">
              Information Collected
            </h2>
            <p>
              This portfolio website collects minimal data. When you use the
              contact form, your name, email, and message are transmitted via
              Resend to the site owner and are not stored in any database.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">
              Analytics
            </h2>
            <p>
              This site uses Vercel Analytics to collect anonymised page view
              data. No personal information is collected or stored.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">
              Cookies
            </h2>
            <p>
              Only a theme preference cookie is stored locally in your browser.
              No tracking cookies are used.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">
              Contact
            </h2>
            <p>
              For any privacy concerns, please reach out via the contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
