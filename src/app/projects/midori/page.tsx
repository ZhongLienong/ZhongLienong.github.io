export default function MidoriPage() {
  return (
    <div className="midori-page">
      <style jsx>{`
        .midori-page {
          font-family: "Courier New", monospace;
          background-color: #000000;
          color: #00FF00;
          padding: 0;
          margin: 0;
        }

        .midori-header {
          text-align: center;
          border: 3px solid #00FF00;
          padding: 20px;
          margin-bottom: 20px;
          background-color: #000000;
        }

        .midori-title {
          font-size: 48px;
          color: #00FF00;
          text-shadow: 2px 2px #000000;
          margin: 0;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .midori-subtitle {
          font-size: 20px;
          color: #00FF00;
          margin-top: 15px;
          font-weight: bold;
        }

        .midori-tagline {
          font-size: 18px;
          color: #00FF00;
          margin-top: 20px;
          line-height: 1.6;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          padding: 10px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .feature-card {
          background: #000000;
          border: 3px solid #00FF00;
          padding: 15px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: #000080;
        }

        .feature-title {
          font-size: 20px;
          color: #FFFFFF;
          margin-bottom: 12px;
          font-weight: bold;
          text-decoration: underline;
        }

        .feature-desc {
          color: #00FF00;
          line-height: 1.4;
          font-size: 16px;
        }

        .section-header {
          font-size: 28px;
          color: #FFFFFF;
          background-color: #000080;
          border: 3px solid #00FF00;
          padding: 12px 20px;
          margin: 20px 0;
          text-align: center;
          font-weight: bold;
          text-shadow: 1px 1px #000000;
        }

        .code-example {
          background: #000000;
          border: 2px solid #00FF00;
          padding: 20px;
          margin: 15px 0;
          overflow-x: auto;
        }

        .code-example pre {
          margin: 0;
          color: #00FF00;
          font-size: 15px;
          line-height: 1.6;
          white-space: pre;
          border: none;
          padding: 0;
        }

        .code-label {
          color: #FFFF00;
          font-size: 14px;
          margin-bottom: 10px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }

        @media (max-width: 900px) {
          .two-column {
            grid-template-columns: 1fr;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .highlight-box {
          background: #000000;
          border: 3px solid #00FF00;
          padding: 15px;
          margin: 15px 0;
        }

        .highlight-box strong {
          color: #FFFF00;
        }

        .highlight-box p {
          color: #00FF00;
          margin: 5px 0;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0;
          justify-content: center;
        }

        .tech-badge {
          background: #000080;
          color: #FFFFFF;
          padding: 8px 16px;
          border: 2px solid #00FF00;
          font-size: 14px;
          font-weight: bold;
        }

        .download-section {
          text-align: center;
          margin: 20px 0;
          padding: 20px;
          background: #000000;
          border: 3px solid #00FF00;
        }

        .download-button {
          display: inline-block;
          background: #000080;
          color: #FFFFFF;
          padding: 10px 30px;
          border: 2px outset #00FF00;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s ease;
          margin: 5px;
          cursor: pointer;
        }

        .download-button:hover {
          background: #0000FF;
        }

        .download-button:active {
          border-style: inset;
        }

        .operators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin: 20px 0;
        }

        .operator-category {
          background: #000000;
          border: 2px solid #00FF00;
          padding: 10px;
        }

        .operator-category h4 {
          color: #FFFF00;
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: bold;
        }

        .operator-category code {
          color: #00FF00;
          background: #000000;
          padding: 2px 6px;
          font-size: 13px;
        }

        .operator-category p {
          color: #00FF00;
          margin: 0;
        }
      `}</style>

      <div className="midori-header">
        <h1 className="midori-title">Midori(ミドリ)</h1>
        <p className="midori-subtitle">A Programming Language</p>
        <p className="midori-tagline">
          Statically-typed programming language featuring algebraic data types, pattern matching,
          typeclasses, and a powerful module system. Compiles to bytecode for the Midori Virtual Machine
          with garbage-collected memory management.
        </p>
      </div>

      <div className="tech-stack">
        <span className="tech-badge">Static Typing</span>
        <span className="tech-badge">Functional</span>
        <span className="tech-badge">Pattern Matching</span>
        <span className="tech-badge">Typeclasses</span>
        <span className="tech-badge">Bytecode VM</span>
        <span className="tech-badge">Garbage Collection</span>
      </div>

      <h2 className="section-header">Key Features</h2>

      <div className="features-grid">
        <div className="feature-card">
          <h3 className="feature-title">Static Type System</h3>
          <p className="feature-desc">
            Strong static typing with type inference and generics. Catch errors at compile time
            while maintaining clean, concise code.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Pattern Matching</h3>
          <p className="feature-desc">
            Exhaustive pattern matching on algebraic data types with compiler-enforced coverage,
            ensuring all cases are handled.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Algebraic Data Types</h3>
          <p className="feature-desc">
            Express complex data structures with structs (product types) and unions (sum types)
            for safer, more expressive code.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Typeclasses</h3>
          <p className="feature-desc">
            Constrained generics for powerful polymorphism. Define behavior
            contracts and implement them for any type.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Module System</h3>
          <p className="feature-desc">
            Explicit imports and exports with privacy enforcement. Build large-scale applications
            with clear module boundaries.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Expression-Oriented</h3>
          <p className="feature-desc">
            Write more functional, composable code with natural control flow.
          </p>
        </div>
      </div>

      <h2 className="section-header">Quick Start</h2>

      <div className="code-example">
        <div className="code-label">Hello World</div>
        <pre>{`import { "../MidoriPrelude/IO.mdr" }

IO::PrintLine("Hello, Midori!");`}</pre>
      </div>

      <div className="two-column">
        <div className="code-example">
          <div className="code-label">Functions</div>
          <pre>{`// Simple function
defun square(x: Int) : Int => {
    return x * x;
};

// Generic function
defun identity<T>(value: T) : T => value;

// Higher-order function
defun apply<T, R>(
    fn: fn(T) -> R,
    value: T
) : R => {
    return fn(value);
};`}</pre>
        </div>

        <div className="code-example">
          <div className="code-label">Algebraic Data Types</div>
          <pre>{`// Product types (structs)
struct Point {
    x: Float,
    y: Float,
};

// Sum types (unions)
union Option<T> = Some(T) | None;

union Result<T, E> = Ok(T) | Err(E);

def origin = new Point(0.0, 0.0);
def maybe = new Option::Some(42);`}</pre>
        </div>
      </div>

      <h2 className="section-header">Pattern Matching</h2>

      <div className="code-example">
        <div className="code-label">Match Expression Example</div>
        <pre>{`union Result<T, E> = Ok(T) | Err(E);

defun handle_result<T>(result: Result<T, Text>) : Text => {
    return match result with
        case Result::Ok(value) => "Success: " ++ (value as Text)
        case Result::Err(msg) => "Error: " ++ msg
        default => "Unknown"
    ;
};`}</pre>
      </div>

      <h2 className="section-header">Typeclasses</h2>

      <div className="highlight-box">
        <strong>Typeclasses</strong> allow you to define behavior
        that can be implemented for multiple types while maintaining type safety.
      </div>

      <div className="code-example">
        <div className="code-label">Typeclass Definition and Implementation</div>
        <pre>{`// Define a typeclass
typeclass Show<T> {
    show: fn(value: T) -> Text;
};

// Implement for Int
instance Show<Int> {
    defun show(value: Int) : Text => {
        return value as Text;
    };
};

// Use with constraints
defun display<T>(value: T) : Text where T: Show<T> => {
    return show(value);
};

def message = display(42);  // "42"`}</pre>
      </div>

      <h2 className="section-header">Advanced Features</h2>

      <div className="two-column">
        <div className="code-example">
          <div className="code-label">Pipe Operator</div>
          <pre>{`defun double(x: Int) : Int => x * 2;
defun add_ten(x: Int) : Int => x + 10;

def result = 5
    |> double
    |> add_ten
    |> double;  // 40`}</pre>
        </div>

        <div className="code-example">
          <div className="code-label">Closures</div>
          <pre>{`defun make_counter() : fn() -> Int => {
    def count = 0;
    return fn() : Int => {
        count = count + 1;
        return count;
    };
};

def counter = make_counter();
def first = counter();   // 1
def second = counter();  // 2`}</pre>
        </div>
      </div>

      <h2 className="section-header">Language Operators</h2>

      <div className="operators-grid">
        <div className="operator-category">
          <h4>Arithmetic</h4>
          <p><code>+ - * / %</code></p>
        </div>
        <div className="operator-category">
          <h4>Comparison</h4>
          <p><code>== != &lt; &gt; &lt;= &gt;=</code></p>
        </div>
        <div className="operator-category">
          <h4>Logical</h4>
          <p><code>&& || !</code></p>
        </div>
        <div className="operator-category">
          <h4>Bitwise</h4>
          <p><code>& | ^ &lt;~ ~&gt;</code></p>
        </div>
        <div className="operator-category">
          <h4>String</h4>
          <p><code>++ (concatenation)</code></p>
        </div>
        <div className="operator-category">
          <h4>Functional</h4>
          <p><code>|&gt; (pipe)</code></p>
        </div>
      </div>

      <h2 className="section-header">Example: Recursive Data Structures</h2>

      <div className="code-example">
        <div className="code-label">Binary Tree Implementation</div>
        <pre>{`union Tree<T> = Leaf(T) | Node(Tree<T>, Tree<T>);

defun height<T>(tree: Tree<T>) : Int => {
    return match tree with
        case Tree::Leaf(value) => 1
        case Tree::Node(left, right) => {
            def left_height = height(left);
            def right_height = height(right);
            return 1 + (if left_height > right_height
                        then left_height
                        else right_height);
        }
        default => 0
    ;
};`}</pre>
      </div>

      <div className="code-example">
        <div className="code-label">Generic Linked List</div>
        <pre>{`union List<T> = Cons(T, List<T>) | Nil;

defun map<A, B>(list: List<A>, f: fn(A) -> B) : List<B> => {
    return match list with
        case List::Cons(head, tail) =>
            new List::Cons(f(head), map(tail, f))
        case List::Nil =>
            new List::Nil()
        default =>
            new List::Nil()
    ;
};`}</pre>
      </div>

      <h2 className="section-header">Type System</h2>

      <div className="highlight-box">
        <p><strong>Primitive Types:</strong> Int, Float, Bool, Text, Unit</p>
        <p><strong>Composite Types:</strong> Array&lt;T&gt;, structs, unions</p>
        <p><strong>Function Types:</strong> fn(T1, T2) -&gt; R</p>
        <p><strong>Generic Parameters:</strong> Single and multiple type parameters</p>
        <p><strong>Type Constraints:</strong> Typeclass constraints with where clause</p>
        <p><strong>Type Inference:</strong> Automatic type deduction at instantiation</p>
      </div>

      <h2 className="section-header">Standard Library</h2>

      <div className="features-grid">
        <div className="feature-card">
          <h3 className="feature-title">IO.mdr</h3>
          <p className="feature-desc">
            Input/output operations including PrintLine for console output and file I/O utilities.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Math.mdr</h3>
          <p className="feature-desc">
            Mathematical functions including trigonometry, logarithms, and common operations.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Array.mdr</h3>
          <p className="feature-desc">
            Array utilities for functional programming including map, filter, reduce, and more.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">DateTime.mdr</h3>
          <p className="feature-desc">
            Timing and date operations for working with temporal data in your applications.
          </p>
        </div>
      </div>

      <h2 className="section-header">Architecture</h2>

      <div className="highlight-box">
        <p><strong>Frontend:</strong> Lexer → Parser → Type Checker</p>
        <p><strong>Optimizer:</strong> Constant folding, tail call optimization, strength reduction</p>
        <p><strong>Backend:</strong> Bytecode generator → Linker</p>
        <p><strong>Runtime:</strong> Stack-based VM with mark-and-sweep garbage collection</p>
      </div>

      <div className="download-section">
        <h2 className="section-header" style={{marginTop: 0}}>Get Started</h2>
        <p style={{fontSize: '18px', color: '#00FF00', marginBottom: '15px'}}>
          Start building with Midori today
        </p>
        <a href="https://github.com/ZhongLienong/Midori" className="download-button" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
        <a href="https://github.com/ZhongLienong/Midori#development" className="download-button" target="_blank" rel="noopener noreferrer">
          Documentation
        </a>
      </div>
    </div>
  );
}
