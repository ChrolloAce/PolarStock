'use client';

import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface BlogHeaderProps {
  title: string;
  description: string;
  date?: string;
  modified?: string;
  image?: string;
  keywords?: string[];
  authorName?: string;
  authorUrl?: string;
}

export function BlogHeader({
  title,
  description,
  date,
  modified,
  image = '/og-image.png',
  keywords = [],
  authorName = 'PolarStock',
  authorUrl = 'https://polarstock.vercel.app',
}: BlogHeaderProps) {
  const pathname = usePathname();
  const currentUrl = `https://polarstock.vercel.app${pathname}`;
  const publishDate = date || new Date().toISOString();
  const modifiedDate = modified || publishDate;
  
  // Structured data for SEO (JSON-LD)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: `https://polarstock.vercel.app${image}`,
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PolarStock',
      logo: {
        '@type': 'ImageObject',
        url: 'https://polarstock.vercel.app/icon.png',
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    keywords: keywords.join(', '),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
    </>
  );
} 