import React, { useState, useEffect } from 'react';
import { ImageResult, ImageType } from '@/types';
import { Card, CardContent } from './card';
import { cn, formatImageType } from '@/lib/utils';
import { ImageIcon, AlertTriangle, Scissors, RefreshCw, RotateCcw, Maximize, Trash2, Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageEditor } from './image-editor';

interface ImageCardProps {
  image: ImageResult | null;
  type: ImageType;
  isLoading: boolean;
  isSelected: boolean;
  isLocked?: boolean;
  onSelect: () => void;
  onImageEdit?: (type: ImageType, editedImageUrl: string) => void;
  onRefresh?: () => void;
  onUndo?: () => void;
  onDelete?: () => void;
  onToggleLock?: () => void;
  hasHistory?: boolean;
}

export function ImageCard({
  image,
  type,
  isLoading,
  isSelected,
  isLocked = false,
  onSelect,
  onImageEdit,
  onRefresh,
  onUndo,
  onDelete,
  onToggleLock,
  hasHistory = false
}: ImageCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [editedDimensions, setEditedDimensions] = useState<{ width: number, height: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const formattedType = formatImageType(type);

  // Load dimensions for edited image
  useEffect(() => {
    if (editedImageUrl) {
      const img = new Image();
      img.onload = () => {
        setEditedDimensions({ width: img.width, height: img.height });
      };
      img.src = editedImageUrl;
    }
  }, [editedImageUrl]);

  // Calculate aspect ratio to use for display
  const getImageStyle = () => {
    if (!image) return { paddingBottom: '100%' }; // Default square
    
    if (editedImageUrl && editedDimensions) {
      // For edited images, use the edited dimensions
      const ratio = (editedDimensions.height / editedDimensions.width) * 100;
      return { paddingBottom: `${ratio}%` };
    } else {
      // For original images, use the original aspect ratio
      const ratio = (image.height / image.width) * 100;
      return { paddingBottom: `${ratio}%` };
    }
  };

  // If no image or loading, show placeholder
  if (!image || hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card variant="elevated" className="overflow-hidden aspect-video">
          <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-6">
            {isLoading ? (
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600" />
            ) : (
              <>
                <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Image unavailable</p>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  const handleEditSave = (editedImage: string) => {
    setEditedImageUrl(editedImage);
    setIsEditing(false);
    if (onImageEdit) {
      onImageEdit(type, editedImage);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  if (isEditing && image) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card variant="elevated" className="overflow-hidden p-0">
          <ImageEditor 
            image={image} 
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        </Card>
      </motion.div>
    );
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setIsImageLoaded(true);
    setHasError(false);
  };

  // Get the current dimensions to display
  const displayDimensions = editedDimensions || imageDimensions;
  const hasLoadedDimensions = displayDimensions.width > 0 && displayDimensions.height > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="cursor-pointer"
    >
      <Card 
        variant="elevated" 
        animation="glow" 
        className={`overflow-hidden ${isSelected ? 'ring-2 ring-primary-500' : ''} ${isLocked ? 'ring-2 ring-amber-400' : ''}`}
      >
        <div 
          className="relative overflow-hidden group"
          onClick={onSelect}
        >
          <div className="relative w-full" style={getImageStyle()}>
          {!isImageLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
              <ImageIcon className="h-10 w-10 text-primary-300" />
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
              <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
              <p className="text-sm text-gray-500">Image unavailable</p>
            </div>
            ) : (
              <div className="absolute inset-0">
                {editedImageUrl ? (
                  <img
                    src={editedImageUrl}
                    alt={image.alt || formattedType}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-500",
                      "group-hover:scale-105 group-hover:brightness-105",
                      !isImageLoaded && "opacity-0"
                    )}
                    onLoad={handleImageLoad}
                    onError={() => {
                      setHasError(true);
                      setIsImageLoaded(false);
                    }}
                  />
          ) : (
            <img
              src={image.src.medium}
              alt={image.alt || formattedType}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                      "group-hover:scale-105 group-hover:brightness-105",
                !isImageLoaded && "opacity-0"
              )}
                    onLoad={handleImageLoad}
              onError={() => {
                setHasError(true);
                setIsImageLoaded(false);
              }}
            />
                )}
              </div>
            )}
          
            {/* Source badge - Pexels */}
            <div className="absolute top-2 right-2 z-10">
              <div className="text-xs font-medium px-2 py-1 rounded-full shadow-lg bg-green-600 text-white">
                Pexels
          </div>
            </div>
            
            {/* Dimensions badge */}
            {hasLoadedDimensions && (
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                <Maximize size={12} />
                {displayDimensions.width} × {displayDimensions.height}
                {editedDimensions && <span className="ml-1 text-green-400">(Edited)</span>}
              </div>
            )}
            
            {/* Lock status badge */}
            {isLocked && (
              <div className="absolute top-2 left-16 bg-amber-500 text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                <Lock size={12} />
                Locked
          </div>
            )}
          
          {isSelected && !hasError && (
              <div className="absolute bottom-2 left-2 bg-primary-500 text-white rounded-full p-2 shadow-lg z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          </div>
        </div>
        
        <CardContent className="p-3">
          {/* Image info */}
          <div className="space-y-1 mb-2">
            {image.alt && (
              <p className="font-medium text-sm line-clamp-1">{image.alt}</p>
            )}
            
          <div className="text-xs text-muted-foreground truncate">
              {!hasError && image.photographer && (
              <>
                Photo by{' '}
                <a
                  href={image.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                  {image.photographer}
                </a>
              </>
            )}
          </div>
          </div>
          
          {/* Toolbar */}
          <div className="flex items-center justify-between mt-2 border-t pt-2">
            <div className="flex space-x-2">
              {/* Edit button */}
              <div className="relative">
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  onMouseEnter={() => setShowTooltip('edit')}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <Scissors size={18} />
                </button>
                {showTooltip === 'edit' && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
                    Edit image
                  </div>
                )}
              </div>
              
              {/* Refresh button */}
              {onRefresh && (
                <div className="relative">
                  <button
                    className={`p-1.5 rounded-full transition-colors ${isLocked ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLocked && onRefresh) onRefresh();
                    }}
                    disabled={isLoading || isLocked}
                    onMouseEnter={() => setShowTooltip('refresh')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <RefreshCw size={18} className={isLoading ? 'animate-spin text-primary-500' : ''} />
                  </button>
                  {showTooltip === 'refresh' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
                      {isLocked ? 'Cannot refresh locked image' : 'Refresh image'}
                    </div>
                  )}
                </div>
              )}
              
              {/* Undo button */}
              {onUndo && hasHistory && (
                <div className="relative">
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUndo();
                    }}
                    onMouseEnter={() => setShowTooltip('undo')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <RotateCcw size={18} />
                  </button>
                  {showTooltip === 'undo' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
                      Undo to previous image
                    </div>
                  )}
                </div>
              )}
              
              {/* Toggle Lock button */}
              {onToggleLock && (
                <div className="relative">
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock();
                    }}
                    onMouseEnter={() => setShowTooltip('lock')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    {isLocked ? <Lock size={18} className="text-amber-500" /> : <Unlock size={18} />}
                  </button>
                  {showTooltip === 'lock' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
                      {isLocked ? 'Unlock image (allow refresh)' : 'Lock image (prevent refresh)'}
                    </div>
                  )}
                </div>
              )}
              
              {/* Delete button */}
              {onDelete && (
                <div className="relative">
                  <button
                    className="p-1.5 rounded-full hover:bg-red-100 transition-colors text-gray-700 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    onMouseEnter={() => setShowTooltip('delete')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <Trash2 size={18} />
                  </button>
                  {showTooltip === 'delete' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
                      Remove image from view
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Select button */}
            <button
              className={`py-1 px-3 rounded-full text-xs font-medium ${
                isSelected 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
          >
            {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 