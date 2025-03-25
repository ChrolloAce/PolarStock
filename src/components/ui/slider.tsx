"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export function Slider({
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ...props
}: SliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    const newValue = min + (max - min) * percentage;
    const stepped = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, stepped));
    
    setLocalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  React.useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!isDragging || !trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = (event.clientX - rect.left) / rect.width;
      const newValue = min + (max - min) * percentage;
      const stepped = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, stepped));
      
      setLocalValue(clampedValue);
      onChange?.(clampedValue);
    };
    
    const stopDragging = () => {
      setIsDragging(false);
    };
    
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", stopDragging);
    
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging, min, max, step, onChange]);

  const thumbPosition = `${((localValue - min) / (max - min)) * 100}%`;

  return (
    <div 
      className={cn("relative py-4 px-1", className)} 
      onClick={handleClick}
      {...props}
    >
      <div 
        ref={trackRef}
        className="h-2 bg-gray-200 rounded-full relative"
      >
        <div 
          className="absolute h-full bg-primary-500 rounded-full left-0"
          style={{ width: thumbPosition }}
        />
        <div 
          className={cn(
            "absolute w-4 h-4 bg-white border-2 border-primary-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 top-1/2 cursor-pointer hover:scale-110 transition",
            isDragging && "scale-110 shadow-lg"
          )}
          style={{ left: thumbPosition }}
          onMouseDown={startDragging}
        />
      </div>
    </div>
  );
} 