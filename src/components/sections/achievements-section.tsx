"use client";

import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/animations/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { achievements } from "@/data";
import { Award, Code, Star, Trophy, Medal, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<string, LucideIcon> = {
  medal: Medal,
  award: Award,
  code: Code,
  star: Star,
  trophy: Trophy,
};

export function AchievementsSection() {
  return (
    <Section id="achievements" spacing="lg">
      <SectionHeading 
        eyebrow="Achievements"
        title="Milestones & Recognition"
        gradientWord="Recognition"
        description="Key highlights, awards, and certifications from my academic and professional journey."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, idx) => {
          const Icon = iconMap[achievement.icon || "award"] || Award;
          
          return (
            <FadeIn key={achievement.id} delay={idx * 0.1} direction="up">
              <GlowCard className="h-full p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="text-sm font-medium text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-full border border-border">
                    {achievement.date}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                  {achievement.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {achievement.description}
                </p>
              </GlowCard>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
