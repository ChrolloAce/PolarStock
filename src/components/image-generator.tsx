import React, { useState, useEffect } from 'react';
import { ImageResult, ProjectInfo, SelectedImage, ImageType } from '@/types';
import { searchImages } from '@/services/pexels';
import { getImageTypes, formatImageType, getSearchQuery } from '@/lib/utils';
import { ImageCard } from '@/components/ui/image-card';
import { Button } from '@/components/ui/button';
import { generateZip, ImageToDownload } from '@/services/zipGenerator';
import { Download, ArrowLeft, RefreshCw, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { CompressionOptions, CompressionSettings } from './ui/compression-options';
import { IndustrySearch } from '@/components/ui/industry-search';
import { ImageEditor } from '@/components/ui/image-editor';
import { Check, X, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

// Helper function to check if two images are the same
const isSameImage = (image1: ImageResult, image2: ImageResult) => {
  return image1.id === image2.id;
};

// Simple separator component
interface SeparatorProps {
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return <div className={`h-[1px] w-full bg-gray-200 dark:bg-gray-800 ${className || ''}`} />;
};

interface ImageGeneratorProps {
  projectInfo: ProjectInfo;
  onBack: () => void;
}

export function ImageGenerator({ projectInfo, onBack }: ImageGeneratorProps) {
  const [imageResults, setImageResults] = useState<Record<string, ImageResult | null>>({});
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [usedImageIds, setUsedImageIds] = useState<Set<string>>(new Set());
  const [isCompressionDialogOpen, setIsCompressionDialogOpen] = useState(false);
  // Keep track of previous images for undo functionality
  const [imageHistory, setImageHistory] = useState<Partial<Record<ImageType, ImageResult[]>>>(() => {
    const initialHistory: Partial<Record<ImageType, ImageResult[]>> = {};
    getImageTypes(projectInfo.imageCount || 6).forEach(type => {
      initialHistory[type] = [];
    });
    return initialHistory;
  });
  // Store edited image URLs
  const [editedImages, setEditedImages] = useState<Partial<Record<ImageType, string>>>({});

  // New state for current industry/category
  const [currentIndustry, setCurrentIndustry] = useState<string>(projectInfo.description || "Business");

  // New states for locking and deleting images
  const [lockedImages, setLockedImages] = useState<Set<ImageType>>(new Set());
  const [deletedImages, setDeletedImages] = useState<Set<ImageType>>(new Set());

  // Use imageCount from projectInfo, defaulting to 6 if not provided
  const imageCount = projectInfo.imageCount || 6;
  const imageTypes = getImageTypes(imageCount);

  // Load previously used image IDs from local storage on component mount
  useEffect(() => {
    const loadUsedImageIds = () => {
      try {
        const storedIds = localStorage.getItem('polarstock_used_image_ids');
        if (storedIds) {
          // Parse stored IDs, filter out any that might be invalid, and create a new Set
          const parsedIds = JSON.parse(storedIds);
          if (Array.isArray(parsedIds)) {
            setUsedImageIds(new Set(parsedIds.filter(id => typeof id === 'string')));
          }
        }
      } catch (err) {
        console.error('Error loading used image IDs from storage:', err);
        // If there's an error, just continue with an empty set
      }
    };
    
    loadUsedImageIds();
  }, []);
  
  // Save used image IDs to local storage when they change
  useEffect(() => {
    // Only save if we have IDs to save
    if (usedImageIds.size > 0) {
      try {
        // Convert Set to Array for storage
        const idsArray = Array.from(usedImageIds);
        
        // Only keep the most recent 1000 IDs to avoid excessive storage
        const recentIds = idsArray.slice(-1000);
        
        localStorage.setItem('polarstock_used_image_ids', JSON.stringify(recentIds));
      } catch (err) {
        console.error('Error saving used image IDs to storage:', err);
      }
    }
  }, [usedImageIds]);

  const fetchInitialImages = async () => {
    setIsLoading(true);
    try {
      const images = await fetchImages(projectInfo);
      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch of images when component mounts
  useEffect(() => {
    if (projectInfo) {
      fetchInitialImages();
    }
  }, [projectInfo, fetchInitialImages]);

  const handleRefreshAllImages = async () => {
    setIsRefreshingAll(true);
    setError(null);
    
    // Store current images in history before refreshing
    const updatedHistory = { ...imageHistory };
    Object.entries(imageResults).forEach(([type, image]) => {
      if (image) {
        const imageType = type as ImageType;
        updatedHistory[imageType] = [...(updatedHistory[imageType] || []), image];
      }
    });
    setImageHistory(updatedHistory);
    
    try {
      // Create updated project info with current industry
      const updatedProjectInfo = {
        ...projectInfo,
        description: currentIndustry
      };
      
      // Use fetchInitialImages with current industry
      const types = getImageTypes(imageCount);
      const initialResults: Record<string, ImageResult | null> = {};
      const initialLoadingState: Record<string, boolean> = {};
      const usedIdsInThisRequest = new Set<string>();
  
      // Initialize states
      types.forEach(type => {
        const imageType = type as ImageType;
        
        // Skip locked images - keep their current image
        if (lockedImages.has(imageType)) {
          initialResults[imageType] = imageResults[imageType];
          initialLoadingState[imageType] = false;
          return;
        }
        
        // Skip deleted images
        if (deletedImages.has(imageType)) {
          initialResults[imageType] = null;
          initialLoadingState[imageType] = false;
          return;
        }
        
        initialResults[imageType] = null;
        initialLoadingState[imageType] = true;
      });
  
      setImageResults(initialResults);
      setIsLoading(initialLoadingState);
  
      // Use current industry as the query
      const baseQuery = getSearchQuery('other', currentIndustry, '');
      
      // Fetch images sequentially to ensure no duplicates
      for (const type of types) {
        try {
          const imageType = type as ImageType;
          
          // Skip locked images - we already set them above
          if (lockedImages.has(imageType)) {
            continue;
          }
          
          // Skip deleted images
          if (deletedImages.has(imageType)) {
            continue;
          }
          
          const response = await searchImages(baseQuery, 3);
          
          if (response.photos.length > 0) {
            let selectedImage: ImageResult | null = null;
            for (const photo of response.photos) {
              if (!usedIdsInThisRequest.has(photo.id)) {
                selectedImage = photo;
                usedIdsInThisRequest.add(photo.id);
                setUsedImageIds(prev => new Set([...prev, photo.id]));
                break;
              }
            }
            
            if (!selectedImage && response.photos.length > 0) {
              const firstImage = response.photos[0];
              selectedImage = firstImage;
              usedIdsInThisRequest.add(firstImage.id);
              setUsedImageIds(prev => new Set([...prev, firstImage.id]));
            }
            
            if (selectedImage) {
              initialResults[imageType] = selectedImage;
            }
          }
        } catch (err) {
          console.error(`Error fetching images for ${type}:`, err);
        }
      }
      
      setImageResults(initialResults);
      
      const successfulResults = Object.values(initialResults).filter(Boolean);
      if (successfulResults.length === 0) {
        setError('No images were found for your project. Please try again with different criteria.');
      } else if (successfulResults.length < types.length) {
        setError('Some images could not be loaded. You can refresh to try again.');
      } else {
        setError(null);
      }
      
    } catch (err) {
      console.error('Error refreshing all images:', err);
      setError('Failed to refresh images. Please try again.');
    } finally {
      setIsRefreshingAll(false);
      const finalLoadingState: Record<string, boolean> = {};
      imageTypes.forEach(type => {
        finalLoadingState[type] = false;
      });
      setIsLoading(finalLoadingState);
    }
  };

  const handleRefreshImage = async (imageType: ImageType) => {
    // Don't refresh if image is locked
    if (lockedImages.has(imageType)) {
      return;
    }
    
    // Store current image in history before refreshing
    if (imageResults[imageType]) {
      setImageHistory(prev => ({
        ...prev,
        [imageType]: [...(prev[imageType] || []), imageResults[imageType]!]
      }));
    }
    
    setIsLoading(prev => ({
      ...prev,
      [imageType]: true
    }));
    
    try {
      // Use the current industry instead of the original project description
      const query = getSearchQuery('other', currentIndustry, imageType);
      
      // Get the next image - our updated API handles non-repeating images internally
      const response = await searchImages(query, 1);
      
      if (response.photos.length > 0) {
        const selectedImage = response.photos[0];
        
        // Track as used
        setUsedImageIds(prev => new Set([...prev, selectedImage.id]));
        
        // Update the image results
        setImageResults(prev => ({
          ...prev,
          [imageType]: selectedImage
        }));

        // Update selected images if this image type was already selected
        const isCurrentlySelected = selectedImages.some(img => img.type === imageType);
        if (isCurrentlySelected) {
          setSelectedImages(prev => 
            prev.map(img => 
              img.type === imageType ? { ...img, image: selectedImage } : img
            )
          );
        }
      } else {
        setError(`No images found for ${formatImageType(imageType)}. Please try again.`);
      }
    } catch (err) {
      console.error(`Error refreshing image for ${imageType}:`, err);
      setError(`Failed to refresh image. Please try again.`);
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [imageType]: false
      }));
    }
  };

  const handleToggleSelect = (imageType: ImageType, image: ImageResult | null) => {
    if (!image) return; // Skip if no image available
    
    const isSelected = selectedImages.some(img => img.type === imageType);
    
    if (isSelected) {
      // Remove the image from selection
      setSelectedImages(prev => prev.filter(img => img.type !== imageType));
    } else {
      // Add the image to selection
      setSelectedImages(prev => [...prev, { type: imageType, image }]);
    }
  };

  const handleSelectAll = () => {
    // Create an array of all available images that aren't deleted
    const allImages: SelectedImage[] = [];
    
    imageTypes.forEach(type => {
      const imageType = type as ImageType;
      const image = imageResults[imageType];
      
      // Only include images that exist and aren't deleted
      if (image && !deletedImages.has(imageType)) {
        allImages.push({ type: imageType, image });
      }
    });
    
    setSelectedImages(allImages);
  };

  const handleDownload = async () => {
    if (selectedImages.length === 0) return;
    
    setIsDownloading(true);
    setError(null);
    
    try {
      // Create an array of images to download, using edited versions if available
      const imagesToDownload: ImageToDownload[] = selectedImages.map(selected => {
        const { type, image } = selected;
        
        if (!image) {
          throw new Error(`No image found for ${type}`);
        }
        
        // Use edited image if available
        if (editedImages[type]) {
          return {
            type,
            src: editedImages[type],
            isEdited: true
          };
        }
        
        // Use original image
        return {
          type,
          src: image.src.large || image.src.medium,
          isEdited: false
        };
      });
      
      // Handle compression options if dialog is enabled
      if (isCompressionDialogOpen) {
        setIsCompressionDialogOpen(true);
      } else {
        // Download directly with default settings
        await generateZip(imagesToDownload, projectInfo, { 
          enabled: true,
          quality: 0.9, 
          maxWidthOrHeight: 1920,
          maxSizeMB: 2,
          preserveExif: false
        });
      }
    } catch (err) {
      console.error('Error downloading images:', err);
      setError('Failed to download images. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle compression settings applied
  const handleCompressionApplied = async (settings: CompressionSettings) => {
    setIsCompressionDialogOpen(false);
    setIsDownloading(true);
    
    try {
      // Create an array of images to download, using edited versions if available
      const imagesToDownload: ImageToDownload[] = selectedImages.map(selected => {
        const { type, image } = selected;
        
        if (!image) {
          throw new Error(`No image found for ${type}`);
        }
        
        // Use edited image if available
        if (editedImages[type]) {
          return {
            type,
            src: editedImages[type],
            isEdited: true
          };
        }
        
        // Use original image
        return {
          type,
          src: image.src.large || image.src.medium,
          isEdited: false
        };
      });
      
      await generateZip(imagesToDownload, projectInfo, settings);
    } catch (err) {
      console.error('Error downloading images with compression:', err);
      setError('Failed to download images. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUndoImage = (imageType: ImageType) => {
    const history = imageHistory[imageType] || [];
    if (history && history.length > 0) {
      // Get the last image from history
      const previousImage = history[history.length - 1];
      
      // Update the image
      setImageResults(prev => ({
        ...prev,
        [imageType]: previousImage
      }));
      
      // Remove this image from history
      setImageHistory(prev => ({
        ...prev,
        [imageType]: (prev[imageType] || []).slice(0, -1)
      }));
      
      // Update selected images if this type was selected
      const isCurrentlySelected = selectedImages.some(img => img.type === imageType);
      if (isCurrentlySelected) {
        setSelectedImages(prev => 
          prev.map(img => 
            img.type === imageType ? { ...img, image: previousImage } : img
          )
        );
      }
    }
  };
  
  const handleUnselectAll = () => {
    setSelectedImages([]);
  };

  const handleImageEdit = (type: ImageType, editedImageUrl: string) => {
    setEditedImages(prev => ({
      ...prev,
      [type]: editedImageUrl
    }));
  };

  // Update images when industry/category changes
  const handleIndustryChange = async (industry: string) => {
    if (!industry) return;
    
    setCurrentIndustry(industry);
    setIsRefreshingAll(true);
    setError(null);
    
    // Store current images in history before refreshing
    const updatedHistory = { ...imageHistory };
    Object.entries(imageResults).forEach(([type, image]) => {
      if (image) {
        const imageType = type as ImageType;
        updatedHistory[imageType] = [...(updatedHistory[imageType] || []), image];
      }
    });
    setImageHistory(updatedHistory);
    
    // Create updated project info with new industry description
    const updatedProjectInfo = {
      ...projectInfo,
      description: industry
    };
    
    try {
      const imageTypesList = getImageTypes(imageCount);
      const initialResults: Record<string, ImageResult | null> = {};
      const initialLoadingState: Record<string, boolean> = {};
      const usedIdsInThisRequest = new Set<string>();

      // Initialize states
      imageTypesList.forEach(type => {
        initialResults[type] = null;
        initialLoadingState[type] = true;
      });

      setImageResults(initialResults);
      setIsLoading(initialLoadingState);

      // Get the base industry query
      const baseQuery = getSearchQuery('other', industry, '');
      
      // Then fetch images sequentially to ensure no duplicates
      for (const imageType of imageTypesList) {
        try {
          // Request a batch of images
          const response = await searchImages(baseQuery, 3);
          
          if (response.photos.length > 0) {
            // Find the first image that hasn't been used yet in this request
            let selectedImage: ImageResult | null = null;
            for (const photo of response.photos) {
              if (!usedIdsInThisRequest.has(photo.id)) {
                selectedImage = photo;
                // Mark this ID as used both globally and in this request
                usedIdsInThisRequest.add(photo.id);
                setUsedImageIds(prev => new Set([...prev, photo.id]));
                break;
              }
            }
            
            // If all were duplicates, just use the first one
            if (!selectedImage && response.photos.length > 0) {
              const firstImage = response.photos[0];
              selectedImage = firstImage;
              usedIdsInThisRequest.add(firstImage.id);
              setUsedImageIds(prev => new Set([...prev, firstImage.id]));
            }
            
            if (selectedImage) {
              initialResults[imageType] = selectedImage;
            }
          }
        } catch (err) {
          console.error(`Error fetching images for ${imageType}:`, err);
        }
      }
      
      setImageResults(initialResults);
      setSelectedImages([]); // Clear selected images when changing industry
      
      const successfulResults = Object.values(initialResults).filter(Boolean);
      if (successfulResults.length === 0) {
        setError('No images were found for this industry. Try a different search term.');
      } else if (successfulResults.length < imageTypesList.length) {
        setError('Some images could not be loaded. You can refresh to try again.');
      } else {
        setError(null);
      }
    } catch (err) {
      console.error('Error refreshing images:', err);
      setError('Failed to refresh images. Please try again.');
    } finally {
      setIsRefreshingAll(false);
      const finalLoadingState: Record<string, boolean> = {};
      imageTypes.forEach(type => {
        finalLoadingState[type] = false;
      });
      setIsLoading(finalLoadingState);
    }
  };

  // New method to handle toggling image lock status
  const handleToggleLock = (imageType: ImageType) => {
    setLockedImages(prev => {
      const newLockedImages = new Set(prev);
      if (newLockedImages.has(imageType)) {
        newLockedImages.delete(imageType);
      } else {
        newLockedImages.add(imageType);
      }
      return newLockedImages;
    });
  };
  
  // New method to handle deleting an image
  const handleDeleteImage = (imageType: ImageType) => {
    // Add to deleted images set
    setDeletedImages(prev => new Set([...prev, imageType]));
    
    // Remove from selected images if it was selected
    setSelectedImages(prev => prev.filter(img => img.type !== imageType));
    
    // Remove from locked images if it was locked
    setLockedImages(prev => {
      const newLockedImages = new Set(prev);
      if (newLockedImages.has(imageType)) {
        newLockedImages.delete(imageType);
      }
      return newLockedImages;
    });
  };
  
  // Method to restore a deleted image
  const handleRestoreDeletedImages = () => {
    setDeletedImages(new Set());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-2 -ml-2 flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
            {currentIndustry} Stock Images
          </h2>
          <p className="text-muted-foreground mt-1">
            {selectedImages.length} of {imageTypes.length} images selected
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Industry Search Bar - Now inline with buttons */}
          <div className="w-full sm:max-w-md">
            <IndustrySearch
              value={currentIndustry}
              onChange={handleIndustryChange}
              disabled={isRefreshingAll}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end">
            {selectedImages.length > 0 ? (
              <Button 
                variant="outline" 
                onClick={handleUnselectAll}
                className="flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Unselect All
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleSelectAll}
                disabled={Object.values(imageResults).filter(Boolean).length === 0}
                className="flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Select All
              </Button>
            )}
            
          <Button
            variant="outline"
            onClick={handleRefreshAllImages}
            disabled={isRefreshingAll}
              className="flex items-center gap-2"
          >
              <RefreshCw size={16} className={isRefreshingAll ? 'animate-spin' : ''} />
            Refresh All
          </Button>
            
            {deletedImages.size > 0 && (
              <Button 
                variant="outline" 
                onClick={handleRestoreDeletedImages}
                className="flex items-center gap-2"
              >
                Restore Deleted
              </Button>
            )}
            
          <Button
            onClick={handleDownload}
            disabled={selectedImages.length === 0 || isDownloading}
            className="flex items-center gap-2"
            variant="gradient"
          >
              <Download size={16} />
            Download {selectedImages.length > 0 ? `(${selectedImages.length})` : ''}
          </Button>
          </div>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm"
        >
          {error}
        </motion.div>
      )}

      <Separator className="my-8" />

      {/* Masonry Image Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {imageTypes.map((type) => {
          const imageType = type as ImageType;
          
          // Skip rendering deleted images
          if (deletedImages.has(imageType)) {
            return null;
          }
          
          const image = imageResults[imageType];
          const isSelected = selectedImages.some(img => img.type === imageType);
          const isImageLoading = isLoading[imageType] || false;
          const hasHistory = (imageHistory[imageType]?.length || 0) > 0;
          const isLocked = lockedImages.has(imageType);
          
          return (
            <div
              key={type}
              className="break-inside-avoid mb-6"
            >
                <ImageCard
                  image={image}
                type={imageType}
                isLoading={isImageLoading}
                  isSelected={isSelected}
                isLocked={isLocked}
                  onSelect={() => handleToggleSelect(imageType, image)}
                onImageEdit={(type, editedImageUrl) => handleImageEdit(type, editedImageUrl)}
                onRefresh={() => handleRefreshImage(imageType)}
                onUndo={() => handleUndoImage(imageType)}
                onDelete={() => handleDeleteImage(imageType)}
                onToggleLock={() => handleToggleLock(imageType)}
                hasHistory={hasHistory}
              />
                      </div>
          );
        })}
      </div>
      
      <Separator className="my-8" />

      {/* Compression Options Dialog */}
      <CompressionOptions
        isOpen={isCompressionDialogOpen}
        onClose={() => setIsCompressionDialogOpen(false)}
        onApply={handleCompressionApplied}
      />
    </motion.div>
  );
} 