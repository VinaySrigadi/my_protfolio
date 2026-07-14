"use client";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { certifications } from "@/data";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/ui/glow-card";

export function CertificationsSection() {
  if (!certifications.length) return null;

  return (
    <Section id="certifications" spacing="lg">
      <SectionHeading 
        eyebrow="Qualifications"
        title="Licenses & Certifications"
        gradientWord="Certifications"
        description="Professional credentials and specialized training achievements."
      />

      <StaggerChildren className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <StaggerItem key={cert.id}>
            <GlowCard className="p-6 h-full flex items-center gap-4 group">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-[#2563EB]/20 text-primary">
                <Award className="size-6" />
              </div>
              
              <div className="flex-grow">
                  {cert.title}
                <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                <p className="text-xs text-[#71717A] mt-1">Issued {cert.issuedDate}</p>
              </div>

              {cert.credentialUrl && (
                <Link 
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/30 text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                  aria-label={`View ${cert.title} credential`}
                >
                  <ExternalLink className="size-4" />
                </Link>
              )}
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
