"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";

import { GlowCard } from "@/components/ui/glow-card";
import { skills } from "@/data";
import type { SkillCategory, Skill } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function SkillsSection() {
  const categories = skills.map(c => c.label);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const activeCategoryData = skills.find((c: SkillCategory) => c.label === activeCategory);
  const filteredSkills = activeCategoryData ? activeCategoryData.skills : [];

  return (
    <Section id="skills" spacing="lg">
      <SectionHeading 
        eyebrow="Expertise"
        title="Technical Skills"
        gradientWord="Technical"
        description="Technologies and tools I use to build scalable AI systems and full-stack applications."
      />

      <div className="mt-12 flex flex-col items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1 bg-muted/30 border border-border rounded-xl mb-8">
          {categories.map((category: string) => (
            <button
              key={category.toString()}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]",
                activeCategory === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-primary/20 border border-[#2563EB]/30 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{String(category)}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="w-full max-w-4xl min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {filteredSkills.map((skill: Skill) => (
                <GlowCard key={skill.name} className="p-4 flex flex-col items-center justify-center text-center gap-3">
                  <div className="relative size-12 flex items-center justify-center grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                    {/* SVG icon could go here based on skill.icon if available */}
                    {/* Using a placeholder circle for now */}
                    <div className="size-8 rounded bg-muted/50 group-hover:bg-primary/20 transition-colors flex items-center justify-center font-mono font-bold text-muted-foreground group-hover:text-primary">
                      {skill.name[0]}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">{skill.name}</p>
                    <p className="text-xs text-primary font-medium">{skill.level}</p>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
