import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clipscut: clips, AI shorts and coloring books',
  description: 'Turn videos and ideas into clips, shorts and images that earn. Every tool for short video, in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#191c1f] antialiased selection:bg-[#2a3ffb] selection:text-white">
        {children}
      </body>
    </html>
  );
}
