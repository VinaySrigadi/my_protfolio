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
import Image from "next/image";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <Section spacing="sm" className="relative min-h-[75vh] pt-24 md:pt-32 pb-20 flex flex-col justify-center overflow-hidden" noContainer>
      <HeroCanvas />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <FadeIn delay={0.05} duration={0.8} distance={20}>
          <div className="relative mb-6">
            <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-emerald-500/20 blur-xl" />
            <div className="relative h-56 w-40 sm:h-64 sm:w-48 overflow-hidden rounded-3xl border-2 border-border shadow-2xl">
              <Image
                src="/profile-pic.jpg"
                alt="Vinay Srigadi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.8} distance={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-sm text-muted-foreground mb-8 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>
        </FadeIn>

        <h1 className="max-w-4xl font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
          <TextReveal text="Hi, I'm Vinay Srigadi." delay={0.2} duration={0.8} />
          <br />
          <TextReveal text="Generative AI Engineer." delay={0.6} duration={0.8} />
        </h1>

        <FadeIn delay={1.2} duration={0.8}>
          <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            AI/ML Engineer and Full-Stack Developer specializing in generative deep learning (VQ-VAE, Transformers, LSTM) and building production-grade systems using FastAPI and React.
          </p>
        </FadeIn>

        <FadeIn delay={1.4} duration={0.8} className="flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton>
            <Link 
              href="/projects"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3",
                "bg-primary text-primary-foreground font-medium transition-all duration-200",
                "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                "bg-muted/30 text-foreground font-medium border border-border transition-all duration-200",
                "hover:bg-muted/50 hover:border-border/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
