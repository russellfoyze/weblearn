import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'NextGen Full-Stack Mastery: Zero to Expert',
  description:
    'An interactive, animated learning platform taking developers from basic HTML to deploying secure, production-grade Next.js applications on Vercel.',
  keywords: [
    'Next.js',
    'React',
    'Full-Stack',
    'Tailwind CSS',
    'Framer Motion',
    'TypeScript',
    'Vercel Deployment',
    'Web Development Roadmap',
  ],
  authors: [{ name: 'NextGen Mastery Team' }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
  other: {
    'robots': 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate, noai, noimageai',
    'googlebot': 'noindex, nofollow, noarchive, nosnippet, max-image-preview:none, noai, noimageai',
    'ai-content-declaration': 'no-scraping, no-training, no-ai-ingestion',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noai, noimageai',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0B0F19] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
