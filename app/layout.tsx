import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "API Docs for phpMyFAQ",
  description: "phpMyFAQ API documentation",
  applicationName: "phpMyFAQ API",
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
