/**
 * Image optimization utility functions
 * Provides tools for WebP conversion, responsive image generation, and image optimization
 */

/**
 * Generates a WebP source URL from a standard image URL
 * @param src Original image URL
 * @returns WebP version URL or null if conversion not possible
 */
export const getWebPSource = (src: string): string | null => {
  if (!src) return null;
  
  // Check if the URL is external (starts with http or https)
  const isExternal = /^https?:\/\//i.test(src);
  
  // For external URLs, we can't guarantee WebP availability
  if (isExternal) {
    // Some CDNs support format conversion via URL parameters
    if (src.includes('cloudinary.com')) {
      return src.replace(/\.(jpe?g|png)/i, '.webp');
    }
    if (src.includes('imagekit.io')) {
      return `${src.split('?')[0]}?tr=f-webp`;
    }
    // For other external sources, we can't reliably convert
    return null;
  }
  
  // For internal assets, assume WebP versions exist with same name but .webp extension
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  return webpSrc;
};

/**
 * Generates responsive image srcSet for standard formats
 * @param src Base image URL
 * @param widths Array of widths to generate
 * @returns srcSet string for responsive images
 */
export const generateSrcSet = (src: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string => {
  if (!src) return '';
  
  // Check if the URL is external
  const isExternal = /^https?:\/\//i.test(src);
  
  if (isExternal) {
    // Handle common CDNs that support resizing
    if (src.includes('cloudinary.com')) {
      return widths
        .map(width => `${src.replace(/\/upload\//, `/upload/w_${width}/`)} ${width}w`)
        .join(', ');
    }
    if (src.includes('imagekit.io')) {
      return widths
        .map(width => `${src.split('?')[0]}?tr=w-${width} ${width}w`)
        .join(', ');
    }
    // For other external sources, we can't reliably resize
    return src;
  }
  
  // For internal assets, assume responsive versions exist or will be generated
  // Format: image-640.jpg 640w, image-768.jpg 768w, etc.
  const baseName = src.replace(/\.(jpe?g|png)$/i, '');
  const extension = src.match(/\.(jpe?g|png)$/i)?.[0] || '.jpg';
  
  return widths
    .map(width => `${baseName}-${width}${extension} ${width}w`)
    .join(', ');
};

/**
 * Generates responsive WebP srcSet
 * @param src Base image URL
 * @param widths Array of widths to generate
 * @returns WebP srcSet string for responsive images
 */
export const generateWebPSrcSet = (src: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string => {
  if (!src) return '';
  
  // Get the WebP source first
  const webpSrc = getWebPSource(src);
  if (!webpSrc) return '';
  
  // Then generate the srcSet using the WebP source
  return generateSrcSet(webpSrc, widths);
};

/**
 * Generates appropriate sizes attribute for responsive images
 * @returns Sizes attribute string
 */
export const getDefaultSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, 50vw';
};

/**
 * Estimates file size reduction from using WebP and responsive images
 * @param originalSizeKB Original image size in KB
 * @returns Estimated size after optimization in KB
 */
export const estimateSizeReduction = (originalSizeKB: number): number => {
  // WebP typically reduces size by ~30% compared to JPEG
  const webpReduction = originalSizeKB * 0.3;
  
  // Responsive images ensure we only load the size needed
  // Assuming average device loads 50% of original dimensions
  const responsiveReduction = originalSizeKB * 0.5;
  
  // Combined reduction (but ensure we don't go below 10% of original)
  const estimatedSize = Math.max(originalSizeKB - webpReduction - responsiveReduction, originalSizeKB * 0.1);
  
  return Math.round(estimatedSize);
};

/**
 * Calculates appropriate image dimensions based on container size
 * @param containerWidth Width of the container in pixels
 * @param containerHeight Height of the container in pixels
 * @param imageAspectRatio Original image aspect ratio (width/height)
 * @returns Optimal dimensions {width, height}
 */
export const calculateOptimalDimensions = (
  containerWidth: number,
  containerHeight: number,
  imageAspectRatio: number
): { width: number; height: number } => {
  // If container has same aspect ratio, use container dimensions
  const containerAspectRatio = containerWidth / containerHeight;
  
  if (Math.abs(containerAspectRatio - imageAspectRatio) < 0.01) {
    return { width: containerWidth, height: containerHeight };
  }
  
  // If image is wider than container
  if (imageAspectRatio > containerAspectRatio) {
    return {
      width: containerWidth,
      height: Math.round(containerWidth / imageAspectRatio)
    };
  }
  
  // If image is taller than container
  return {
    width: Math.round(containerHeight * imageAspectRatio),
    height: containerHeight
  };
};