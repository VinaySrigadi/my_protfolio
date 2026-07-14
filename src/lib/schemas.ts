import { siteConfig } from "@/config/site";

interface PersonSchemaOptions {
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
}

interface WebSiteSchemaOptions {
  name: string;
  url: string;
  description: string;
}

interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
}

export type JsonLdRecord = Record<string, unknown>;

export function personSchema(): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    email: siteConfig.author.email,
    sameAs: siteConfig.social.map((s) => s.href),
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Full Stack Development",
      "Cloud Computing",
      "Research",
    ],
  };
}

export function webSiteSchema(
  options: WebSiteSchemaOptions = {
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }
): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name,
    url: options.url,
    description: options.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${options.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(options: ArticleSchemaOptions): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Person",
      name: options.authorName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    image: options.image ?? siteConfig.ogImage,
    mainEntityOfPage: { "@type": "WebPage", "@id": options.url },
  };
}

export type { PersonSchemaOptions, WebSiteSchemaOptions, ArticleSchemaOptions };
