import { Metadata } from "next";
import { publications } from "@/data";
import { PublicationCard } from "@/components/research/publication-card";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";

export const metadata: Metadata = {
  title: "Research",
  description: "Academic publications, conference presentations, and research milestones in Artificial Intelligence.",
};

export default function ResearchPage() {
  return (
    <>
      <Section spacing="lg" className="pt-24 md:pt-32 pb-12">
        <SectionHeading 
          eyebrow="Academic"
          title="Research &"
          gradientWord="Publications"
          description="A collection of my academic work, conference papers, and contributions to the field of Artificial Intelligence."
          align="center"
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <div className="max-w-4xl mx-auto">
          {publications.length > 0 ? (
            <StaggerChildren className="grid grid-cols-1 gap-8">
              {publications.map((pub) => (
                <StaggerItem key={pub.id}>
                  <PublicationCard publication={pub} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              No publications available at the moment. Check back soon!
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
