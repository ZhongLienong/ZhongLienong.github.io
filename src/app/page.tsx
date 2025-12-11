export default function Home() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="section">
        <h2 className="bg-indigo">Welcome to My Website! <span className="icon">(^_^)</span></h2>
        <div>
          <p>Hello and welcome to my personal website!</p>
          <p>I use this site to record my life and post whatever thoughts happen to pass through my brain. None of it is official, reliable, or endorsed by anyone (including me). :)</p>
        </div>
      </div>

      {/* Life Updates Section */}
      <div className="section">
        <h2 className="bg-purple">Life Updates</h2>
        <div>
          <div className="blink" style={{ textAlign: 'left' }}>
            <ul style={{
              listStyle: 'none',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>Apprendre le français</li>
              <li style={{ marginBottom: '8px' }}>Working on a UE5 PvP Game at TiMi Montreal Studio</li>
              <li style={{ marginBottom: '8px' }}>Updating my personal website</li>
              <li style={{ marginBottom: '8px' }}>Getting destroyed by cheaters in Rainbow Six Siege</li>
              <li style={{ marginBottom: '8px' }}>Learning Boogie Woogie Piano</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
