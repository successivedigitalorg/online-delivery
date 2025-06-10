"use client";

import Image from "next/image";
import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
}: ResponsiveImageProps) {
  const [isError, setIsError] = useState(false);
  
  // Generate a placeholder color based on the image path
  const getPlaceholderColor = () => {
    if (src.includes("pizza")) return "#FFB740";
    if (src.includes("side")) return "#FFC299";
    if (src.includes("drink")) return "#C6E2FF";
    return "#F0F0F0";
  };
  
  // SVG images need special handling with Next.js Image component
  const isSvg = src.endsWith('.svg');

  return (
    <div 
      className="relative w-full h-full" 
      style={{
        backgroundColor: getPlaceholderColor(),
      }}
    >
      {!isError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          onError={() => setIsError(true)}
          className={`w-full h-full ${isSvg ? 'object-contain' : 'object-cover'} ${isError ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
          unoptimized={isSvg} // Don't optimize SVG files
        />
      )}

      {/* Display a fallback text if image fails to load */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center text-center p-2">
          <p className="text-sm font-medium text-gray-600">{alt}</p>
        </div>
      )}
    </div>
  );
}