export default function ProjectsPage() {
  return (
    <div>
      {/* Projects Section */}
      <div className="section">
        <h2 className="bg-purple">My Projects</h2>
        <div>
          <p>Here are some of the projects I've been working on:</p>
        </div>
      </div>

      {/* Midori Project Card */}
      <div className="section">
        <h3 className="bg-teal">Midori(ミドリ) Programming Language</h3>
        <div>
          <p>
            A statically-typed programming language featuring algebraic data types,
            pattern matching, typeclasses, and a module system. Compiles to bytecode for the
            Midori Virtual Machine with garbage-collected memory management.
          </p>
          <p>
            <strong>Key Features:</strong>
          </p>
          <ul style={{
            listStyle: 'none',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>✓ Static Type System with Type Inference</li>
            <li>✓ Pattern Matching & Algebraic Data Types</li>
            <li>✓ Typeclasses</li>
            <li>✓ Module System & Closures</li>
            <li>✓ Pipe Operator & Functional Composition</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            <a href="/projects/midori">Learn More →</a>
            {' | '}
            <a href="https://github.com/ZhongLienong/Midori" target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </p>
        </div>
      </div>

      {/* More Projects Coming Soon */}
      <div className="section">
        <h3 className="bg-indigo">More Projects Coming Soon...</h3>
        <div>
          <p className="blink">Stay tuned for updates!</p>
        </div>
      </div>
    </div>
  );
}
