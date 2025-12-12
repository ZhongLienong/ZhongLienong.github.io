import type { Metadata } from "next";
import "./globals.css";
import VisitorCounter from "@/components/VisitorCounter";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossOrigin="anonymous"/>
      </head>
      <body>
        {/* Under Construction Banner */}
        <div className="construction-banner blink">
          🚧 UNDER CONSTRUCTION 🚧
        </div>

        <header>
          <div className="ascii-art">
            <pre className="desktop-only">
              <strong>{`
  ███████╗██╗  ██╗██╗   ██╗     ██╗  ██╗ █████╗ ███╗   ██╗     ██╗ ██╗ ██╗ ██████╗ ███╗   ██╗
  ╚══███╔╝██║  ██║██║   ██║     ██║  ██║██╔══██╗████╗  ██║     ██║ ██║ ██║ █║      ████╗  ██║ 
    ███╔╝ ███████║██║   ██║     ███████║███████║██╔██╗ ██║     ██║ ██║ ██║ ██████╗ ██╔██╗ ██║ 
   ███╔╝  ██╔══██║██║   ██║     ██╔══██║██╔══██║██║╚██╗██║     ██║ ██║ ██║ █║      ██║╚██╗██║   
  ███████╗██║  ██║╚██████╔╝     ██║  ██║██║  ██║██║ ╚████║       ██████    ██████╗ ██║ ╚████║   
  ╚══════╝╚═╝  ╚═╝ ╚═════╝      ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝       ╚════╝    ╚═════╝ ╚═╝  ╚═══╝   
`}</strong>
            </pre>
            <pre className="mobile-only">
              <strong>{`
  ZHU HAN WEN
  -----------`}</strong>
            </pre>
          </div>
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
          <VisitorCounter />
        </footer>
      </body>
    </html>
  );
}
