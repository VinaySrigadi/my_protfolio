// ─────────────────────────────────────────────
// Core domain types for the AI Engineer Portfolio
// ─────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email" | "scholar";
  href: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: "production" | "research" | "archived";
  featured: boolean;
  thumbnail: string;
  techStack: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  startDate: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "internship" | "full-time" | "part-time" | "contract";
  location: string;
  remote: boolean;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
  isDarkIcon?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badge?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueType: "conference" | "journal" | "workshop" | "preprint";
  year: number;
  abstract: string;
  paperUrl?: string;
  codeUrl?: string;
  slidesUrl?: string;
  poster?: string;
  doi?: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
