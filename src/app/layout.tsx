import "./globals.css";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Next Blog",
  description: "A minimal blog built with Next.js 15",
};

export default function RootLayout ({
  children,
} : {
  children:React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white font-sans">
        <header className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">NextBlog</h1>
          <nav className="space-x-6 text-gray-300">
            <a href="/" className="hover:text-blue-400 transition">Home</a>
            <a href="/about" className="hover:text-blue-400 transition">About</a>
            <a href="/blog" className="hover:text-blue-400 transition">Blog</a>
          </nav>
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  )
}
