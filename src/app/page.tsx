export default function Home() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="section">
        <h2 className="bg-indigo">Welcome to My Website! <span className="icon">(^_^)</span></h2>
        <div>
          <p>Hello and welcome to my personal website!</p>
          <p>I'm a developer specializing in Unreal Engine and C++.</p>
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="section">
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
    </div>
  );
}
