import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "API Docs for phpMyFAQ",
  description: "phpMyFAQ API documentation",
  applicationName: "phpMyFAQ API",
  keywords: ["phpMyFAQ", "API", "documentation", "FAQ", "REST"],
  authors: [{ name: "phpMyFAQ Team" }],
  creator: "phpMyFAQ Team",
  metadataBase: new URL('https://api-docs.phpmyfaq.de'),
  openGraph: {
    title: "API Docs for phpMyFAQ",
    description: "phpMyFAQ API documentation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
