"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { Brain, Terminal } from "lucide-react";
export function AboutSection() {
  return (
    <Section id="about" spacing="lg">
      <SectionHeading 
        eyebrow="About Me"
        title="Engineering Intelligence"
        gradientWord="Intelligence"
        description="AI/ML Engineer and Full-Stack Developer with a 9.49 CGPA, passionate about building systems that learn and adapt. My background spans generative deep learning research, full-stack architecture, and cloud deployment."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FadeIn delay={0.1} direction="up" className="md:col-span-2">
          <GlowCard className="h-full p-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="size-5 text-primary" />
              My Philosophy
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The true power of Artificial Intelligence lies at the intersection of rigorous academic research and scalable software engineering. I specialize in training complex generative models and bringing them to production.
              </p>
              <p>
                My recent work includes developing a 30M-parameter music-to-dance choreography AI using VQ-VAE and Transformers, which I presented at the NCNTAIA-2025 national conference.
              </p>
              <p>
                I approach AI from a full-stack perspective—ensuring that the machine learning models I build are supported by secure, high-performance backends (FastAPI, Next.js) and intuitive user interfaces (React, Flutter).
              </p>
            </div>
          </GlowCard>
        </FadeIn>

        <FadeIn delay={0.2} direction="up" className="md:col-span-1">
          <div className="flex flex-col gap-6 h-full">
            <GlowCard className="p-6 flex-1 flex flex-col justify-center">
               <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Terminal className="size-5 text-primary" />
                  Core Focus
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Generative AI & LLMs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Computer Vision & LSTMs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Full-Stack Architecture
                  </li>
                </ul>
            </GlowCard>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
