'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, CalendarDays, ChevronLeft, Share2, BookmarkPlus, ThumbsUp } from 'lucide-react';

// Sample blog posts data - in a real app, this would come from a database or CMS
const blogPosts = {
  'stock-image-tips': {
    title: 'Top 10 Tips for Choosing the Perfect Stock Images',
    description: 'Learn how to select stock images that enhance your brand and engage your audience effectively.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: '/blog/stock-image-tips.jpg',
    tags: ['stock images', 'design tips', 'branding'],
    author: {
      name: 'Sarah Johnson',
      role: 'Design Specialist',
      avatar: '/blog/authors/sarah.jpg',
    },
    content: `
      <h2>Introduction to Stock Image Selection</h2>
      <p>Selecting the right stock images for your website, marketing materials, or social media can make a significant difference in how your brand is perceived. The right images can enhance your message, evoke emotions, and engage your audience, while poor choices can distract from your content or even damage your brand's credibility.</p>
      
      <p>In this guide, we'll explore ten essential tips for choosing stock images that will elevate your visual content and help you achieve your communication goals.</p>
      
      <h2>1. Align Images with Your Brand Identity</h2>
      <p>Your brand has a unique personality, values, and aesthetic. Every image you select should reinforce these elements. Consider your brand's color palette, tone, and overall vibe when choosing stock images.</p>
      
      <p>For example, if your brand is modern and minimalist, look for clean, simple images with plenty of negative space. If your brand is warm and approachable, images with soft lighting and friendly faces might be more appropriate.</p>

      <h2>2. Prioritize Authenticity</h2>
      <p>Today's audiences are increasingly savvy and can easily spot inauthentic, overly posed stock photography. Look for images that feel natural and genuine rather than staged or artificial.</p>
      
      <p>Images showing real people in realistic situations will resonate more with your audience than perfect, idealized scenarios. The goal is to select images that your audience can relate to and connect with emotionally.</p>

      <h2>3. Consider Cultural Context and Diversity</h2>
      <p>Ensure your selected images are culturally sensitive and represent diverse groups of people. This inclusivity not only reflects the reality of our diverse world but also helps more of your audience feel represented and included.</p>
      
      <p>Be mindful of cultural stereotypes and aim to show diverse ethnicities, ages, body types, abilities, and gender expressions in authentic ways.</p>

      <h2>4. Match the Image to Your Message</h2>
      <p>Every image should serve a purpose and enhance your specific message. Before selecting an image, ask yourself what point you're trying to make and what emotional response you want to evoke.</p>
      
      <p>For example, if you're promoting a relaxing spa retreat, serene nature images or calm, peaceful settings would align with your message better than busy, high-energy scenes.</p>

      <h2>5. Check Technical Quality</h2>
      <p>Always verify that stock images have sufficient resolution for your intended use. Images that look fine on a small thumbnail might appear pixelated or blurry when enlarged.</p>
      
      <p>Pay attention to focus, lighting, composition, and color balance. Even the most relevant image will undermine your professionalism if it's technically poor quality.</p>

      <h2>6. Avoid Overused Clichés</h2>
      <p>Some stock images have been used so frequently that they've become visual clichés. Handshakes in business contexts, women laughing with salad, or the classic "team looking at computer" shots can make your content feel generic and forgettable.</p>
      
      <p>Look for fresh, unexpected visuals that will stand out and make your content more memorable and distinctive.</p>

      <h2>7. Ensure Consistency Across Your Materials</h2>
      <p>Maintain visual consistency across all your materials by selecting images with similar styles, color treatments, and compositions. This consistency helps strengthen your brand identity and creates a cohesive user experience.</p>
      
      <p>Consider creating a style guide for image selection that outlines your preferred visual direction and helps maintain consistency even when different team members are selecting images.</p>

      <h2>8. Pay Attention to Licensing Terms</h2>
      <p>Always check the licensing terms for any stock image you plan to use. Different licenses allow for different types of usage, and using an image improperly can lead to legal issues and fines.</p>
      
      <p>Be particularly careful with images that include recognizable people, branded products, or private property, as these often have more restrictions on their use.</p>

      <h2>9. Test Images with Your Target Audience</h2>
      <p>When possible, test how your target audience responds to different images. This can be as simple as showing options to a few representative customers or as sophisticated as running A/B tests on your website or email campaigns.</p>
      
      <p>Pay attention to which images generate more engagement, clicks, or conversions, and use these insights to guide future image selections.</p>

      <h2>10. Consider Customization Options</h2>
      <p>Many stock images can be customized to better fit your needs. Simple adjustments like cropping, color overlays, or adding text can transform a good stock image into a perfect fit for your specific application.</p>
      
      <p>However, be sure to check that the license allows for modifications before altering any stock image.</p>

      <h2>Conclusion</h2>
      <p>Selecting the right stock images is both an art and a science. By following these ten tips, you'll be well-equipped to choose images that enhance your brand, engage your audience, and effectively communicate your message.</p>
      
      <p>Remember that even with stock photography, the goal is to create an authentic, consistent visual experience that builds trust with your audience and strengthens your brand identity.</p>
    `,
    relatedPosts: ['optimize-website-images', 'best-practices-for-website-images', 'seo-image-optimization']
  },
  'optimize-website-images': {
    title: 'How to Optimize Images for Better Website Performance',
    description: 'Discover techniques to optimize your website images for faster loading times without sacrificing quality.',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: '/blog/optimize-website-images.jpg',
    tags: ['image optimization', 'web performance', 'speed'],
    author: {
      name: 'Michael Chen',
      role: 'Web Performance Engineer',
      avatar: '/blog/authors/michael.jpg',
    },
    content: `
      <h2>Introduction to Image Optimization</h2>
      <p>Images often account for the majority of a webpage's total weight. Properly optimizing these images can dramatically improve your site's loading speed, user experience, and even search engine rankings.</p>
      
      <p>In this comprehensive guide, we'll explore practical techniques to optimize website images without compromising on visual quality.</p>
      
      <h2>Why Image Optimization Matters</h2>
      <p>Before diving into the how, let's understand why image optimization is crucial:</p>
      
      <ul>
        <li><strong>Faster page loading:</strong> Optimized images download more quickly, reducing overall page load time.</li>
        <li><strong>Better user experience:</strong> Users don't wait for slow-loading images and experience less visual shifting as pages load.</li>
        <li><strong>Lower bounce rates:</strong> Faster sites keep users engaged and reduce the likelihood of them leaving due to frustration.</li>
        <li><strong>Improved SEO:</strong> Page speed is a ranking factor for search engines, and faster sites tend to rank higher.</li>
        <li><strong>Reduced bandwidth usage:</strong> Smaller image files use less bandwidth, which is especially important for mobile users with data limits.</li>
      </ul>
      
      <h2>Choose the Right File Format</h2>
      <p>Different image formats serve different purposes, and selecting the appropriate one is your first step in optimization:</p>
      
      <ul>
        <li><strong>JPEG</strong> - Best for photographs and images with many colors and gradients. Offers good compression with minimal quality loss.</li>
        <li><strong>PNG</strong> - Ideal for images requiring transparency or with text and sharp lines. PNG-8 for simple graphics with few colors, PNG-24 for more complex images.</li>
        <li><strong>WebP</strong> - A modern format offering superior compression for both lossy and lossless images, typically 25-35% smaller than JPEG or PNG. Growing browser support makes this an excellent choice.</li>
        <li><strong>SVG</strong> - Perfect for logos, icons, and simple illustrations. As a vector format, it scales perfectly to any size without quality loss.</li>
        <li><strong>AVIF</strong> - The newest format with exceptional compression and quality, though browser support is still growing.</li>
      </ul>
      
      <p>For maximum compatibility, consider providing images in multiple formats using the HTML picture element, allowing browsers to choose the best option they support.</p>
      
      <h2>Compress Images Effectively</h2>
      <p>Compression reduces file size while maintaining acceptable visual quality. There are two approaches:</p>
      
      <ul>
        <li><strong>Lossy compression</strong> - Permanently removes some image data, resulting in smaller files but some quality reduction. Great for web photographs where slight quality loss isn't noticeable.</li>
        <li><strong>Lossless compression</strong> - Reduces file size without losing any image quality, but typically achieves less dramatic size reductions.</li>
      </ul>
      
      <p>Tools like ImageOptim, TinyPNG, or Squoosh can help you find the right balance between quality and file size.</p>
      
      <h2>Resize Images Appropriately</h2>
      <p>Never rely on CSS or HTML to resize images on your website. If you display a 1000×1000 pixel image in a 400×400 pixel container, browsers still download the full-sized image, wasting bandwidth.</p>
      
      <p>Instead, resize images to the largest size they'll be displayed at. For responsive designs, consider creating multiple versions of each image at different breakpoints using the srcset attribute.</p>
      
      <h2>Implement Lazy Loading</h2>
      <p>Lazy loading defers the loading of off-screen images until users scroll near them. This technique:</p>
      
      <ul>
        <li>Reduces initial page load time</li>
        <li>Saves bandwidth for images users might never see</li>
        <li>Improves perceived performance</li>
      </ul>
      
      <p>Modern browsers support native lazy loading with the simple addition of loading="lazy" to image tags. For broader compatibility, various JavaScript libraries can also implement this functionality.</p>
      
      <h2>Use Modern Delivery Techniques</h2>
      <p>Beyond basic optimization, consider these advanced delivery methods:</p>
      
      <ul>
        <li><strong>Content Delivery Networks (CDNs)</strong> - Distribute images across global servers to deliver them from locations closer to your users.</li>
        <li><strong>Image CDNs</strong> - Specialized services like Cloudinary or Imgix that automatically optimize, resize, and deliver images in the best format for each user.</li>
        <li><strong>Responsive Images</strong> - Using srcset and sizes attributes to deliver different sized images based on the user's device.</li>
        <li><strong>Next-gen Image Components</strong> - Frameworks like Next.js offer image components that automatically handle optimization and responsive delivery.</li>
      </ul>
      
      <h2>Optimize Thumbnails and Previews</h2>
      <p>For pages with many thumbnails or preview images:</p>
      
      <ul>
        <li>Heavily compress thumbnails since quality is less noticeable at smaller sizes</li>
        <li>Consider using CSS techniques like blur-up or LQIP (Low Quality Image Placeholders) to show low-resolution versions while full images load</li>
        <li>For image galleries, only load high-resolution versions when images are viewed at full size</li>
      </ul>
      
      <h2>Don't Forget About Accessibility</h2>
      <p>Image optimization isn't just about file size—it's also about ensuring images are accessible to all users:</p>
      
      <ul>
        <li>Always include descriptive alt text for screen readers</li>
        <li>Ensure sufficient color contrast in informational images</li>
        <li>Avoid using text within images when possible</li>
      </ul>
      
      <h2>Measure and Monitor Performance</h2>
      <p>Regular performance testing helps ensure your optimization efforts are working:</p>
      
      <ul>
        <li>Use tools like Google Lighthouse, WebPageTest, or GTmetrix to analyze your site's image performance</li>
        <li>Monitor metrics like Largest Contentful Paint (LCP) and First Contentful Paint (FCP)</li>
        <li>Set up alerts for when image sizes exceed thresholds</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Image optimization is not a one-time task but an ongoing process. By implementing these techniques, you can significantly improve your website's performance while maintaining visual quality.</p>
      
      <p>Remember, even small improvements in image optimization can lead to measurable gains in user experience, conversion rates, and search engine rankings. Your users—and your business metrics—will thank you for the faster, more efficient experience.</p>
    `,
    relatedPosts: ['stock-image-tips', 'best-practices-for-website-images', 'seo-image-optimization']
  },
  // Additional blog posts would be defined here...
};

// Type for our blog post data structure
type BlogPost = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  relatedPosts: string[];
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Get the blog post data
  const post = blogPosts[slug as keyof typeof blogPosts] as BlogPost | undefined;
  
  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const relatedPostsData = post.relatedPosts
    .map(relatedSlug => {
      const relatedPost = blogPosts[relatedSlug as keyof typeof blogPosts];
      return relatedPost ? { slug: relatedSlug, ...relatedPost } : null;
    })
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <article className="container mx-auto px-4">
          {/* Back to blog button */}
          <div className="mb-6">
            <Link href="/blog">
              <Button variant="ghost" className="group">
                <ChevronLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </Link>
          </div>
          
          {/* Blog header */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-t border-b border-gray-200">
              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  {/* This would be a real image in production */}
                  <div className="w-full h-full bg-primary-200"></div>
                </div>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>
              
              {/* Post metadata */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDays size={16} className="mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="max-w-4xl mx-auto mb-10 aspect-video rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            {/* This would be a real image in production */}
          </div>
          
          {/* Article content with table of contents sidebar on larger screens */}
          <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-4 lg:gap-10">
            {/* Table of contents - visible on lg+ screens */}
            <aside className="hidden lg:block col-span-1 self-start sticky top-20">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Table of Contents</h4>
                <nav className="space-y-2 text-sm">
                  <a href="#introduction" className="block text-gray-600 hover:text-primary-600 transition-colors">Introduction</a>
                  <a href="#section-1" className="block text-gray-600 hover:text-primary-600 transition-colors">Section 1</a>
                  <a href="#section-2" className="block text-gray-600 hover:text-primary-600 transition-colors">Section 2</a>
                  <a href="#section-3" className="block text-gray-600 hover:text-primary-600 transition-colors">Section 3</a>
                  <a href="#conclusion" className="block text-gray-600 hover:text-primary-600 transition-colors">Conclusion</a>
                </nav>
                
                {/* Social sharing */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-4">Share</h4>
                  <div className="flex space-x-3">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 hover:bg-blue-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Save and like buttons */}
                <div className="mt-8 space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save for later
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like this article
                  </Button>
                </div>
              </div>
            </aside>
            
            {/* Main content */}
            <div className="col-span-3 prose prose-blue prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
          
          {/* Author bio */}
          <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {/* This would be a real image in production */}
                <div className="w-full h-full bg-primary-200"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{post.author.name}</h3>
                <p className="text-gray-600 mb-4">{post.author.role}</p>
                <p className="text-gray-600">
                  Professional with extensive experience in digital marketing and visual content strategy. 
                  Specializes in helping businesses leverage high-quality imagery to enhance their brand presence 
                  and connect with their target audience.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors">Twitter</a>
                  <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors">LinkedIn</a>
                  <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors">Website</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related posts */}
          {relatedPostsData.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPostsData.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="relative aspect-video">
                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        {/* This would be a real image in production */}
                      </div>
                      <div className="p-6 flex flex-col">
                        <h4 className="font-bold mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {relatedPost.description}
                        </p>
                        <div className="mt-auto flex items-center text-xs text-gray-500">
                          <div className="flex items-center mr-4">
                            <CalendarDays size={14} className="mr-1" />
                            {relatedPost.date}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {relatedPost.readTime}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Newsletter signup */}
          <div className="max-w-4xl mx-auto mt-16 p-8 bg-primary-50 rounded-xl border border-primary-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Enjoyed this article?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for more insights on stock photography and image optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="gradient" shimmer>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
} 