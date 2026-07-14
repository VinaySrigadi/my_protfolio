"use client";

import { ArrowRight, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextReveal } from "@/components/animations/text-reveal";
import { HeroCanvas } from "./hero-canvas";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <Section spacing="xl" className="relative min-h-[90vh] flex items-center overflow-hidden" noContainer>
      <HeroCanvas />
      
      <Container className="relative z-10 flex flex-col items-center text-center pt-20">
        <FadeIn delay={0.1} duration={0.8} distance={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#A1A1AA] mb-8 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>
        </FadeIn>

        <h1 className="max-w-4xl font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-[#FAFAFA]">
          <TextReveal text="Hi, I'm Vinay Srigadi." delay={0.2} duration={0.8} />
          <br />
          <TextReveal text="Generative AI Engineer." delay={0.6} duration={0.8} />
        </h1>

        <FadeIn delay={1.2} duration={0.8}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#A1A1AA] mb-10 leading-relaxed">
            AI/ML Engineer and Full-Stack Developer specializing in generative deep learning (VQ-VAE, Transformers, LSTM) and building production-grade systems using FastAPI and React.
          </p>
        </FadeIn>

        <FadeIn delay={1.4} duration={0.8} className="flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton>
            <Link 
              href="/projects"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3",
                "bg-[#2563EB] text-white font-medium transition-all duration-200",
                "hover:bg-[#3b82f6] hover:shadow-lg hover:shadow-[#2563EB]/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              )}
            >
              View Projects
              <ArrowRight className="size-4" />
            </Link>
          </MagneticButton>
          
          <MagneticButton>
            <Link 
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3",
                "bg-white/5 text-[#FAFAFA] font-medium border border-white/10 transition-all duration-200",
                "hover:bg-white/10 hover:border-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              )}
            >
              <FileText className="size-4" />
              Download Resume
            </Link>
          </MagneticButton>
        </FadeIn>
      </Container>
    </Section>
  );
}
