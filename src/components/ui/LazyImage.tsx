import React, { useState, useRef, useEffect } from 'react';


import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  webpSrc?: string;
  srcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  generatePlaceholder?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  width,
  height,
  webpSrc,
  srcSet,
  webpSrcSet,
  sizes,
  priority,
  objectFit = 'cover',
  objectPosition = 'center',
  generatePlaceholder = true,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentRef = imgRef.current;
    
    if (currentRef) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: '50px', // Start loading 50px before the image comes into view
          threshold: 0.1
        }
      );
      
      observerRef.current.observe(currentRef);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Create style object for width and height if provided
  const sizeStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      ref={imgRef}
      style={sizeStyle}
    >
      {/* Placeholder */}
      <motion.img
        src={placeholder}
        alt="Loading..."
        className={`absolute inset-0 w-full h-full object-${objectFit} object-${objectPosition} transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ filter: 'blur(5px)' }}
      />
      
      {/* Actual Image */}
      {(isInView || priority) && (
        <>
          {webpSrc && (
            <motion.picture>
              {webpSrcSet && <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />}
              {srcSet && <source srcSet={srcSet} sizes={sizes} type={`image/${src.split('.').pop()}`} />}
              <motion.img
                src={webpSrc}
                alt={alt}
                className={`w-full h-full object-${objectFit} object-${objectPosition} transition-opacity duration-500 ${
                  isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleLoad}
                onError={handleError}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.picture>
          ) || (
            <motion.img
              src={src}
              alt={alt}
              srcSet={srcSet}
              sizes={sizes}
              className={`w-full h-full object-${objectFit} object-${objectPosition} transition-opacity duration-500 ${
                isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleLoad}
              onError={handleError}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
      
      {/* Loading Indicator */}
      {!isLoaded && !hasError && (isInView || priority) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;