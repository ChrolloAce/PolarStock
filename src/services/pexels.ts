import axios from 'axios';
import { PexelsResponse } from '@/types';

const PEXELS_API_KEY = 'tPZJbw21vulVTkRpPfg2olbQnQqLcrGcYPYtxFa2VsOv5YZQT4jYNikB';

const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: PEXELS_API_KEY
  }
});

// Function to shuffle arrays (for mixing results)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Cache for storing previously fetched images by query
const imageCache: Record<string, PexelsResponse> = {};
// Store current index for each query to avoid repeating images
const queryIndices: Record<string, number> = {};

// Get results from Pexels API
export async function searchImages(query: string, perPage: number = 10): Promise<PexelsResponse> {
  try {
    // Don't modify the query - use exactly as provided
    const exactQuery = query.trim();
    
    // Check if we have this query cached
    if (!imageCache[exactQuery]) {
      // Request extra images to have more in the cache
      const pexelsLimit = Math.ceil(perPage * 2);
      
      // Fetch from Pexels API
      const pexelsResponse = await pexelsApi.get<PexelsResponse>('/search', {
        params: {
          query: exactQuery,
          per_page: pexelsLimit,
          orientation: 'landscape',
          locale: 'en-US'
        }
      });
      
      // Get the photos from the response
      const photos = pexelsResponse.data.photos;
      
      // Store in cache
      imageCache[exactQuery] = {
        ...pexelsResponse.data,
        photos: shuffleArray(photos) // Shuffle for variety
      };
      
      // Initialize the index for this query
      queryIndices[exactQuery] = 0;
    }
    
    // Get the starting index for this query
    let currentIndex = queryIndices[exactQuery] || 0;
    const cachedResults = imageCache[exactQuery];
    
    // If we've gone through all images, fetch more or loop back to beginning
    if (currentIndex >= cachedResults.photos.length - perPage) {
      // Check if we need to fetch another page from the API
      if (cachedResults.next_page) {
        try {
          // Fetch next page
          const nextPageResponse = await pexelsApi.get<PexelsResponse>(cachedResults.next_page);
          
          // Add new photos to cache, avoiding duplicates
          const existingIds = new Set(cachedResults.photos.map(photo => photo.id));
          const newPhotos = nextPageResponse.data.photos.filter(photo => !existingIds.has(photo.id));
          
          // Update the cache with combined results
          imageCache[exactQuery] = {
            ...nextPageResponse.data,
            photos: [...cachedResults.photos, ...newPhotos]
          };
          
          // Keep the index where it is - we'll get new photos
        } catch (error) {
          console.error('Error fetching next page:', error);
          // If next page fails, loop back to beginning
          currentIndex = 0;
        }
      } else {
        // No more pages available, loop back to beginning
        currentIndex = 0;
      }
    }
    
    // Get a slice of the photos
    const resultPhotos = imageCache[exactQuery].photos.slice(currentIndex, currentIndex + perPage);
    
    // Update the index for next time
    queryIndices[exactQuery] = currentIndex + perPage;
    
    // Return the results
    return {
      total_results: imageCache[exactQuery].total_results,
      page: imageCache[exactQuery].page,
      per_page: perPage,
      photos: resultPhotos,
      next_page: imageCache[exactQuery].next_page || ''
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    // If the API fails, return an empty response
    return {
      total_results: 0,
      page: 1,
      per_page: perPage,
      photos: [],
      next_page: ''
    };
  }
}

export async function getRandomImages(perPage: number = 10): Promise<PexelsResponse> {
  try {
    // Using curated photos as a way to get random high-quality images
    const pexelsResponse = await pexelsApi.get<PexelsResponse>('/curated', {
      params: {
        per_page: perPage
      }
    });
    
    return {
      total_results: pexelsResponse.data.total_results,
      page: pexelsResponse.data.page,
      per_page: perPage,
      photos: pexelsResponse.data.photos,
      next_page: pexelsResponse.data.next_page
    };
  } catch (error) {
    console.error('Error fetching random images:', error);
    throw error;
  }
} 