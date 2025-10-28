import { getPostsBySeries, getAllSeries } from '../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SeriesPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const series = await getAllSeries();
  // Return empty array if no series - Next.js will skip this route
  if (series.length === 0) {
    return [];
  }
  return series.map((seriesName) => ({
    series: encodeURIComponent(seriesName),
  }));
}

export const dynamicParams = false; // Only allow pre-generated paths

export async function generateMetadata({ params }: SeriesPageProps) {
  const { series } = await params;
  const decodedSeries = decodeURIComponent(series);

  return {
    title: `${decodedSeries} Series - Zhu Han Wen Blog`,
    description: `All blog posts in the "${decodedSeries}" series`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  const decodedSeries = decodeURIComponent(series);
  const posts = await getPostsBySeries(decodedSeries);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="section">
      {/* Back to Blog */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/blog">← Back to Blog</Link>
      </div>

      <h1>📚 Series: {decodedSeries}</h1>
      
      <div className="status-bar">
        {posts.length} part{posts.length !== 1 ? 's' : ''} in this series
      </div>

      {/* Series Overview */}
      <div className="section" style={{ marginTop: '20px' }}>
        <h2>📖 Reading Order</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/posts/${post.slug}`}>
              <span className="bg-purple" style={{ 
                padding: '8px 12px', 
                fontSize: '14px',
                display: 'inline-block'
              }}>
                {index + 1}. {post.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Detailed Post List */}
      <div className="section">
        <h2>📝 All Posts</h2>
        <div className="grid-container">
          {posts.map((post, index) => (
            <div key={post.slug} className="grid-item">
              <h3>
                <span className="bg-yellow" style={{ 
                  fontSize: '14px', 
                  padding: '3px 8px', 
                  marginRight: '10px',
                  display: 'inline-block'
                }}>
                  Part {index + 1}
                </span>
                <Link href={`/blog/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              
              <div className="status-bar" style={{ fontSize: '12px', margin: '10px 0' }}>
                📅 {post.date} | ⏱️ {post.readTime} min read
              </div>

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

              <div style={{ marginTop: '15px' }}>
                <Link href={`/blog/posts/${post.slug}`}>
                  <span className="bg-teal" style={{ 
                    padding: '8px 12px', 
                    fontSize: '14px',
                    display: 'inline-block'
                  }}>
                    Read Part {index + 1} →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
