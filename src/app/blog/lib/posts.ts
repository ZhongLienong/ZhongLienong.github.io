import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { BlogPost, BlogPostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

// Calculate reading time (average 200 words per minute)
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Recursively get all markdown files in directory
function getMarkdownFiles(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries
      .filter(file => file.isFile() && file.name.endsWith('.md'))
      .map(file => path.join(dir, file.name));
    
    const folders = entries.filter(folder => folder.isDirectory() && folder.name !== 'staging');
    for (const folder of folders) {
      files.push(...getMarkdownFiles(path.join(dir, folder.name)));
    }

    return files;
  } catch (error) {
    console.error('Error reading directory:', dir, error);
    return [];
  }
}

// Get all post slugs (including subdirectory paths)
export function getPostSlugs(): string[] {
  const files = getMarkdownFiles(postsDirectory);
  console.log('Found markdown files:', files);
  const slugs = files.map(file => {
    const relativePath = path.relative(postsDirectory, file);
    const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
    console.log(`File: ${file} -> Relative: ${relativePath} -> Slug: ${slug}`);
    return slug;
  });
  console.log('Generated slugs:', slugs);
  return slugs;
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Looking for post with slug: ${slug}`);
    // Construct the full path using path.join which handles separators correctly
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log(`Constructed path: ${fullPath}`);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Post not found at: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkMath) // Process math syntax
      .use(remarkRehype) // Convert Markdown to HTML AST
      .use(rehypeKatex) // Convert math in HTML AST to KaTeX HTML
      .use(rehypeStringify) // Convert HTML AST to HTML string
      .process(content);
    
    const contentHtml = processedContent.toString();
    
    // Validate required metadata
    const metadata = data as BlogPostMetadata;
    if (!metadata.title || !metadata.date || !metadata.excerpt) {
      console.warn(`Post ${slug} is missing required metadata`);
      return null;
    }

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      excerpt: metadata.excerpt,
      content: contentHtml,
      tags: metadata.tags || [],
      series: metadata.series,
      seriesOrder: metadata.seriesOrder,
      readTime: calculateReadTime(content),
      author: metadata.author || 'Zhu Han Wen'
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  );
  
  // Filter out null posts and sort by date (newest first)
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Get posts by series
export async function getPostsBySeries(series: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.series?.toLowerCase() === series.toLowerCase())
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = allPosts.flatMap(post => post.tags);
  return [...new Set(tags)].sort();
}

// Get all unique series
export async function getAllSeries(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const series = allPosts
    .map(post => post.series)
    .filter((series): series is string => Boolean(series));
  return [...new Set(series)].sort();
}
