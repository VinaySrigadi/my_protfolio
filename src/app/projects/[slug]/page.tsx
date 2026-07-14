import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ExternalLink, Github, Folder } from "lucide-react";
import { projects } from "@/data";
import { siteConfig } from "@/config/site";

import { Container } from "@/components/layout/container";
import { StatusBadge } from "@/components/ui/status-badge";
import { TechBadge } from "@/components/ui/tech-badge";
import { mdxComponents } from "@/components/ui/mdx-components";
import { getProjectContent } from "@/lib/mdx";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      type: "article",
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const mdxContent = getProjectContent(project.slug);

  return (
    <article className="min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative border-b border-white/[0.08] bg-[#09090B] pt-24 md:pt-32">
        <Container className="pb-12 md:pb-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors mb-8 focus-visible:outline-none focus-visible:underline"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>

          <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <StatusBadge status={project.status} pulse={project.status === "production"} />
                <div className="text-sm font-medium text-[#71717A]">
                  {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAFAFA] mb-6">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed mb-8 max-w-2xl">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#3b82f6] hover:shadow-lg hover:shadow-[#2563EB]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-[#FAFAFA] transition-all duration-200 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    <Github className="size-4" />
                    View Source
                  </Link>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-full md:w-[400px] lg:w-[500px] shrink-0 aspect-video rounded-xl overflow-hidden border border-white/10 relative bg-[#18181B] flex items-center justify-center">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Folder className="size-16 text-white/5" />
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <Container narrow className="pt-16">
        {mdxContent ? (
          <div className="prose prose-invert prose-blue max-w-none">
            <MDXRemote source={mdxContent} components={mdxComponents} />
          </div>
        ) : (
          <div className="prose prose-invert prose-blue max-w-none">
            <h2 className="mt-12 scroll-m-20 border-b border-white/10 pb-2 text-2xl font-semibold tracking-tight text-[#FAFAFA] mb-6 first:mt-0">
              Overview
            </h2>
            <p className="leading-7 text-[#A1A1AA] mb-6">{project.description}</p>
          </div>
        )}
      </Container>
    </article>
  );
}
