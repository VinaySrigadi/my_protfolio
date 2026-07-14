import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getProjectContent, getBlogSlugs, parseFrontmatter } from '../src/lib/mdx';
import fs from 'fs';

describe('MDX Utility Functions', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let existsSyncSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let readFileSyncSpy: any;

  beforeEach(() => {
    existsSyncSpy = vi.spyOn(fs, 'existsSync');
    readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProjectContent', () => {
    it('returns null if project mdx does not exist', () => {
      existsSyncSpy.mockReturnValue(false);
      
      const content = getProjectContent('non-existent');
      expect(content).toBeNull();
    });

    it('returns content without frontmatter', () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue('---\ntitle: "Test"\n---\nHello World');
      
      const content = getProjectContent('existing-project');
      expect(content).toBe('Hello World');
    });
  });

  describe('getBlogSlugs', () => {
    it('returns an empty array if blog directory does not exist', () => {
      existsSyncSpy.mockReturnValue(false);
      
      const slugs = getBlogSlugs();
      expect(slugs).toEqual([]);
    });
  });

  describe('parseFrontmatter', () => {
    it('parses valid frontmatter correctly', () => {
      const raw = `---\ntitle: "Hello World"\ndescription: 'A test post'\n---`;
      const result = parseFrontmatter(raw);
      expect(result).toEqual({
        title: 'Hello World',
        description: 'A test post'
      });
    });

    it('returns empty object if no frontmatter is found', () => {
      const result = parseFrontmatter('No frontmatter here');
      expect(result).toEqual({});
    });
  });
});
