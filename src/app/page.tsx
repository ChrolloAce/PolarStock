'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  ImageIcon,
  CheckCircle,
  FastForward,
  Download,
  Layers,
  Sparkles,
  ArrowRight,
  Camera,
  Star,
  Quote,
  Search,
  Scissors,
  Folder,
  FileText,
  Zap
} from 'lucide-react';

// Sample images for carousel
const sampleImages = [
  'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
  'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
  'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg',
  'https://images.pexels.com/photos/3194518/pexels-photo-3194518.jpeg',
  'https://images.pexels.com/photos/6612388/pexels-photo-6612388.jpeg',
  'https://images.pexels.com/photos/6615076/pexels-photo-6615076.jpeg',
];

// Additional images for second slider
const secondaryImages = [
  'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  'https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg',
  'https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg',
  'https://images.pexels.com/photos/8867444/pexels-photo-8867444.jpeg',
  'https://images.pexels.com/photos/8867236/pexels-photo-8867236.jpeg',
  'https://images.pexels.com/photos/8867472/pexels-photo-8867472.jpeg',
  'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg',
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const howItWorksRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50 py-20 md:py-32">
        <div ref={spotlightRef} className="spotlight" />
        <div className="container mx-auto px-4 text-center">
          {/* Floating Feature Pearls */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* SEO Ready Images */}
            <motion.div 
              className="absolute z-10"
              style={{ top: '2%', left: '8%' }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center bg-white p-3 pl-2 pr-4 rounded-full shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-primary-100 opacity-20 blur-sm -z-10"></div>
                <div className="bg-primary-100 p-2 rounded-full mr-2">
                  <Search className="h-4 w-4 text-primary-700" />
                </div>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap tracking-tight">SEO READY IMAGES</span>
              </div>
            </motion.div>
            
            {/* Compressed For Speed */}
            <motion.div 
              className="absolute z-10"
              style={{ top: '3%', right: '7%' }}
              animate={{ 
                y: [0, 20, 0],
                x: [0, -8, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center bg-white p-3 pl-2 pr-4 rounded-full shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-yellow-100 opacity-20 blur-sm -z-10"></div>
                <div className="bg-yellow-100 p-2 rounded-full mr-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap tracking-tight">COMPRESSED FOR SPEED</span>
              </div>
            </motion.div>
            
            {/* Crop At Your Desired Size */}
            <motion.div 
              className="absolute z-10"
              style={{ top: '18%', left: '21%' }}
              animate={{ 
                y: [0, 12, 0],
                x: [0, 15, 0],
                rotate: [0, 7, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex items-center bg-white p-3 pl-2 pr-4 rounded-full shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-blue-100 opacity-20 blur-sm -z-10"></div>
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Scissors className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap tracking-tight">CROP AT YOUR DESIRED SIZE</span>
              </div>
            </motion.div>
            
            {/* Download All */}
            <motion.div 
              className="absolute z-10"
              style={{ top: '14%', right: '27%' }}
              animate={{ 
                y: [0, -10, 0],
                x: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center bg-white p-3 pl-2 pr-4 rounded-full shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-green-100 opacity-20 blur-sm -z-10"></div>
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <Folder className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap tracking-tight">ORGANIZED DOWNLOADS</span>
              </div>
            </motion.div>
            
            {/* Alt Text */}
            <motion.div 
              className="absolute z-10"
              style={{ top: '10%', right: '10%' }}
              animate={{ 
                y: [0, 15, 0],
                x: [0, 5, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="flex items-center bg-white p-3 pl-2 pr-4 rounded-full shadow-xl relative">
                <div className="absolute inset-0 rounded-full bg-purple-100 opacity-20 blur-sm -z-10"></div>
                <div className="bg-purple-100 p-2 rounded-full mr-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap tracking-tight">ALT TEXT AUTO GENERATED</span>
              </div>
            </motion.div>
          </div>
        
          <motion.div 
            className="mx-auto max-w-3xl space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex items-center justify-center mb-4"
              variants={fadeIn}
            >
              <div className="relative w-16 h-16">
                <Image 
                  src="/polarstocked.png" 
                  alt="PolarStock Logo" 
                  width={64} 
                  height={64}
                  className="rounded-full" 
                  priority
                />
                <div className="absolute -right-2 -top-2 bg-primary-100 rounded-full p-1.5">
                  <div className="bg-primary-600 rounded-full w-5 h-5"></div>
                </div>
              </div>
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              variants={fadeIn}
            >
              Ship Faster With
              <motion.span 
                className="block text-primary-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Ready-to-Launch Stock Images
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 md:text-xl" 
              variants={fadeIn}
            >
              Optimize, compress, and edit premium stock images in seconds.
              Launch projects faster with pixel-perfect visuals, every time.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              variants={fadeIn}
            >
              <Link href="/app">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-8"
                  variant="gradient"
                  shimmer
                  icon={<Sparkles className="h-5 w-5" />}
                >
                  Get Started Free
                </Button>
              </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-8"
                  icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => scrollToSection('how-it-works')}
                >
                  Learn More
                </Button>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Dual Slider Image Carousel - Full Width */}
          <div className="mt-16 relative w-full overflow-hidden">
            {/* First slider - left to right */}
            <div className="relative h-[220px] overflow-hidden mb-6">
              {/* Left fade effect */}
              <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
              
              <div className="flex gap-4 absolute left-0 right-0 animate-scroll-right px-4">
                {sampleImages.map((img, i) => (
                  <div
                    key={`image-top-${i}`}
                    className="w-80 h-52 flex-shrink-0 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform"
                  >
                    <Image 
                      src={img} 
                      alt={`Sample image ${i+1}`} 
                      width={320} 
                      height={208}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Duplicate images for continuous scroll */}
                {sampleImages.map((img, i) => (
                  <div
                    key={`image-top-dup-${i}`}
                    className="w-80 h-52 flex-shrink-0 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform"
                  >
                    <Image 
                      src={img} 
                      alt={`Sample image ${i+1}`} 
                      width={320} 
                      height={208}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Right fade effect */}
              <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
            
            {/* Second slider - right to left */}
            <div className="relative h-[220px] overflow-hidden">
              {/* Left fade effect */}
              <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
              
              <div className="flex gap-4 absolute left-0 right-0 animate-scroll-left px-4">
                {secondaryImages.map((img, i) => (
                  <div
                    key={`image-bottom-${i}`}
                    className="w-80 h-52 flex-shrink-0 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform"
                  >
                    <Image 
                      src={img} 
                      alt={`Secondary image ${i+1}`} 
                      width={320} 
                      height={208}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Duplicate images for continuous scroll */}
                {secondaryImages.map((img, i) => (
                  <div
                    key={`image-bottom-dup-${i}`}
                    className="w-80 h-52 flex-shrink-0 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform"
                  >
                    <Image 
                      src={img} 
                      alt={`Secondary image ${i+1}`} 
                      width={320} 
                      height={208}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Right fade effect */}
              <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold mb-4 text-center">All-in-One Solution</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Find, optimize, and download perfect stock images with just a few clicks. Everything you need in one seamless workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-100 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FastForward className="text-primary-600 h-8 w-8" />
                </div>
              <h3 className="text-xl font-bold mb-3">Multi-Source Search</h3>
                <p className="text-muted-foreground">
                Access premium stock images from Pexels, Unsplash, and more - all in one place. Find the perfect image for any project.
                </p>
              </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-100 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Layers className="text-primary-600 h-8 w-8" />
                </div>
              <h3 className="text-xl font-bold mb-3">One-Click Optimization</h3>
                <p className="text-muted-foreground">
                Compress, crop, and edit your images with a single click. Our smart tools automatically optimize images for better performance.
                </p>
              </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-100 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Download className="text-primary-600 h-8 w-8" />
                </div>
              <h3 className="text-xl font-bold mb-3">Seamless Export</h3>
                <p className="text-muted-foreground">
                Download all your optimized images at once in your preferred format and resolution. Ready to use in your project immediately.
                </p>
              </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section - Simplified */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20 bg-gradient-to-br from-primary-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tell Us About Your Project</h3>
              <p className="text-muted-foreground">
                Answer a few simple questions about what you're building and what industry it's for.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Review Generated Images</h3>
              <p className="text-muted-foreground">
                We'll suggest the perfect stock images for your project. Don't like one? Just refresh it.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Download & Use</h3>
              <p className="text-muted-foreground">
                Download all your selected images in one click and start using them in your project immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Modernized */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of projects launched with PolarStock. Here's what our customers think.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Review */}
            <div className="col-span-1 lg:col-span-3 bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-4 transform transition-all hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold">TA</div>
                <div>
                  <h3 className="text-xl font-bold">Thomas Anderson</h3>
                  <p className="text-primary-600 font-medium">Agency Owner</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "Our design agency has been using PolarStock for the past 6 months, and it's significantly sped up our workflow. 
                We've cut our image search and optimization time by 70%, and the quality of visuals has improved across all our projects. 
                I estimate we're saving 5-10 hours per week, which translates directly to our bottom line."
              </p>
              <div className="mt-4 text-primary-600 font-medium">
                DigitalCraft Agency • Seattle, WA
              </div>
            </div>
            
            {/* Regular Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">SJ</div>
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Web Designer</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">
                "PolarStock has transformed my workflow. I used to spend hours searching for the right stock photos, but now I can find exactly what I need in minutes."
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">MC</div>
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-sm text-gray-600">Marketing Director</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">
                "Our marketing team relies on PolarStock daily. The ability to quickly find relevant images for our campaigns has significantly increased our productivity."
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">AR</div>
                <div>
                  <h3 className="font-bold">Alex Rivera</h3>
                  <p className="text-sm text-gray-600">Freelance Developer</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
                <Star className="h-4 w-4 fill-current text-gray-300" />
              </div>
              <p className="text-gray-700">
                &quot;As a solo developer, I don&apos;t have time to search through thousands of stock photos. PolarStock helps me find exactly what I need, fast.&quot;
              </p>
            </div>
          </div>
          
          {/* Testimonial Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <p className="text-gray-600">Customer satisfaction</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">1.2M+</div>
              <p className="text-gray-600">Images downloaded</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Average rating</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">75%</div>
              <p className="text-gray-600">Time saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">One Click. All Done.</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl mb-3 text-primary-100">Find → Optimize → Download</p>
            <p className="text-lg mb-10">
              Get professional stock images from the best sources, automatically optimize them, 
              and download them all in one seamless workflow.
            </p>
          </div>
              <Link href="/app">
                <Button 
              size="lg"
                  variant="secondary"
                  shimmer
              className="px-12 py-6 text-lg bg-white text-primary-700 hover:bg-white/90 shadow-xl"
              icon={<Sparkles className="h-5 w-5 mr-2" />}
                >
              Start Optimizing Now
                </Button>
              </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}