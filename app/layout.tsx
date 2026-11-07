import type { Metadata } from 'next';
import React from 'react';
import SiteShell from '@/components/SiteShell';
import { themeBootScript } from '@/lib/themeStore';
import './globals.css';

export const metadata: Metadata = {
  title: 'API Docs for phpMyFAQ',
  description: 'phpMyFAQ API documentation',
  applicationName: 'phpMyFAQ API',
  keywords: ['phpMyFAQ', 'API', 'documentation', 'FAQ', 'REST'],
  authors: [{ name: 'phpMyFAQ Team' }],
  creator: 'phpMyFAQ Team',
  metadataBase: new URL('https://api-docs.phpmyfaq.de'),
  openGraph: {
    title: 'API Docs for phpMyFAQ',
    description: 'phpMyFAQ API documentation',
    siteName: 'phpMyFAQ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
