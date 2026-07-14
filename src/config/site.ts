import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Vinay Srigadi",
  title: "AI Engineer & Full-Stack Developer",
  description:
    "AI/ML Engineer and Full-Stack Developer specializing in generative deep learning (VQ-VAE, Transformers, LSTM) and production-grade systems. Deploying high-performance models using FastAPI, Next.js, and PyTorch.",
  url: "https://vinaysrigadi.dev",
  ogImage: "/og-image.png",

  author: {
    name: "Vinay Srigadi",
    email: "vsrigadi@gmail.com",
    location: "Bowenpally, Hyderabad",
    availability: "Seeking roles at the intersection of applied AI and scalable product engineering",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  social: [
    {
      platform: "github",
      href: "https://github.com/VinaySrigadi",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      href: "https://linkedin.com/in/VinaySrigadi",
      label: "LinkedIn",
    },
    {
      platform: "email",
      href: "mailto:vsrigadi@gmail.com",
      label: "Email",
    },
  ] satisfies SocialLink[],

  resumeUrl: "/Vinay_Resume.pdf",
  githubUsername: "VinaySrigadi",
} as const;

export type SiteConfig = typeof siteConfig;
