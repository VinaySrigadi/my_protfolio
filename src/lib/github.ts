import { siteConfig } from "@/config/site";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
}

export interface GitHubStats {
  login: string;
  name: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  blog: string | null;
  company: string | null;
  location: string | null;
}

export interface GitHubCommit {
  id: string;
  message: string;
  repoName: string;
  url: string;
  date: string;
}

const GITHUB_API = "https://api.github.com";
const username = siteConfig.githubUsername;

const githubHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

/**
 * Fetches public GitHub profile stats.
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: githubHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubStats;
  } catch {
    return null;
  }
}

/**
 * Fetches recently updated public repositories.
 */
export async function getGitHubRepos(limit = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${limit}&type=public`,
      {
        headers: githubHeaders,
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return (await res.json()) as GitHubRepo[];
  } catch {
    return [];
  }
}

/**
 * Fetches Pinned repositories via GraphQL. Falls back to recent public repos if token is missing/invalid.
 */
export async function getPinnedRepos(limit = 6): Promise<GitHubRepo[]> {
  if (!process.env.GITHUB_TOKEN) {
    return getGitHubRepos(limit);
  }

  try {
    const query = `
      {
        user(login: "${username}") {
          pinnedItems(first: ${limit}, types: REPOSITORY) {
            nodes {
              ... on Repository {
                databaseId
                name
                nameWithOwner
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                updatedAt
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...githubHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("GraphQL failed");
    
    const data = await res.json();
    if (data.errors) throw new Error("GraphQL errors");

    const pinnedNodes = data.data.user.pinnedItems.nodes;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return pinnedNodes.map((node: any) => ({
      id: node.databaseId || Math.floor(Math.random() * 1000000),
      name: node.name,
      full_name: node.nameWithOwner,
      description: node.description,
      html_url: node.url,
      stargazers_count: node.stargazerCount,
      forks_count: node.forkCount,
      language: node.primaryLanguage?.name || null,
      topics: [],
      updated_at: node.updatedAt,
      homepage: null
    }));
  } catch {
    return getGitHubRepos(limit);
  }
}

/**
 * Fetches recent push events and extracts commits.
 */
export async function getRecentCommits(limit = 5): Promise<GitHubCommit[]> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}/events/public`, {
      headers: githubHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    
    const events = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pushEvents = events.filter((e: any) => e.type === "PushEvent");
    
    const commits: GitHubCommit[] = [];
    
    for (const event of pushEvents) {
      if (commits.length >= limit) break;
      
      for (const commit of event.payload.commits) {
        if (commits.length >= limit) break;
        commits.push({
          id: commit.sha.substring(0, 7),
          message: commit.message.split('\n')[0], // Get first line of commit message
          repoName: event.repo.name,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          date: event.created_at,
        });
      }
    }
    
    return commits;
  } catch {
    return [];
  }
}
