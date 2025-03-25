'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b bg-white/95 backdrop-blur shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/polarstocked.png"
                alt="PolarStock Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="font-bold text-xl">PolarStock</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/#features" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Blog
          </Link>
          <Link href="/#faq" className="text-sm font-medium hover:text-primary-600 transition-colors">
            FAQ
          </Link>
        </motion.nav>

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="hidden md:flex" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/app">
            <Button variant="gradient" icon={<Sparkles className="h-4 w-4" />} shimmer>
              Get Started
            </Button>
          </Link>
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden border-t py-4 px-4 bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/#features" 
              className="py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className="py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/#faq" 
              className="py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-md hover:bg-primary-50 transition-colors flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="h-5 w-5" />
              GitHub
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
} 