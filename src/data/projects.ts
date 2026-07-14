import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "music2dance-ai",
    slug: "music2dance-ai",
    title: "Music2Dance AI",
    tagline:
      "Generative AI platform that synthesizes beat-synchronized 3D choreography from audio using VQ-VAE and Transformers.",
    description:
      "Architected an end-to-end generative AI platform trained on 1,510 professional AIST++ dance sequences, mapping 140-dim audio features to beat-synchronized 2D choreography via VQ-VAE and a 6-layer Causal Transformer. Deployed on consumer hardware with 85% beat accuracy using FastAPI, Next.js, and MongoDB.",
    status: "production",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "VQ-VAE",
      "FastAPI",
      "Next.js",
      "MongoDB Atlas",
      "FFmpeg"
    ],
    tags: [
      "Generative AI",
      "Deep Learning",
      "Audio Processing",
      "Motion Generation",
      "Full Stack",
    ],
    githubUrl: "https://github.com/VinaySrigadi/music2dance-ai",
    startDate: "2025-01-01",
    endDate: "2026-01-01",
  },
  {
    id: "plant-identification-app",
    slug: "plant-identification-app",
    title: "Plant Identification App",
    tagline:
      "Offline TFLite CNN model achieving sub-200ms inference for real-time botanical classification.",
    description:
      "Deployed a highly optimized TensorFlow Lite CNN model directly onto mobile devices via Flutter. Engineered to perform offline plant identification with 85%+ classification accuracy across 30 species with sub-200ms latency.",
    status: "production",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    techStack: [
      "Flutter",
      "Dart",
      "TensorFlow Lite",
      "Python",
      "CNN"
    ],
    tags: ["Computer Vision", "Edge AI", "Mobile Development", "Flutter"],
    githubUrl: "https://github.com/VinaySrigadi",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "mental-health-app",
    slug: "mental-health-app",
    title: "Mental Health AI App",
    tagline:
      "Full-stack mobile application integrating Mistral-7B for empathetic conversational AI and mood tracking.",
    description:
      "Built and deployed a comprehensive full-stack mental health tracking application using Flutter, Flask, and MongoDB. Showcased end-to-end deployment of the Mistral-7B LLM on commodity hardware to provide private, responsive conversational therapy and mood tracking.",
    status: "production",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    techStack: [
      "Flutter",
      "Flask",
      "MongoDB Atlas",
      "Mistral-7B",
      "Python"
    ],
    tags: ["LLM", "Full Stack", "Mobile Development", "Healthcare"],
    githubUrl: "https://github.com/VinaySrigadi",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
