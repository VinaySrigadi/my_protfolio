"use client";

import { useState } from "react";
import Link from "next/link";
import { GlowCard } from "@/components/ui/glow-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { Publication } from "@/types";
import { BookOpen, FileText, Github, Presentation, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlowCard className="p-6 md:p-8 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#A1A1AA] mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
              <BookOpen className="size-3.5" />
              {publication.venueType.charAt(0).toUpperCase() + publication.venueType.slice(1)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              {publication.year}
            </span>
            {publication.doi && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                DOI: {publication.doi}
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-[#FAFAFA] leading-tight mb-4">
            {publication.title}
          </h3>
          <p className="text-[#A1A1AA]">
            {publication.authors.map((author, idx) => (
              <span key={idx} className={cn("inline-block mr-2", author === "Vinay Srigadi" ? "text-[#FAFAFA] font-medium" : "")}>
                {author}{idx < publication.authors.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-white/[0.08]">
        <p className="text-sm text-[#71717A] italic">
          Presented in {publication.venue}
        </p>
      </div>

      <div className="flex-grow">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-[#FAFAFA] hover:text-[#2563EB] transition-colors mb-4 focus-visible:outline-none"
        >
          Abstract
          {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {publication.abstract}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mb-8">
          {publication.tags.map((tag) => (
            <TechBadge key={tag} label={tag} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-white/[0.08]">
        {publication.paperUrl && (
          <Link
            href={publication.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-[#FAFAFA] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <FileText className="size-4" />
            PDF
          </Link>
        )}
        {publication.codeUrl && (
          <Link
            href={publication.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-[#FAFAFA] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <Github className="size-4" />
            Code
          </Link>
        )}
        {publication.slidesUrl && (
          <Link
            href={publication.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-[#FAFAFA] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <Presentation className="size-4" />
            Slides
          </Link>
        )}
      </div>
    </GlowCard>
  );
}
