import { MetadataRoute } from 'next';

// The base URL for your site
const baseUrl = 'https://polarstock.vercel.app';

// Generate sitemap entries
export default function sitemap(): MetadataRoute.Sitemap {
  // Get the current date for the lastModified field
  const currentDate = new Date();
  
  // Define your main app routes
  const routes = [
    '',
    '/app',
    '/blog',
    '/blog/stock-image-tips',
    '/blog/optimize-website-images',
    '/blog/best-practices-for-website-images',
    '/blog/ai-and-stock-photography',
    '/blog/seo-image-optimization',
  ];
  
  // Create sitemap entries
  return routes.map(route => {
    // For the blog posts, use a lower changeFrequency
    const isBlogPost = route.startsWith('/blog/');
    
    return {
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: isBlogPost ? 'monthly' : 'weekly',
      priority: isBlogPost ? 0.7 : route === '' ? 1.0 : 0.8,
    };
  });
} 