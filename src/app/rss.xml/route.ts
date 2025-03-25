import { NextResponse } from 'next/server';

// Sample blog posts data for the RSS feed
const blogPosts = [
  {
    slug: 'stock-image-tips',
    title: 'Top 10 Tips for Choosing the Perfect Stock Images',
    description: 'Learn how to select stock images that enhance your brand and engage your audience effectively.',
    date: '2024-03-15T10:00:00.000Z',
  },
  {
    slug: 'optimize-website-images',
    title: 'How to Optimize Images for Better Website Performance',
    description: 'Discover techniques to optimize your website images for faster loading times without sacrificing quality.',
    date: '2024-03-10T10:00:00.000Z',
  },
  {
    slug: 'best-practices-for-website-images',
    title: 'Best Practices for Using Images on Your Website',
    description: 'Follow these guidelines to effectively incorporate images into your website design for maximum impact.',
    date: '2024-03-05T10:00:00.000Z',
  },
  {
    slug: 'ai-and-stock-photography',
    title: 'How AI is Revolutionizing Stock Photography',
    description: 'Explore how artificial intelligence is changing the stock photography landscape and what it means for designers.',
    date: '2024-02-28T10:00:00.000Z',
  },
  {
    slug: 'seo-image-optimization',
    title: 'SEO Image Optimization: The Complete Guide',
    description: 'Learn how to optimize your images for search engines and improve your website visibility.',
    date: '2024-02-20T10:00:00.000Z',
  },
];

export async function GET() {
  const baseUrl = 'https://polarstock.vercel.app';

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PolarStock Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights, guides, and best practices for stock photography and image optimization</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${blogPosts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
} 