import React from 'react';
import LazyImage from './LazyImage';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  onError?: () => void;
  generatePlaceholder?: boolean;
}

/**
 * ResponsiveImage component that automatically handles:
 * - WebP conversion
 * - Responsive image sizes
 * - Lazy loading
 * - Placeholders
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
}) => {
  // Generate WebP source if image is JPG or PNG
  const isConvertibleImage = /\.(jpe?g|png)$/i.test(src);
  
  // Extract file parts for responsive images
  const extension = src.split('.').pop() || '';
  const basePath = src.replace(`.${extension}`, '');
  
  // Generate responsive srcSet for original format
  const generateSrcSet = () => {
    if (!width) return undefined;
    
    const breakpoints = [640, 750, 828, 1080, 1200, 1920];
    return breakpoints
      .filter(bp => bp <= width * 2) // Only include sizes up to 2x the display size
      .map(bp => `${basePath}-${bp}w.${extension} ${bp}w`)
      .join(', ');
  };
  
  // Generate WebP srcSet
  const generateWebpSrcSet = () => {
    if (!width || !isConvertibleImage) return undefined;
    
    const breakpoints = [640, 750, 828, 1080, 1200, 1920];
    return breakpoints
      .filter(bp => bp <= width * 2) // Only include sizes up to 2x the display size
      .map(bp => `${basePath}-${bp}w.webp ${bp}w`)
      .join(', ');
  };
  
  // Generate WebP source
  const webpSrc = isConvertibleImage ? `${basePath}.webp` : undefined;
  
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      webpSrc={webpSrc}
      srcSet={generateSrcSet()}
      webpSrcSet={generateWebpSrcSet()}
      sizes={sizes}
      priority={priority}
      objectFit={objectFit}
      objectPosition={objectPosition}
      onLoad={onLoad}
      onError={onError}
      generatePlaceholder={true}
    />
  );
};

export default ResponsiveImage;