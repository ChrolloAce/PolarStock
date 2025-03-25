'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Sliders, Zap } from 'lucide-react';

interface CompressionOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (options: CompressionSettings) => void;
}

export interface CompressionSettings {
  enabled: boolean;
  quality: number;
  maxSizeMB: number;
  maxWidthOrHeight: number;
  preserveExif: boolean;
}

export function CompressionOptions({ isOpen, onClose, onApply }: CompressionOptionsProps) {
  const [settings, setSettings] = useState<CompressionSettings>({
    enabled: true,
    quality: 0.8,
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    preserveExif: false
  });
  
  const [presetSelected, setPresetSelected] = useState<string>('medium');
  
  // Preset configurations
  const presets = {
    high: {
      quality: 0.9,
      maxSizeMB: 2,
      maxWidthOrHeight: 2560
    },
    medium: {
      quality: 0.8,
      maxSizeMB: 1,
      maxWidthOrHeight: 1920
    },
    low: {
      quality: 0.6,
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280
    },
    tiny: {
      quality: 0.4,
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800
    }
  };
  
  // Apply preset settings
  const applyPreset = (preset: keyof typeof presets) => {
    setSettings({
      ...settings,
      ...presets[preset]
    });
    setPresetSelected(preset);
  };
  
  // Update quality
  const handleQualityChange = (value: number) => {
    setSettings({
      ...settings,
      quality: value / 100
    });
    setPresetSelected('custom');
  };
  
  // Update max width/height
  const handleMaxSizeChange = (value: number) => {
    setSettings({
      ...settings,
      maxWidthOrHeight: value
    });
    setPresetSelected('custom');
  };
  
  // Toggle compression
  const handleEnableChange = (enabled: boolean) => {
    setSettings({
      ...settings,
      enabled
    });
  };
  
  // Toggle EXIF data preservation
  const handlePreserveExifChange = (preserveExif: boolean) => {
    setSettings({
      ...settings,
      preserveExif
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Image Compression Options</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Enable compression
            </label>
            <Switch 
              checked={settings.enabled} 
              onCheckedChange={handleEnableChange}
            />
          </div>
          
          {settings.enabled && (
            <>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Quality preset</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(presets).map((preset) => (
                    <Button
                      key={preset}
                      variant={presetSelected === preset ? "gradient" : "outline"}
                      size="sm"
                      onClick={() => applyPreset(preset as keyof typeof presets)}
                      className="w-full capitalize"
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block font-medium text-gray-700">Quality</label>
                  <span className="text-sm text-gray-500">{Math.round(settings.quality * 100)}%</span>
                </div>
                <Slider
                  min={10}
                  max={95}
                  step={5}
                  value={[settings.quality * 100]}
                  onValueChange={(values) => handleQualityChange(values[0])}
                />
                <p className="text-xs text-gray-500">
                  {settings.quality >= 0.8 ? 'Higher quality, larger file size' : 
                   settings.quality >= 0.6 ? 'Good balance of quality and size' : 
                   'Smaller file size, lower quality'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block font-medium text-gray-700">Max Resolution</label>
                  <span className="text-sm text-gray-500">{settings.maxWidthOrHeight}px</span>
                </div>
                <Slider
                  min={800}
                  max={3840}
                  step={160}
                  value={[settings.maxWidthOrHeight]}
                  onValueChange={(values) => handleMaxSizeChange(values[0])}
                />
                <p className="text-xs text-gray-500">
                  Larger dimensions provide more detail but increase file size
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">
                  Preserve EXIF data
                </label>
                <Switch 
                  checked={settings.preserveExif} 
                  onCheckedChange={handlePreserveExifChange}
                />
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              variant="gradient"
              onClick={() => onApply(settings)}
              icon={<FileDown className="h-4 w-4" />}
              shimmer
            >
              Apply & Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 