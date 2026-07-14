import { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on Artificial Intelligence, Engineering, and Tech.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section spacing="lg" className="pt-24 md:pt-32 pb-12">
        <SectionHeading 
          eyebrow="Writing"
          title="Thoughts &"
          gradientWord="Engineering"
          description="A collection of my thoughts on machine learning, software architecture, and the intersection of product and engineering."
          align="center"
        />
      </Section>

      <Section spacing="sm" className="pt-0 pb-24">
        <BlogList posts={posts} />
      </Section>
    </>
  );
}
