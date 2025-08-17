/**
 * Media Cache Utility
 * Implements localStorage-based caching for images and videos to improve performance
 */

interface CacheItem {
  data: string;
  timestamp: number;
  size: number;
}

interface CacheStats {
  totalSize: number;
  itemCount: number;
  hitRate: number;
}

class MediaCache {
  private static instance: MediaCache;
  private readonly CACHE_PREFIX = 'spardha_media_';
  private readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  private readonly CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
  private hits = 0;
  private misses = 0;

  private constructor() {
    this.cleanExpiredItems();
  }

  public static getInstance(): MediaCache {
    if (!MediaCache.instance) {
      MediaCache.instance = new MediaCache();
    }
    return MediaCache.instance;
  }

  /**
   * Cache a media file (image/video) as base64
   */
  public async cacheMedia(url: string, file: File | Blob): Promise<void> {
    try {
      const base64 = await this.fileToBase64(file);
      const cacheKey = this.getCacheKey(url);
      const cacheItem: CacheItem = {
        data: base64,
        timestamp: Date.now(),
        size: base64.length
      };

      // Check if adding this item would exceed cache size
      if (this.getCurrentCacheSize() + cacheItem.size > this.MAX_CACHE_SIZE) {
        this.evictOldestItems(cacheItem.size);
      }

      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Failed to cache media:', error);
    }
  }

  /**
   * Retrieve cached media as blob URL
   */
  public getCachedMedia(url: string): string | null {
    try {
      const cacheKey = this.getCacheKey(url);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        this.misses++;
        return null;
      }

      const cacheItem: CacheItem = JSON.parse(cached);
      
      // Check if expired
      if (Date.now() - cacheItem.timestamp > this.CACHE_EXPIRY) {
        localStorage.removeItem(cacheKey);
        this.misses++;
        return null;
      }

      this.hits++;
      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to retrieve cached media:', error);
      this.misses++;
      return null;
    }
  }

  /**
   * Preload and cache media from URL
   */
  public async preloadMedia(url: string): Promise<string> {
    // Check cache first
    const cached = this.getCachedMedia(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await this.cacheMedia(url, blob);
      return this.getCachedMedia(url) || url;
    } catch (error) {
      console.warn('Failed to preload media:', error);
      return url;
    }
  }

  /**
   * Get cache statistics
   */
  public getStats(): CacheStats {
    const totalRequests = this.hits + this.misses;
    return {
      totalSize: this.getCurrentCacheSize(),
      itemCount: this.getCacheItemCount(),
      hitRate: totalRequests > 0 ? this.hits / totalRequests : 0
    };
  }

  /**
   * Clear all cached media
   */
  public clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    this.hits = 0;
    this.misses = 0;
  }

  private getCacheKey(url: string): string {
    return `${this.CACHE_PREFIX}${btoa(url)}`;
  }

  private async fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private getCurrentCacheSize(): number {
    let totalSize = 0;
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          totalSize += item.size || 0;
        } catch (error) {
          // Invalid item, remove it
          localStorage.removeItem(key);
        }
      }
    });
    
    return totalSize;
  }

  private getCacheItemCount(): number {
    return Object.keys(localStorage).filter(key => 
      key.startsWith(this.CACHE_PREFIX)
    ).length;
  }

  private evictOldestItems(requiredSpace: number): void {
    const items: Array<{ key: string; timestamp: number; size: number }> = [];
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          items.push({
            key,
            timestamp: item.timestamp || 0,
            size: item.size || 0
          });
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });

    // Sort by timestamp (oldest first)
    items.sort((a, b) => a.timestamp - b.timestamp);

    let freedSpace = 0;
    for (const item of items) {
      if (freedSpace >= requiredSpace) break;
      localStorage.removeItem(item.key);
      freedSpace += item.size;
    }
  }

  private cleanExpiredItems(): void {
    const now = Date.now();
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (now - item.timestamp > this.CACHE_EXPIRY) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  }
}

export default MediaCache;
export { MediaCache };