import React, { useState, useRef, useEffect } from 'react';
import { ImageResult } from '@/types';
import { Button } from './button';
import { Slider } from './slider';

type AspectRatio = '16:9' | '9:16' | '1:1';

interface ImageEditorProps {
  image: ImageResult;
  onSave: (editedImage: string) => void;
  onCancel: () => void;
}

export function ImageEditor({ image, onSave, onCancel }: ImageEditorProps) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 500, height: 500 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Get aspect ratio numeric value
  const getAspectRatioValue = (ratio: AspectRatio): number => {
    switch (ratio) {
      case '16:9': return 16/9;
      case '9:16': return 9/16;
      case '1:1': return 1;
      default: return 1;
    }
  };
  
  // Get canvas dimensions based on aspect ratio
  const getCanvasDimensions = (): { width: number, height: number } => {
    const maxDimension = 500;
    
    if (aspectRatio === '1:1') {
      // Perfect square - ensure exact dimensions
      return { width: maxDimension, height: maxDimension };
    } else if (aspectRatio === '16:9') {
      // Landscape - maintain exact 16:9 ratio
      return { width: maxDimension, height: Math.round(maxDimension * (9/16)) };
    } else if (aspectRatio === '9:16') {
      // Portrait - maintain exact 9:16 ratio
      return { width: Math.round(maxDimension * (9/16)), height: maxDimension };
    }
    
    // Fallback to square if something goes wrong
    return { width: maxDimension, height: maxDimension };
  };

  // Handle aspect ratio change
  const handleAspectRatioChange = (newRatio: AspectRatio) => {
    setAspectRatio(newRatio);
    
    // Recalculate crop based on new aspect ratio
    if (imageRef.current) {
      const img = imageRef.current;
      const ratio = getAspectRatioValue(newRatio);
      
      let newWidth, newHeight;
      
      if (newRatio === '1:1') {
        // For square aspect ratio, prioritize making a perfect square
        // Use the smaller dimension of the image to ensure it fits
        const dimension = Math.min(img.width, img.height);
        newWidth = dimension;
        newHeight = dimension;
      } else if (ratio > 1) {
        // Landscape
        newWidth = Math.min(500, img.width);
        newHeight = newWidth / ratio;
      } else {
        // Portrait
        newHeight = Math.min(500, img.height);
        newWidth = newHeight * ratio;
      }
      
      // If dimensions exceed image size, adjust
      if (newWidth > img.width) {
        newWidth = img.width;
        newHeight = newWidth / ratio;
      }
      
      if (newHeight > img.height) {
        newHeight = img.height;
        newWidth = newHeight * ratio;
      }
      
      // Center the crop
      const x = Math.max(0, (img.width - newWidth) / 2);
      const y = Math.max(0, (img.height - newHeight) / 2);
      
      setCrop({ x, y, width: newWidth, height: newHeight });
    }
  };

  // Load the image when component mounts
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      setOriginalDimensions({ width: img.width, height: img.height });
      
      // Initialize crop to center of image with current aspect ratio
      if (img.width && img.height) {
        handleAspectRatioChange(aspectRatio);
      }
    };
    img.onerror = () => {
      console.error("Failed to load image for editing");
    };
    img.src = image.src.large || image.src.medium;
    
    return () => {
      // Clean up
      if (imageRef.current) {
        imageRef.current = null;
      }
    };
  }, [image]);

  // Update crop when aspect ratio changes
  useEffect(() => {
    if (imageRef.current && originalDimensions.width > 0 && originalDimensions.height > 0) {
      handleAspectRatioChange(aspectRatio);
    }
  }, [aspectRatio]);

  // Render the image with crop frame whenever crop changes
  useEffect(() => {
    renderImage();
  }, [crop, zoom, aspectRatio]);

  const renderImage = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get dimensions based on aspect ratio
    const dimensions = getCanvasDimensions();
    
    // Force dimensions based on aspect ratio - this ensures canvas matches container exactly
    if (aspectRatio === '1:1') {
      canvas.width = 500;
      canvas.height = 500;
    } else if (aspectRatio === '16:9') {
      canvas.width = 500;
      canvas.height = 281;
    } else if (aspectRatio === '9:16') {
      canvas.width = 281;
      canvas.height = 500;
    }
    
    // Clear canvas with a background pattern to show dimensions
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a stronger border
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw guide lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Vertical thirds
    ctx.beginPath();
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo((canvas.width / 3) * 2, 0);
    ctx.lineTo((canvas.width / 3) * 2, canvas.height);
    ctx.stroke();
    
    // Horizontal thirds
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, (canvas.height / 3) * 2);
    ctx.lineTo(canvas.width, (canvas.height / 3) * 2);
    ctx.stroke();
    
    // Calculate scaled dimensions
    const scaledWidth = originalDimensions.width * zoom;
    const scaledHeight = originalDimensions.height * zoom;
    
    // Calculate image position to center it within the crop frame
    const drawX = -crop.x * zoom;
    const drawY = -crop.y * zoom;
    
    // Draw the image with zoom
    ctx.drawImage(
      imageRef.current,
      0, 0, originalDimensions.width, originalDimensions.height,
      drawX, drawY, scaledWidth, scaledHeight
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = (x - dragStart.x) / zoom;
    const deltaY = (y - dragStart.y) / zoom;
    
    setDragStart({ x, y });
    
    // Update crop position while keeping it within image bounds
    setCrop(prev => {
      const newX = Math.max(0, Math.min(originalDimensions.width - prev.width, prev.x - deltaX));
      const newY = Math.max(0, Math.min(originalDimensions.height - prev.height, prev.y - deltaY));
      return { ...prev, x: newX, y: newY };
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    
    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement('canvas');
    const dimensions = getCanvasDimensions();
    
    // For square (1:1) aspect ratio, ensure the output is exactly 500x500
    if (aspectRatio === '1:1') {
      croppedCanvas.width = 500;
      croppedCanvas.height = 500;
    } else {
      croppedCanvas.width = dimensions.width;
      croppedCanvas.height = dimensions.height;
    }
    
    const ctx = croppedCanvas.getContext('2d');
    
    if (!ctx || !canvasRef.current) return;
    
    // Draw the cropped section to the new canvas
    ctx.drawImage(canvasRef.current, 0, 0, dimensions.width, dimensions.height, 0, 0, croppedCanvas.width, croppedCanvas.height);
    
    // Convert to data URL and pass to onSave
    const dataUrl = croppedCanvas.toDataURL('image/jpeg', 0.9);
    onSave(dataUrl);
  };

  const canvasDimensions = getCanvasDimensions();

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
      
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Select Aspect Ratio:</p>
        <div className="flex space-x-4 mb-4">
          <AspectRatioButton
            label="Landscape"
            description="16:9 (500×281)"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="10" rx="2" />
              </svg>
            }
            value="16:9"
            current={aspectRatio}
            onChange={handleAspectRatioChange}
          />
          <AspectRatioButton
            label="Square"
            description="1:1 (500×500)"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
            }
            value="1:1"
            current={aspectRatio}
            onChange={handleAspectRatioChange}
          />
          <AspectRatioButton
            label="Portrait"
            description="9:16 (281×500)"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="3" width="10" height="18" rx="2" />
              </svg>
            }
            value="9:16"
            current={aspectRatio}
            onChange={handleAspectRatioChange}
          />
        </div>
        
        <label className="block text-sm font-medium mb-1">Zoom Level: {zoom.toFixed(1)}x</label>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={value => setZoom(value)}
        />
      </div>
      
      {/* Fixed ratio wrapper container */}
      <div className="mx-auto mb-4 flex justify-center items-center">
        <div 
          className={`relative overflow-hidden border-4 border-primary-500 rounded-lg shadow-lg mx-auto`}
          style={{
            width: aspectRatio === '1:1' ? '500px' : 
                  aspectRatio === '16:9' ? '500px' : '281px',
            height: aspectRatio === '1:1' ? '500px' : 
                   aspectRatio === '9:16' ? '500px' : '281px',
          }}
        >
          <div
            ref={containerRef}
            className="absolute top-0 left-0 right-0 bottom-0 cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              width={canvasDimensions.width}
              height={canvasDimensions.height}
              className="w-full h-full"
            />
            
            {/* Guide lines for better visual reference */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-b border-white/30"></div>
              <div className="border-r border-white/30"></div>
              <div className="border-r border-white/30"></div>
              <div></div>
            </div>
            
            {/* Output size indicator */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md shadow-lg flex items-center gap-1 font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 17 17 17 17 7"></polyline>
                <polyline points="7 7 7 17 17 7"></polyline>
              </svg>
              {canvasDimensions.width} × {canvasDimensions.height}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        <p className="mb-1">Drag to reposition the image. Use the zoom slider to adjust the zoom level.</p>
        <p>Output dimensions: <span className="font-medium">{canvasDimensions.width} × {canvasDimensions.height}px</span></p>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="gradient" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

type AspectRatioButtonProps = {
  label: string;
  description: string;
  icon: React.ReactNode;
  value: AspectRatio;
  current: AspectRatio;
  onChange: (value: AspectRatio) => void;
};

function AspectRatioButton({ label, description, icon, value, current, onChange }: AspectRatioButtonProps) {
  const isActive = value === current;
  
  return (
    <button
      type="button"
      className={`px-3 py-2 text-sm rounded-md flex flex-col items-center gap-1 min-w-[75px] ${
        isActive 
          ? 'bg-primary-100 text-primary-900 border-primary-500 border'
          : 'bg-gray-100 text-gray-700 border-gray-300 border hover:bg-gray-200'
      }`}
      onClick={() => onChange(value)}
    >
      <div className={isActive ? 'text-primary-500' : 'text-gray-500'}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      <span className="text-xs opacity-75">{description}</span>
    </button>
  );
} 