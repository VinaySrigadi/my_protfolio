import { Metadata } from "next";
import { projects } from "@/data";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";


export const metadata: Metadata = {
  title: "Projects",
  description: "A comprehensive showcase of my work in AI, Machine Learning, and Full Stack Engineering.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section spacing="lg" className="pt-24 md:pt-32 pb-12">
        <SectionHeading 
          eyebrow="Portfolio"
          title="All Projects"
          gradientWord="Projects"
          description="Explore my complete portfolio of AI research, production systems, and engineering projects."
          align="center"
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}
