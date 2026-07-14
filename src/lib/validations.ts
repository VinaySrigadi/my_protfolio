import { z } from "zod";

// ── Contact Form ──────────────────────────────────────────────
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be under 200 characters")
    .trim(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ── Search / Filter ───────────────────────────────────────────
export const searchSchema = z.object({
  query: z.string().max(200).trim().optional(),
  tag: z.string().max(50).trim().optional(),
  page: z.coerce.number().int().positive().default(1),
});

export type SearchValues = z.infer<typeof searchSchema>;

// ── Newsletter (future use) ────────────────────────────────────
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255)
    .trim()
    .toLowerCase(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
