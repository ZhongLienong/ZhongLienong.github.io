import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zhu Han Wen - Personal Website",
  description: "A simple personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Hit Counter */}
        <div className="hit-counter">
          <div className="counter-display">
            Visitors: 000001
          </div>
        </div>

        {/* Under Construction Banner */}
        <div className="construction-banner blink">
          🚧 UNDER CONSTRUCTION 🚧
        </div>

        <header>
          <pre className="ascii-art">
            <strong>{`
    ____  ____  ____  ____  ____  ____  ____  ____  ____  ____  ____ 
   ||Z ||||H ||||U ||||  ||||H ||||A ||||N ||||  ||||W ||||E ||||N ||
   ||__||||__||||__||||__||||__||||__||||__||||__||||__||||__||||__||
   |/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\|
    `}</strong>
          </pre>
          <nav>
            <ul className="nav-menu">
              <li><a href="/">🏠 Home</a></li>
              <li><a href="/about">ℹ️ About</a></li>
              <li><a href="/projects">💾 Projects</a></li>
              <li><a href="/blog">📝 Blog</a></li>
              <li><a href="/gallery">🖼️ Gallery</a></li>
              <li><a href="/contact">✉️ Contact</a></li>
            </ul>
          </nav>
        </header>


        <main>
          {children}
        </main>

        <footer>
          <div className="copyright">
            © {new Date().getFullYear()} - Last updated: {new Date().toLocaleDateString()}
          </div>
        </footer>
      </body>
    </html>
  );
}