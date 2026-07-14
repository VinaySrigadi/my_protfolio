import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "viswam-tech-lead",
    role: "Tech Lead",
    company: "Viswam.ai",
    location: "IIIT Hyd, Gachibowli",
    type: "internship",
    remote: false,
    current: false,
    startDate: "July 2025",
    endDate: "Sept 2025",
    description: [
      "Led full-stack development of the Corpus app (React), delivering multi-lingual support across 3 languages; redesigned task navigation flow reducing annotator clicks per task from 9 to 4, improving throughput for 20+ active users.",
      "Designed JWT-secured RESTful API with role-based access control, decoupling auth logic from UI layer and enabling safe multi-tenant access across the platform.",
      "Migrated intern tracking dashboard from Streamlit to React, cutting average page load time from ~4s to under 800ms and supporting 50+ concurrent users without backend changes.",
    ],
    technologies: ["React", "Flutter", "Dart", "Streamlit", "REST APIs", "UI/UX Design", "Authentication & Security"],
    achievements: [],
  },
  {
    id: "ieee-ai-intern",
    role: "AI/ML Intern",
    company: "IEEE Hyderabad",
    location: "Hyderabad, India",
    type: "internship",
    remote: false,
    current: false,
    startDate: "May 2025",
    endDate: "June 2025",
    description: [
      "Designed a sequence-to-sequence LSTM pipeline to synthesize beat-conditioned 3D skeletal motion from raw audio without using any pre-trained motion priors or pose databases. Presented at NCNTAIA-2025.",
      "Designed a multi-modal data pipeline using MediaPipe for skeleton extraction and Librosa for audio feature engineering, processing 100+ video clips to generate synchronized training pairs.",
      "Achieved 38.56% PCK on a custom LSTM-based motion generation model — a strong baseline for novel choreography synthesis.",
    ],
    technologies: ["Python", "TensorFlow", "Keras", "MediaPipe", "LSTM", "Librosa"],
    achievements: [],
  },
];
