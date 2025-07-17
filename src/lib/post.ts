import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export interface MarkdownPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  icon: string;
  publishTime: string;
  slug: string;
  status: string;
  readingTime: number;
  description: string;
}

export interface PostMetadata {
  title: string;
  tags: string[];
  cover?: string;
  icon?: string;
  date: string;
  [key: string]: any;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

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
  const _readingTime = Math.ceil(readingTime(content).minutes);

  return {
    id: fileName,
    title: metadata.title || fileName,
    content,
    tags: metadata.tags || [],
    thumbnail: metadata.cover || '/default.webp',
    icon: metadata.icon || '/mascot.webp',
    publishTime: metadata.date || new Date().toISOString(),
    slug: metadata.slug || fileName,
    status: metadata.status || 'Draft',
    description: metadata.description || '',
    readingTime: _readingTime,
  };
}

/**
 * Get all markdown posts from a directory
 */
export function getAllMarkdownPosts(directory: string): MarkdownPost[] {
  const fullPath = postsDirectory;

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const posts: MarkdownPost[] = [];

  function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir).sort(); // 파일명 순으로 정렬하여 일관성 확보

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith('.md')) {
        try {
          const post = createMarkdownPost(filePath); // ← 파일 경로 넘김
          posts.push(post);
        } catch (error) {
          console.error(`Error parsing ${filePath}:`, error);
        }
      }
    }
  }

  traverseDirectory(fullPath);

  // Sort posts by publish time (newest first), then by slug for stable sorting
  return posts.sort((a, b) => {
    const timeA = new Date(a.publishTime).getTime();
    const timeB = new Date(b.publishTime).getTime();

    if (timeB !== timeA) {
      return timeB - timeA;
    }

    // If publish times are equal, sort by slug alphabetically
    return a.slug.localeCompare(b.slug);
  });
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
  return posts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase()));
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(directory: string): string[] {
  const posts = getAllMarkdownPosts(directory);
  const tagMap = new Map<string, string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, tag);
      }
    });
  });

  return Array.from(tagMap.values());
}
