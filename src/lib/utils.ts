import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Primary utility used across all components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string to a human-readable format.
 * @example formatDate("2024-01-15") → "January 2024"
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(
    new Date(dateString)
  );
}

/**
 * Converts a string to a URL-safe slug.
 * @example slugify("Music2Dance AI") → "music2dance-ai"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculates estimated reading time in minutes.
 */
export function readingTime(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncates a string to a maximum length, appending an ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Type-safe Object.entries
 */
export function typedEntries<T extends Record<string, unknown>>(
  obj: T
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Checks if code is running in a browser environment.
 */
export const isBrowser = typeof window !== "undefined";
