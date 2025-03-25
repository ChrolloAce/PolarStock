'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarDays, ArrowRight, Search } from 'lucide-react';

// Blog post metadata
const blogPosts = [
  {
    slug: 'stock-image-tips',
    title: 'Top 10 Tips for Choosing the Perfect Stock Images',
    description: 'Learn how to select stock images that enhance your brand and engage your audience effectively.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: '/blog/stock-image-tips.jpg',
    tags: ['stock images', 'design tips', 'branding'],
  },
  {
    slug: 'optimize-website-images',
    title: 'How to Optimize Images for Better Website Performance',
    description: 'Discover techniques to optimize your website images for faster loading times without sacrificing quality.',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: '/blog/optimize-website-images.jpg',
    tags: ['image optimization', 'web performance', 'speed'],
  },
  {
    slug: 'best-practices-for-website-images',
    title: 'Best Practices for Using Images on Your Website',
    description: 'Follow these guidelines to effectively incorporate images into your website design for maximum impact.',
    date: 'March 5, 2024',
    readTime: '6 min read',
    image: '/blog/best-practices.jpg',
    tags: ['web design', 'UX', 'image placement'],
  },
  {
    slug: 'ai-and-stock-photography',
    title: 'How AI is Revolutionizing Stock Photography',
    description: 'Explore how artificial intelligence is changing the stock photography landscape and what it means for designers.',
    date: 'February 28, 2024',
    readTime: '8 min read',
    image: '/blog/ai-photography.jpg',
    tags: ['AI', 'technology', 'future trends'],
  },
  {
    slug: 'seo-image-optimization',
    title: 'SEO Image Optimization: The Complete Guide',
    description: 'Learn how to optimize your images for search engines and improve your website visibility.',
    date: 'February 20, 2024',
    readTime: '10 min read',
    image: '/blog/seo-optimization.jpg',
    tags: ['SEO', 'marketing', 'visibility'],
  },
];

export const metadata = {
  title: 'Blog | PolarStock - Stock Image Insights',
  description: 'Explore our latest articles on stock photography, image optimization, and design best practices.',
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
              PolarStock Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights, guides, and best practices for stock photography and image optimization
            </p>
            
            {/* Search bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="px-4 py-3 pl-12 rounded-full bg-white border border-gray-200 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured article */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-video md:aspect-auto">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    {/* This would be a real image in production */}
                    <div className="absolute bottom-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <CalendarDays size={14} className="mr-1" />
                        {blogPosts[0].date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {blogPosts[0].readTime}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {blogPosts[0].description}
                    </p>
                    <div className="mt-auto">
                      <Button variant="outline" className="group">
                        Read Article
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
          
          {/* Blog post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative aspect-video">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    {/* This would be a real image in production */}
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <div className="flex items-center mr-4">
                        <CalendarDays size={14} className="mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="hover:text-primary-600 transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Newsletter signup */}
          <div className="mt-20 bg-primary-50 p-8 rounded-xl border border-primary-100">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-6">
                Get the latest articles, resources, and tips about stock photography and image optimization.
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 