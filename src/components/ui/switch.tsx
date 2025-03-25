"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  const handleClick = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <div
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className={cn(
        "relative inline-flex cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        checked ? "bg-primary-500" : "bg-gray-200",
        "h-6 w-11",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-white shadow-md transform transition-transform duration-200 size-5",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </div>
  );
} 