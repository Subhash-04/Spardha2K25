import { useState, useEffect } from 'react';

/**
 * Interface for image conversion options
 */
interface ConversionOptions {
  quality?: number;  // WebP quality (0-100)
  width?: number;    // Target width for resizing
  height?: number;   // Target height for resizing
  generatePlaceholder?: boolean; // Whether to generate a low-quality placeholder
}

/**
 * Interface for the result of image conversion
 */
interface ConversionResult {
  webpUrl: string;           // URL of the WebP version
  originalUrl: string;       // Original image URL
  placeholderUrl?: string;   // Low quality placeholder URL (if requested)
  width?: number;            // Image width
  height?: number;           // Image height
  isConverting: boolean;     // Whether conversion is in progress
  error?: string;            // Error message if conversion failed
}

/**
 * Cache for storing converted images to avoid redundant conversions
 */
const webpCache = new Map<string, ConversionResult>();

/**
 * Checks if the browser supports WebP format
 * @returns Promise that resolves to boolean indicating WebP support
 */
export const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = () => resolve(webP.height === 1);
    webP.onerror = () => resolve(false);
    webP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
};

/**
 * Converts an image to WebP format using Canvas API
 * @param imageUrl - URL of the image to convert
 * @param options - Conversion options
 * @returns Promise that resolves to the conversion result
 */
export const convertToWebP = async (
  imageUrl: string,
  options: ConversionOptions = {}
): Promise<ConversionResult> => {
  // Default options
  const {
    quality = 80,
    width,
    height,
    generatePlaceholder = false
  } = options;
  
  // Check cache first
  const cacheKey = `${imageUrl}-${quality}-${width}-${height}`;
  if (webpCache.has(cacheKey)) {
    return webpCache.get(cacheKey)!;
  }
  
  // Initial result with conversion in progress
  const initialResult: ConversionResult = {
    webpUrl: imageUrl, // Use original as fallback initially
    originalUrl: imageUrl,
    isConverting: true
  };
  
  try {
    // Load the image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
      img.src = imageUrl;
    });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    
    // Set dimensions (use original or specified)
    const targetWidth = width || img.naturalWidth;
    const targetHeight = height || img.naturalHeight;
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Draw image to canvas
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    // Convert to WebP
    const webpUrl = canvas.toDataURL('image/webp', quality / 100);
    
    // Generate placeholder if requested
    let placeholderUrl;
    if (generatePlaceholder) {
      // Create a tiny version for placeholder
      const placeholderCanvas = document.createElement('canvas');
      const placeholderCtx = placeholderCanvas.getContext('2d');
      
      if (placeholderCtx) {
        // Make placeholder small and blurry
        placeholderCanvas.width = Math.max(10, Math.floor(targetWidth / 10));
        placeholderCanvas.height = Math.max(10, Math.floor(targetHeight / 10));
        
        placeholderCtx.drawImage(img, 0, 0, placeholderCanvas.width, placeholderCanvas.height);
        placeholderUrl = placeholderCanvas.toDataURL('image/webp', 0.1); // Very low quality
      }
    }
    
    // Final result
    const result: ConversionResult = {
      webpUrl,
      originalUrl: imageUrl,
      placeholderUrl,
      width: targetWidth,
      height: targetHeight,
      isConverting: false
    };
    
    // Cache the result
    webpCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('WebP conversion error:', error);
    return {
      ...initialResult,
      isConverting: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * React hook for converting images to WebP format
 * @param imageUrl - URL of the image to convert
 * @param options - Conversion options
 * @returns Conversion result state
 */
export const useWebPImage = (
  imageUrl: string,
  options: ConversionOptions = {}
): ConversionResult => {
  const [result, setResult] = useState<ConversionResult>({
    webpUrl: imageUrl,
    originalUrl: imageUrl,
    isConverting: true
  });
  
  useEffect(() => {
    let isMounted = true;
    
    const convert = async () => {
      try {
        // Check if WebP is supported
        const isWebPSupported = await checkWebPSupport();
        
        if (!isWebPSupported) {
          // If WebP is not supported, just use the original image
          if (isMounted) {
            setResult({
              webpUrl: imageUrl,
              originalUrl: imageUrl,
              isConverting: false
            });
          }
          return;
        }
        
        // Convert the image
        const conversionResult = await convertToWebP(imageUrl, options);
        
        if (isMounted) {
          setResult(conversionResult);
        }
      } catch (error) {
        if (isMounted) {
          setResult({
            webpUrl: imageUrl,
            originalUrl: imageUrl,
            isConverting: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    };
    
    convert();
    
    return () => {
      isMounted = false;
    };
  }, [imageUrl, options.quality, options.width, options.height, options.generatePlaceholder]);
  
  return result;
};

/**
 * Preloads and converts multiple images to WebP format
 * @param imageUrls - Array of image URLs to preload and convert
 * @param options - Conversion options
 * @returns Promise that resolves when all images are processed
 */
export const preloadWebPImages = async (
  imageUrls: string[],
  options: ConversionOptions = {}
): Promise<Map<string, ConversionResult>> => {
  const results = new Map<string, ConversionResult>();
  
  // Process images in batches to avoid overwhelming the browser
  const batchSize = 3;
  const batches = Math.ceil(imageUrls.length / batchSize);
  
  for (let i = 0; i < batches; i++) {
    const batchStart = i * batchSize;
    const batchEnd = Math.min(batchStart + batchSize, imageUrls.length);
    const batchUrls = imageUrls.slice(batchStart, batchEnd);
    
    // Process batch in parallel
    const batchResults = await Promise.all(
      batchUrls.map(url => convertToWebP(url, options))
    );
    
    // Store results
    batchUrls.forEach((url, index) => {
      results.set(url, batchResults[index]);
    });
  }
  
  return results;
};

/**
 * Gets the appropriate image URL based on browser support
 * @param originalUrl - Original image URL
 * @param webpUrl - WebP version URL
 * @returns The most appropriate URL based on browser support
 */
export const getOptimalImageUrl = async (originalUrl: string, webpUrl?: string): Promise<string> => {
  if (!webpUrl) return originalUrl;
  
  try {
    const isWebPSupported = await checkWebPSupport();
    return isWebPSupported ? webpUrl : originalUrl;
  } catch {
    return originalUrl; // Fallback to original on error
  }
};