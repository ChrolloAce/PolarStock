'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProjectForm } from '@/components/forms/project-form';
import { ImageGenerator } from '@/components/image-generator';
import { ProjectInfo } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function AppPage() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectSubmit = (data: ProjectInfo) => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setProjectInfo(data);
      setIsLoading(false);
    }, 800);
  };

  const handleBack = () => {
    setProjectInfo(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-primary-50">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {!projectInfo ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <Image 
                      src="/polarstocked.png"
                      alt="PolarStock Logo"
                      width={80}
                      height={80}
                      priority
                    />
                  </motion.div>
                  <motion.h1 
                    className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Speed Up Your Launch
                  </motion.h1>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Get ready-to-launch stock images tailored to your project
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <ProjectForm onSubmit={handleProjectSubmit} isLoading={isLoading} />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="generator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageGenerator projectInfo={projectInfo} onBack={handleBack} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Footer />
    </div>
  );
} 