"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types";
import { GlowCard } from "@/components/ui/glow-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { Search, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";

interface BlogListProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    let result = posts;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (activeTag) {
      result = result.filter((post) => post.tags.includes(activeTag));
    }
    
    return result;
  }, [posts, searchQuery, activeTag]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );



  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#71717A]">
            <Search className="size-5" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-surface border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-[#71717A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setActiveTag(null);
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTag === null
                ? "bg-primary text-white"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-white"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="min-h-[500px]">
        {paginatedPosts.length > 0 ? (
          <StaggerChildren key={currentPage + activeTag! + searchQuery} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-xl">
                  <GlowCard className="p-6 h-full flex flex-col hover:border-border/80 transition-colors">
                    <div className="flex items-center gap-4 text-xs font-medium text-[#71717A] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {post.readingTime} min read
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.slice(0, 3).map((tag) => (
                        <TechBadge key={tag} label={tag} size="sm" />
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-[#71717A] flex items-center ml-1">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center mb-4 text-[#71717A]">
              <Search className="size-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any articles matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTag(null);
              }}
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center size-10 rounded-lg bg-muted/30 border border-border text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex items-center justify-center size-10 rounded-lg border transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary/10 border-[#2563EB]/30 text-primary font-medium"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center size-10 rounded-lg bg-muted/30 border border-border text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
