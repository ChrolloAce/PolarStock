import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-lg border shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        elevated: "shadow-md hover:shadow-lg",
        bordered: "border-2 shadow-none",
        flat: "shadow-none",
        gradient: "bg-gradient-to-br from-primary-100 to-primary-50 border-primary-200",
      },
      animation: {
        default: "",
        hover: "hover:-translate-y-1",
        scale: "hover:scale-[1.02]",
        glow: "hover:shadow-[0_0_20px_rgba(0,132,255,0.3)]",
      },
      padding: {
        default: "p-6",
        none: "",
        sm: "p-4",
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "default",
      padding: "default",
    },
  }
);

export interface CardProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function Card({ 
  className, 
  variant, 
  animation,
  padding,
  children, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, animation, padding, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-bold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-gray-500', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
} 