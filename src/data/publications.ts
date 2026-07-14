import type { Publication } from "@/types";

export const publications: Publication[] = [
  {
    id: "ncntaia-2025",
    title: "Choreography AI: Generating New Dance Steps",
    authors: ["Vinay Srigadi"],
    venue: "NCNTAIA-2025",
    venueType: "conference",
    year: 2025,
    abstract: "Designed a sequence-to-sequence LSTM pipeline to synthesize beat-conditioned 3D skeletal motion from raw audio without using any pre-trained motion priors or pose databases. Achieved 38.56% PCK on a custom LSTM-based motion generation model — a strong baseline for novel choreography synthesis.",
    tags: ["LSTM", "Sequence-to-Sequence", "Motion Generation", "Audio Engineering"],
  }
];
