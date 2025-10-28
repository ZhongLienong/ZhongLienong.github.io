import { getPostsByTag, getAllTags } from '../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  // Return empty array if no tags - Next.js will skip this route
  if (tags.length === 0) {
    return [];
  }
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export const dynamicParams = false; // Only allow pre-generated paths

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged "${decodedTag}" - Zhu Han Wen Blog`,
    description: `All blog posts tagged with "${decodedTag}"`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="section">
      {/* Back to Blog */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/blog">← Back to Blog</Link>
      </div>

      <h1>🏷️ Posts tagged: #{decodedTag}</h1>
      
      <div className="status-bar">
        Found {posts.length} post{posts.length !== 1 ? 's' : ''} with this tag
      </div>

      <div className="grid-container" style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <div key={post.slug} className="grid-item">
            <h3>
              <Link href={`/blog/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            
            <div className="status-bar" style={{ fontSize: '12px', margin: '10px 0' }}>
              📅 {post.date} | ⏱️ {post.readTime} min read
            </div>

            {post.series && (
              <div style={{ marginBottom: '10px' }}>
                <Link href={`/blog/series/${encodeURIComponent(post.series)}`}>
                  <span className="bg-purple" style={{ 
                    fontSize: '12px', 
                    padding: '3px 8px',
                    display: 'inline-block'
                  }}>
                    📖 {post.series}
                  </span>
                </Link>
              </div>
            )}

            <p>{post.excerpt}</p>

            <div style={{ marginTop: '15px' }}>
              {post.tags.map(tag => (
                <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                  <span 
                    className={tag.toLowerCase() === decodedTag.toLowerCase() ? "bg-yellow" : "bg-indigo"}
                    style={{ 
                      fontSize: '11px', 
                      padding: '2px 6px', 
                      margin: '2px',
                      display: 'inline-block'
                    }}
                  >
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
