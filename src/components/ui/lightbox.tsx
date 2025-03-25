'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ImageResult } from '@/types';
import { Button } from './button';
import Image from 'next/image';

interface LightboxProps {
  image: ImageResult;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (image: ImageResult) => void;
}

export function Lightbox({ image, isOpen, onClose, onDownload }: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative overflow-hidden">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600"></div>
                </div>
              )}
              <Image
                src={image.src.large2x || image.src.large || image.src.original}
                alt={image.alt || "Stock image"}
                fill
                className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
              />
            </div>
            
            <div className="p-5 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{image.alt || "Stock Image"}</h3>
                  <p className="text-sm text-gray-500">
                    Photo by{" "}
                    <a
                      href={image.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-600 hover:underline inline-flex items-center"
                    >
                      {image.photographer}
                    </a>
                  </p>
                </div>
                <div className="flex gap-2">
                  {onDownload && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownload(image)}
                      className="flex items-center gap-1"
                    >
                      Download
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 