export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  readTime: number;
  author?: string;
}

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  author?: string;
}
