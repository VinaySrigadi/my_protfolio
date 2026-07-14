# AI Engineer Portfolio

A premium, high-performance portfolio engineered for AI/ML professionals. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. 

This portfolio features a dynamic MDX-based blog, GitHub GraphQL integrations, rich animations, and perfect SEO configurations out of the box.

## Features

- **Next.js App Router**: Lightning fast Server Components and dynamic routing.
- **MDX Engine**: Write your projects and blogs in Markdown with support for React components and VS Code-quality syntax highlighting (`rehype-pretty-code`).
- **GitHub Integration**: A live dashboard showcasing your contribution graph, real pinned repositories (via GraphQL), and recent commits.
- **Framer Motion**: Smooth scroll reveals, hover interactions, and global page transitions.
- **Premium Design**: Dark-first aesthetic powered by `shadcn/ui` and Tailwind CSS.
- **SEO Ready**: Automatically generated sitemaps, `robots.txt`, and rich JSON-LD Schema markup.
- **Fully Tested**: Includes a Vitest and React Testing Library suite.

## Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18.17.0 or newer)
- npm (Node Package Manager)

## Setup & Local Development

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *(Note: if you encounter peer dependency issues related to Babel or Vite plugins, run `npm install --legacy-peer-deps`)*

3. **Set up Environment Variables**:
   Copy the example environment file and add your GitHub Personal Access Token (PAT):
   ```bash
   cp .env.example .env.local
   ```
   - Open `.env.local` and add your `GITHUB_TOKEN`. This token requires the `read:user` and `repo` scopes to fetch your pinned repositories via the GraphQL API.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Adding Content

This portfolio is entirely content-driven via MDX. You do not need to write React code to add a new project or blog post.

- **Blog Posts**: Add new `.mdx` files to `src/content/blog/`. Make sure to include frontmatter (title, description, publishedAt, tags).
- **Projects**: 
  1. Add metadata to `src/data/projects.ts` (this drives the grid layout).
  2. Add a matching `.mdx` file to `src/content/projects/` (this drives the detail page).

## Testing

This project uses **Vitest** for unit testing.
To run the tests:
```bash
npx vitest run
```

## Deployment (Vercel)

This project requires zero configuration to deploy on Vercel.
1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com) and import the repository.
3. Add your `GITHUB_TOKEN` to the Vercel Environment Variables section.
4. Click **Deploy**. Vercel will automatically detect the Next.js framework and build the site.
