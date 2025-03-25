'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { IndustrySearch } from '@/components/ui/industry-search';
import { Slider } from '@/components/ui/slider';

// Form schema validation
const projectSchema = z.object({
  searchQuery: z.string().min(1, 'Please select an industry or enter a search term'),
  imageCount: z.number().min(1).max(20)
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectInfo) => void;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, isLoading = false }: ProjectFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [imageCount, setImageCount] = useState(6);

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      searchQuery: '',
      imageCount: 6
    }
  });

  const onIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setValue('searchQuery', value, { shouldValidate: true });
  };

  const onImageCountChange = (value: number) => {
    setImageCount(value);
    setValue('imageCount', value, { shouldValidate: true });
  };

  const onFormSubmit = (data: ProjectFormData) => {
    // Cast the entire object to ProjectInfo
    const projectInfo: ProjectInfo = {
      businessType: 'other',
      description: data.searchQuery,
      imageCount: data.imageCount
    };
    
    onSubmit(projectInfo);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-1.5">
            Search for Industry
          </label>
          <div className="relative">
            <IndustrySearch
              value={selectedIndustry}
              onChange={onIndustryChange}
              disabled={isLoading}
            />
          </div>
          {errors.searchQuery && (
            <p className="mt-1.5 text-sm text-red-500">{errors.searchQuery.message}</p>
          )}
          <p className="mt-1.5 text-xs text-muted-foreground">
            Select an industry to generate relevant stock images
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="pt-2"
        >
          <label className="block text-sm font-medium mb-1.5">
            Number of Images: {imageCount}
          </label>
          <Slider 
            value={imageCount}
            min={1} 
            max={20} 
            step={1}
            onChange={onImageCountChange}
            className="py-4"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Select how many images to generate (1-20)
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="w-full"
          variant="gradient"
          shimmer
          size="lg"
          icon={<Sparkles className="h-4 w-4" />}
        >
          Generate Stock Images
        </Button>
      </motion.div>
    </form>
  );
} 