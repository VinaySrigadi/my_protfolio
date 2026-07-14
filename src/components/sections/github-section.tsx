"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { 
  getGitHubStats, 
  getPinnedRepos, 
  getRecentCommits,
  type GitHubStats, 
  type GitHubRepo,
  type GitHubCommit
} from "@/lib/github";
import { Github, Star, GitFork, BookOpen, GitCommit, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import { siteConfig } from "@/config/site";

import { Skeleton } from "@/components/ui/skeleton";

export function GithubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, reposData, commitsData] = await Promise.all([
          getGitHubStats(),
          getPinnedRepos(4),
          getRecentCommits(5)
        ]);
        setStats(statsData);
        setRepos(reposData);
        setCommits(commitsData);
      } catch (err) {
        console.error("Failed to load GitHub data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Section id="github" spacing="lg">
        <SectionHeading eyebrow="Open Source" title="GitHub Activity" gradientWord="GitHub" />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full rounded-2xl bg-muted/30 lg:col-span-1" />
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-[120px] w-full rounded-2xl bg-muted/30" />)}
          </div>
        </div>
      </Section>
    );
  }

  if (!stats && repos.length === 0) return null;

  return (
    <Section id="github" spacing="lg">
      <SectionHeading 
        eyebrow="Open Source"
        title="GitHub Dashboard"
        gradientWord="Integration"
        description="My open-source contributions, pinned repositories, and recent coding activity."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile & Recent Activity Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {stats && (
            <FadeIn direction="up" delay={0.1}>
              <GlowCard className="p-8 flex flex-col items-center text-center">
                <Image 
                  src={stats.avatar_url} 
                  alt="GitHub Avatar" 
                  width={96}
                  height={96}
                  className="size-24 rounded-full border-2 border-border mb-4" 
                />
                <h3 className="text-xl font-semibold text-foreground">{stats.name || "GitHub Profile"}</h3>
                <p className="text-sm text-primary mb-4">@{stats.login}</p>
                
                {stats.bio && (
                  <p className="text-muted-foreground text-sm mb-6">{stats.bio}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 w-full border-t border-border pt-6">
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{stats.public_repos}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Repos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{stats.followers}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Followers</div>
                  </div>
                </div>
                
                <Link 
                  href={stats.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 border border-[#2563EB]/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <Github className="size-4" />
                  View Profile
                </Link>
              </GlowCard>
            </FadeIn>
          )}

          {/* Recent Commits */}
          {commits.length > 0 && (
            <FadeIn direction="up" delay={0.2} className="flex-grow">
              <GlowCard className="h-full p-6">
                <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                  <GitCommit className="size-4" />
                  Recent Commits
                </h3>
                <div className="space-y-4">
                  {commits.map((commit, idx) => (
                    <div key={`${commit.id}-${idx}`} className="relative pl-4 border-l border-border">
                      <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary" />
                      <div className="text-xs text-[#71717A] mb-1">
                        {new Date(commit.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} in{' '}
                        <span className="text-muted-foreground font-medium">{commit.repoName.split('/')[1]}</span>
                      </div>
                      <Link href={commit.url} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2 block group">
                        {commit.message}
                        <ExternalLink className="size-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </FadeIn>
          )}
        </div>

        {/* Right Column: Repos & Calendar */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Contribution Graph */}
          <FadeIn direction="up" delay={0.3}>
            <GlowCard className="p-6 overflow-hidden">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6 flex items-center gap-2">
                <Github className="size-4" />
                Contribution Graph
              </h3>
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="min-w-[750px]">
                  <GitHubCalendar 
                    username={siteConfig.githubUsername}
                    colorScheme="dark"
                    theme={{
                      dark: ['#18181B', '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'] // Blue theme to match our portfolio
                    }}
                    blockMargin={4}
                    blockSize={12}
                    fontSize={12}
                  />
                </div>
              </div>
            </GlowCard>
          </FadeIn>

          {/* Pinned Repositories */}
          <FadeIn direction="up" delay={0.4} className="flex-grow">
            <div className="h-full">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2 px-2">
                <Star className="size-4" />
                Pinned & Popular Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <GlowCard key={repo.id} className="p-6 flex flex-col group h-full">
                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                      <div className="flex items-center gap-2 truncate">
                        <BookOpen className="size-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#71717A] mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-primary" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-default">
                        <Star className="size-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-default">
                        <GitFork className="size-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
