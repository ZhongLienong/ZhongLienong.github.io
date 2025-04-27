import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="section">
        <h2 className="bg-indigo">Welcome to My Website! <span className="icon">(^_^)</span></h2>
        <div>
          <p>Hello and welcome to my personal website! <span className="icon">:-)</span></p>
          <p>I'm a developer specializing in Unreal Engine and C++.</p>
          <p>Last updated: <span className="blink">April 13, 2025</span></p>
        </div>
      </div>

      {/* Grid Container for Main Content */}
      <div className="grid-container">
        {/* Latest Updates */}
        <div className="grid-item">
          <h2 className="bg-purple">Latest Updates</h2>
          <div>
            <div className="blink" style={{ textAlign: 'left' }}>
            <ul style={{ 
              listStyle: 'none',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>Working on a UE5 ARPG Game</li>
              <li style={{ marginBottom: '8px' }}>Updating my portfolio</li>
              <li style={{ marginBottom: '8px' }}>Learning Boogie Woogie Piano</li>
            </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid-item">
          <h2 className="bg-teal">Quick Links</h2>
          <div>
            <ul>
              <li><span className="icon">➤</span> <a href="/projects">All Projects</a> - Check out my work!</li>
              <li><span className="icon">➤</span> <a href="/blog">Blog Archive</a> - Read my thoughts</li>
              <li><span className="icon">➤</span> <a href="/gallery">Photo Gallery</a> - View my screenshots</li>
              <li><span className="icon">➤</span> <a href="/contact">Contact Me</a> - Get in touch!</li>
            </ul>
          </div>
        </div>

        {/* What's New */}
        <div className="grid-item">
          <h2 className="bg-indigo">What's New</h2>
          <div>
            <ul>
              <li><span className="icon">✧</span> <strong>April 13, 2025:</strong> Website launched! <span className="icon">✧</span></li>
              <li><span className="icon">✧</span> <strong>Coming Soon:</strong> Project showcase and blog posts <span className="icon">✧</span></li>
              <li><span className="icon">✧</span> <strong>Future Plans:</strong> More content and features! <span className="icon">✧</span></li>
            </ul>
            <hr />
            <div style={{ textAlign: 'center' }}>
              <p>Under Construction:</p>
              <div className="blink"><span className="icon">🚧</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Counter and Map */}
      <div className="section">
        <h2 className="bg-yellow">Visitor Information</h2>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p>You are visitor number:</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>000001</p>
            <p>Since April 13, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
