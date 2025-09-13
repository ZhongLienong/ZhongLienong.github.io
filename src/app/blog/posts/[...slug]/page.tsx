import { getPostBySlug, getAllPosts, getPostsBySeries } from '../../lib/posts';
import { BlogPost } from '../../lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  console.log('Static params for posts:', posts.map(p => p.slug));
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { slug } = await Promise.resolve(params);
  const fullSlug = slug.join('/');
  const post = await getPostBySlug(fullSlug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Zhu Han Wen Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await Promise.resolve(params);
  const fullSlug = slug.join('/');
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    notFound();
  }

  // Get series navigation if this post is part of a series
  let seriesPosts: BlogPost[] = [];
  if (post.series) {
    seriesPosts = await getPostsBySeries(post.series);
  }

  const currentIndex = seriesPosts.findIndex(p => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return (
    <div className="section">
      {/* Back to Blog */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/blog">← Back to Blog</Link>
      </div>

      {/* Post Header */}
      <article>
        <header>
          <h1>{post.title}</h1>
          
          <div className="status-bar" style={{ margin: '20px 0' }}>
            📅 {post.date} | ⏱️ {post.readTime} min read | ✍️ {post.author}
          </div>

          {/* Series Info */}
          {post.series && (
            <div className="section" style={{ marginBottom: '20px' }}>
              <h3>📖 Part of Series: {post.series}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {seriesPosts.map((seriesPost, index) => (
                  <div key={seriesPost.slug}>
                    {seriesPost.slug === post.slug ? (
                      <span className="bg-yellow" style={{ 
                        padding: '5px 10px', 
                        fontSize: '14px',
                        display: 'inline-block'
                      }}>
                        {index + 1}. {seriesPost.title} (Current)
                      </span>
                    ) : (
                      <Link href={`/blog/posts/${seriesPost.slug}`}>
                        <span className="bg-purple" style={{ 
                          padding: '5px 10px', 
                          fontSize: '14px',
                          display: 'inline-block'
                        }}>
                          {index + 1}. {seriesPost.title}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div style={{ marginBottom: '20px' }}>
            {post.tags.map(tag => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                <span className="bg-indigo" style={{ 
                  fontSize: '12px', 
                  padding: '3px 8px', 
                  margin: '2px',
                  display: 'inline-block'
                }}>
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.6',
            marginBottom: '40px'
          }}
        />

        {/* Series Navigation */}
        {post.series && (previousPost || nextPost) && (
          <div className="section">
            <h3>📚 Series Navigation</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                {previousPost && (
                  <Link href={`/blog/posts/${previousPost.slug}`}>
                    <span className="bg-teal" style={{ padding: '10px 15px', display: 'inline-block' }}>
                      ← Previous: {previousPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div>
                {nextPost && (
                  <Link href={`/blog/posts/${nextPost.slug}`}>
                    <span className="bg-teal" style={{ padding: '10px 15px', display: 'inline-block' }}>
                      Next: {nextPost.title} →
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
