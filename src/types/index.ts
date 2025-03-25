export type BusinessType = string;

export type ImageType = 
  | 'image1' 
  | 'image2' 
  | 'image3' 
  | 'image4' 
  | 'image5' 
  | 'image6'
  | 'image7'
  | 'image8'
  | 'image9'
  | 'image10'
  | 'image11'
  | 'image12'
  | 'image13'
  | 'image14'
  | 'image15'
  | 'image16'
  | 'image17'
  | 'image18'
  | 'image19'
  | 'image20';

export interface ImageResult {
  id: string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: ImageResult[];
  next_page: string;
}

export interface SelectedImage {
  type: ImageType;
  image: ImageResult | null;
}

export interface ProjectInfo {
  businessType: BusinessType;
  description: string;
  imageCount?: number; // Optional for backward compatibility, defaults to 6
}

export interface GeneratedImages {
  projectInfo: ProjectInfo;
  images: SelectedImage[];
} 