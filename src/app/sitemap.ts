import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getBlogSlugs } from '@/lib/mdx';
import { projects } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.startDate),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const routes = ['', '/projects', '/blog', '/research'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...routes, ...projectRoutes, ...blogRoutes];
}
