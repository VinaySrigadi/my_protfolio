import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validations";
import { siteConfig } from "@/config/site";

interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a contact form email via Resend.
 * Lazy-initializes the Resend client to avoid build-time errors.
 * Returns { success: true } or { success: false, error: "..." }
 */
export async function sendContactEmail(
  data: ContactFormValues
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { success: false, error: "Email service is not configured." };
  }

  try {
    // Lazy instantiation — avoids "Missing API key" error at build time
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <noreply@${new URL(siteConfig.url).hostname}>`,
      to: [siteConfig.author.email],
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent via ${siteConfig.url}
      `.trim(),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
