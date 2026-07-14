import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import fs from "fs";
import path from "path";

import { siteConfig } from "@/config/site";
import { getBlogSlugs, parseFrontmatter } from "@/lib/mdx";
import { Container } from "@/components/layout/container";
import { TechBadge } from "@/components/ui/tech-badge";
import { mdxComponents } from "@/components/ui/mdx-components";
import { readingTime } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getPostData(slug: string) {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const frontmatter = parseFrontmatter(raw);
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, "");

  return {
    frontmatter,
    content,
    readingTime: readingTime(content),
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  if (!post) return { title: "Not Found" };

  return {
    title: post.frontmatter["title"] || resolvedParams.slug,
    description: post.frontmatter["description"] || "",
    openGraph: {
      title: `${post.frontmatter["title"]} | ${siteConfig.name}`,
      description: post.frontmatter["description"] || "",
      type: "article",
      publishedTime: post.frontmatter["publishedAt"],
    },
  };
}

/**
 * Configure rehype-pretty-code for VS Code quality syntax highlighting
 */
const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false, // We'll use our own background in mdx-components
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const tags = post.frontmatter["tags"] ? post.frontmatter["tags"].split(",").map(t => t.trim()) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter["title"],
    description: post.frontmatter["description"],
    datePublished: post.frontmatter["publishedAt"],
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  };

  return (
    <article className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Article Header */}
      <div className="relative border-b border-white/[0.08] bg-[#09090B] pt-24 md:pt-32">
        <Container narrow className="pb-12 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors mb-8 focus-visible:outline-none focus-visible:underline"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium text-[#71717A] mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {new Date(post.frontmatter["publishedAt"] || "").toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-6 leading-tight">
            {post.frontmatter["title"]}
          </h1>
          
          {post.frontmatter["description"] && (
            <p className="text-xl text-[#A1A1AA] leading-relaxed mb-8">
              {post.frontmatter["description"]}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>
        </Container>
      </div>

      {/* Article Content */}
      <Container narrow className="pt-12 md:pt-16">
        <div className="prose prose-invert prose-blue max-w-none 
          prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-[#A1A1AA] prose-p:leading-relaxed
          prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#FAFAFA]
          prose-code:text-[#FAFAFA] prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#18181B] prose-pre:border prose-pre:border-white/10
          [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:text-sm
        ">
          <MDXRemote 
            source={post.content} 
            components={mdxComponents} 
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
              },
            }}
          />
        </div>
      </Container>
    </article>
  );
}
