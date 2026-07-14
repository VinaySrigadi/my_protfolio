import fs from "fs";
import path from "path";
import { readingTime } from "@/lib/utils";
import type { BlogPost } from "@/types";

const blogContentDir = path.join(process.cwd(), "src/content/blog");
const projectsContentDir = path.join(process.cwd(), "src/content/projects");

/**
 * Returns all blog post slugs found in src/content/blog/.
 */
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogContentDir)) return [];
  return fs
    .readdirSync(blogContentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Reads the frontmatter from a blog post MDX file.
 * Uses a simple regex-based parser to avoid heavy dependencies.
 */
export function parseFrontmatter(
  raw: string
): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match?.[1]) return {};

  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

/**
 * Returns post metadata for all blog posts (for listing pages).
 * Server-only — uses fs module.
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => {
      const filePath = path.join(blogContentDir, `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const frontmatter = parseFrontmatter(raw);
      const content = raw.replace(/^---\n[\s\S]*?\n---\n/, "");

      return {
        slug,
        title: frontmatter["title"] ?? slug,
        description: frontmatter["description"] ?? "",
        publishedAt: frontmatter["publishedAt"] ?? "",
        updatedAt: frontmatter["updatedAt"],
        tags: frontmatter["tags"]
          ? frontmatter["tags"].split(",").map((t) => t.trim())
          : [],
        readingTime: readingTime(content),
        featured: frontmatter["featured"] === "true",
      } satisfies BlogPost;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Reads the MDX content for a specific project.
 */
export function getProjectContent(slug: string): string | null {
  const filePath = path.join(projectsContentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  
  const raw = fs.readFileSync(filePath, "utf-8");
  // Remove frontmatter for rendering
  return raw.replace(/^---\n[\s\S]*?\n---\n/, "");
}
