import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ImageType, BusinessType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageTypes(count: number = 6): ImageType[] {
  // Return the specified number of image types (default to 6, max 20)
  const imageCount = Math.min(Math.max(1, count), 20); // Ensure between 1 and 20
  return Array.from({ length: imageCount }, (_, i) => `image${i + 1}` as ImageType);
}

export function formatImageType(type: string): string {
  // For generic image types like image1, image2, etc.
  if (type.startsWith('image')) {
    return `Image ${type.replace('image', '')}`;
  }
  
  // For other image types (fallback to the original formatting)
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSearchQuery(businessType: BusinessType, description: string): string {
  // If we have a meaningful description from the industry search, use it directly
  if (description && description.length > 0) {
    // Just use the exact industry name without any additional terms
    const industry = description.trim();
    return industry;
  }
  
  // Fallback to some basic generic terms if no industry was selected
  return 'business';
} 