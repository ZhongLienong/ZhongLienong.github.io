import { getAllPosts } from './lib/posts';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  // Get all unique tags and series
  const allTags = [...new Set(posts.flatMap(post => post.tags))].sort();
  const allSeries = [...new Set(posts.map(post => post.series).filter(Boolean))].sort();

  return (
    <div className="section">
      <div className="status-bar">
        Total Posts: {posts.length} | Tags: {allTags.length} | Series: {allSeries.length}
      </div>

      {/* Filter Section */}
      <div className="section">
        <h2>🏷️ Browse by Tags</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {allTags.map(tag => (
            <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
              <span className="bg-indigo" style={{ 
                display: 'inline-block', 
                padding: '5px 10px', 
                margin: '2px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                #{tag}
              </span>
            </Link>
          ))}
        </div>

        <h2>📚 Browse by Series</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {allSeries.map(series => (
            <Link key={series} href={`/blog/series/${encodeURIComponent(series)}`}>
              <span className="bg-purple" style={{ 
                display: 'inline-block', 
                padding: '5px 10px', 
                margin: '2px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                📖 {series}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="section">
        <h2>📰 Recent Posts</h2>
        {posts.length === 0 ? (
          <p>No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid-container">
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
                      <span className="bg-indigo" style={{ 
                        fontSize: '11px', 
                        padding: '2px 6px', 
                        margin: '2px',
                        display: 'inline-block'
                      }}>
                        #{tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
