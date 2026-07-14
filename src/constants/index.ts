// ─────────────────────────────────────────────
// Application-wide constants
// ─────────────────────────────────────────────

export const SITE_NAME = "Vinay Srigadi — AI Engineer";

// Routes
export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  RESEARCH: "/research",
  EXPERIENCE: "/experience",
  BLOG: "/blog",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
} as const;

// Responsive breakpoints (mirrors Project.md)
export const BREAKPOINTS = {
  XS: 320,
  SM: 375,
  MD: 425,
  LG: 640,
  XL: 768,
  "2XL": 1024,
  "3XL": 1280,
  "4XL": 1440,
  "5XL": 1920,
} as const;

// Animation timing
export const ANIMATION = {
  DURATION: {
    FAST: 0.15,
    DEFAULT: 0.3,
    SLOW: 0.6,
    VERY_SLOW: 1.0,
  },
  EASING: {
    EASE_OUT: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    EASE_IN_OUT: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
    SPRING: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
} as const;

// Color tokens (mirrors globals.css variables — used in TS if needed)
export const COLORS = {
  BACKGROUND: "#09090B",
  SURFACE: "#18181B",
  PRIMARY: "#2563EB",
  SECONDARY: "#7C3AED",
  TEXT: "#FAFAFA",
  MUTED: "#A1A1AA",
  BORDER: "rgba(255,255,255,0.08)",
} as const;

// Skill category IDs
export const SKILL_CATEGORIES = [
  "programming",
  "ai-ml",
  "deep-learning",
  "generative-ai",
  "frontend",
  "backend",
  "cloud",
  "databases",
  "devops",
] as const;

export type SkillCategoryId = (typeof SKILL_CATEGORIES)[number];
