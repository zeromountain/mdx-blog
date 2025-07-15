import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

import { ITag } from '@/types/post';

export interface MarkdownPost {
  id: string;
  title: string;
  content: string;
  tags: ITag[];
  cover: string;
  icon: string;
  publishTime: string;
  slug: string;
  status: string;
  readingTime?: number;
}

export interface PostMetadata {
  title: string;
  tags: string[];
  cover?: string;
  icon?: string;
  publishTime: string;
  [key: string]: any;
}

/**
 * Parse markdown file and extract frontmatter and content
 */
export function parseMarkdownFile(filePath: string): {
  metadata: PostMetadata;
  content: string;
} {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    metadata: data as PostMetadata,
    content: content.trim(),
  };
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);

  return result.toString();
}

/**
 * Create a MarkdownPost object from a markdown file
 */
export function createMarkdownPost(filePath: string): MarkdownPost {
  const { metadata, content } = parseMarkdownFile(filePath);
  const fileName = path.basename(filePath, '.md');

  // Convert tag strings to ITag objects
  const tags: ITag[] =
    metadata.tags?.map((tagName: string, index: number) => ({
      id: `tag-${index}`,
      name: tagName,
      color: 'default',
      description: '',
    })) || [];

  return {
    id: fileName,
    title: metadata.title || fileName,
    content,
    tags,
    cover: metadata.cover || '/default.webp',
    icon: metadata.icon || '/mascot.webp',
    publishTime: metadata.publishTime || new Date().toISOString(),
    slug: fileName,
    status: metadata.status || 'Draft',
  };
}

/**
 * Get all markdown posts from a directory
 */
export function getAllMarkdownPosts(directory: string): MarkdownPost[] {
  const fullPath = path.join(process.cwd(), directory);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const posts: MarkdownPost[] = [];

  function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith('.md')) {
        try {
          const post = createMarkdownPost(filePath);
          posts.push(post);
        } catch (error) {
          console.error(`Error parsing ${filePath}:`, error);
        }
      }
    }
  }

  traverseDirectory(fullPath);

  // Sort posts by publish time (newest first)
  return posts.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
}

/**
 * Get a specific markdown post by slug
 */
export function getMarkdownPostBySlug(directory: string, slug: string): MarkdownPost | null {
  const posts = getAllMarkdownPosts(directory);
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(directory: string, tagName: string): MarkdownPost[] {
  const posts = getAllMarkdownPosts(directory);
  return posts.filter((post) => post.tags.some((tag) => tag.name.toLowerCase() === tagName.toLowerCase()));
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(directory: string): ITag[] {
  const posts = getAllMarkdownPosts(directory);
  const tagMap = new Map<string, ITag>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tagMap.has(tag.name)) {
        tagMap.set(tag.name, tag);
      }
    });
  });

  return Array.from(tagMap.values());
}
