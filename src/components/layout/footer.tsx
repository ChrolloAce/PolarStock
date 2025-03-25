import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white relative">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Image 
                  src="/polarstocked.png" 
                  alt="PolarStock Logo" 
                  width={36} 
                  height={36} 
                  className="rounded-full"
                />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Polar<span className="text-primary-600">Stock</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional stock images for your websites, apps, and software projects. Easy to find, easy to use.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Product</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Pricing
              </Link>
              <Link href="/app" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Get Started
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/#" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Blog
              </Link>
              <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/#" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/#" className="text-sm text-muted-foreground hover:text-primary-600 transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
          <div className="w-full md:w-auto">
            <h3 className="font-semibold text-gray-400 uppercase tracking-wider text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ChrolloAce/PolarStock"
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            &copy; {new Date().getFullYear()} PolarStock. All rights reserved. Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> Powered by{' '}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Pexels
            </a>
          </p>
        </div>
      </div>
      
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
    </footer>
  );
} 