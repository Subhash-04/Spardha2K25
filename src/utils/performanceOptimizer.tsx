/**
 * Performance Optimizer
 * Combines media caching and particle pooling for optimal website performance
 */

import React, { useEffect, useCallback, useRef } from 'react';
import MediaCache from './mediaCache';
import ParticlePool from './particlePool';

interface PerformanceConfig {
  enableMediaCache: boolean;
  enableParticlePooling: boolean;
  maxParticlesPerSection: number;
  particleUpdateInterval: number;
  mediaPreloadList: string[];
}

interface PerformanceMetrics {
  mediaCache: {
    hitRate: number;
    totalSize: number;
    itemCount: number;
  };
  particlePool: {
    reuseRate: number;
    activeParticles: number;
    pooledParticles: number;
  };
  frameRate: number;
  memoryUsage: number;
}

const DEFAULT_CONFIG: PerformanceConfig = {
  enableMediaCache: true,
  enableParticlePooling: true,
  maxParticlesPerSection: 500,
  particleUpdateInterval: 16, // 60fps
  mediaPreloadList: []
};

class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private mediaCache: MediaCache;
  private particlePool: ParticlePool;
  private config: PerformanceConfig;
  private frameCount = 0;
  private lastFrameTime = 0;
  private frameRate = 60;
  private performanceObserver?: PerformanceObserver;

  private constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.mediaCache = MediaCache.getInstance();
    this.particlePool = ParticlePool.getInstance();
    this.initializePerformanceMonitoring();
  }

  public static getInstance(config?: Partial<PerformanceConfig>): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer(config);
    }
    return PerformanceOptimizer.instance;
  }

  /**
   * Preload media assets for better performance
   */
  public async preloadAssets(urls: string[]): Promise<void> {
    if (!this.config.enableMediaCache) return;

    const preloadPromises = urls.map(async (url) => {
      try {
        await this.mediaCache.preloadMedia(url);
      } catch (error) {
        console.warn(`Failed to preload ${url}:`, error);
      }
    });

    await Promise.allSettled(preloadPromises);
  }

  /**
   * Get optimized media URL (from cache if available)
   */
  public getOptimizedMediaUrl(url: string): string {
    if (!this.config.enableMediaCache) return url;
    return this.mediaCache.getCachedMedia(url) || url;
  }

  /**
   * Create optimized particle system
   */
  public createOptimizedParticles(
    type: 'star' | 'orb' | 'shooting' | 'nebula',
    count: number,
    containerBounds: { width: number; height: number }
  ) {
    if (!this.config.enableParticlePooling) {
      return this.createFallbackParticles(type, count, containerBounds);
    }

    // Limit particle count based on performance
    const optimizedCount = Math.min(count, this.config.maxParticlesPerSection);
    
    switch (type) {
      case 'star':
        return this.particlePool.createStarBatch(optimizedCount, containerBounds);
      case 'orb':
        return this.particlePool.createOrbBatch(optimizedCount, containerBounds);
      case 'shooting':
        return this.particlePool.createShootingBatch(optimizedCount, containerBounds);
      default:
        return [];
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    const mediaCacheStats = this.mediaCache.getStats();
    const particlePoolStats = this.particlePool.getStats();
    
    return {
      mediaCache: {
        hitRate: mediaCacheStats.hitRate,
        totalSize: mediaCacheStats.totalSize,
        itemCount: mediaCacheStats.itemCount
      },
      particlePool: {
        reuseRate: particlePoolStats.reuseRate,
        activeParticles: particlePoolStats.activeParticles,
        pooledParticles: particlePoolStats.pooledParticles
      },
      frameRate: this.frameRate,
      memoryUsage: this.getMemoryUsage()
    };
  }

  /**
   * Optimize performance based on current metrics
   */
  public optimizePerformance(): void {
    const metrics = this.getMetrics();
    
    // If frame rate is low, reduce particle counts
    if (metrics.frameRate < 30) {
      this.config.maxParticlesPerSection = Math.max(
        this.config.maxParticlesPerSection * 0.8,
        100
      );
      console.warn('Performance degraded, reducing particle count');
    }
    
    // If memory usage is high, clear caches
    if (metrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
      this.mediaCache.clearCache();
      this.particlePool.optimizePools();
      console.warn('High memory usage detected, clearing caches');
    }
    
    // Optimize particle pools periodically
    this.particlePool.optimizePools();
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }

  private initializePerformanceMonitoring(): void {
    // Monitor frame rate
    const updateFrameRate = () => {
      const now = performance.now();
      this.frameCount++;
      
      if (now - this.lastFrameTime >= 1000) {
        this.frameRate = this.frameCount;
        this.frameCount = 0;
        this.lastFrameTime = now;
      }
      
      requestAnimationFrame(updateFrameRate);
    };
    
    requestAnimationFrame(updateFrameRate);

    // Monitor performance entries
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure' && entry.duration > 16) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      this.performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }

  private createFallbackParticles(type: string, count: number, containerBounds: any) {
    // Fallback implementation for when pooling is disabled
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i}`,
      type,
      position: {
        x: Math.random() * containerBounds.width,
        y: Math.random() * containerBounds.height
      }
    }));
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }
}

/**
 * React hook for performance optimization
 */
export const usePerformanceOptimizer = (config?: Partial<PerformanceConfig>) => {
  const optimizerRef = useRef<PerformanceOptimizer>();
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
    mediaCache: { hitRate: 0, totalSize: 0, itemCount: 0 },
    particlePool: { reuseRate: 0, activeParticles: 0, pooledParticles: 0 },
    frameRate: 60,
    memoryUsage: 0
  });

  useEffect(() => {
    optimizerRef.current = PerformanceOptimizer.getInstance(config);
    
    // Preload assets if provided
    if (config?.mediaPreloadList?.length) {
      optimizerRef.current.preloadAssets(config.mediaPreloadList);
    }

    // Update metrics periodically
    const interval = setInterval(() => {
      if (optimizerRef.current) {
        setMetrics(optimizerRef.current.getMetrics());
        optimizerRef.current.optimizePerformance();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (optimizerRef.current) {
        optimizerRef.current.cleanup();
      }
    };
  }, [config]);

  const preloadAssets = useCallback(async (urls: string[]) => {
    if (optimizerRef.current) {
      await optimizerRef.current.preloadAssets(urls);
    }
  }, []);

  const getOptimizedMediaUrl = useCallback((url: string) => {
    return optimizerRef.current?.getOptimizedMediaUrl(url) || url;
  }, []);

  const createOptimizedParticles = useCallback((
    type: 'star' | 'orb' | 'shooting' | 'nebula',
    count: number,
    containerBounds: { width: number; height: number }
  ) => {
    return optimizerRef.current?.createOptimizedParticles(type, count, containerBounds) || [];
  }, []);

  return {
    metrics,
    preloadAssets,
    getOptimizedMediaUrl,
    createOptimizedParticles
  };
};

/**
 * Performance monitoring component
 */
export const PerformanceMonitor: React.FC<{ showMetrics?: boolean }> = ({ showMetrics = false }) => {
  const { metrics } = usePerformanceOptimizer();

  if (!showMetrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="space-y-1">
        <div>FPS: {metrics.frameRate}</div>
        <div>Cache Hit Rate: {(metrics.mediaCache.hitRate * 100).toFixed(1)}%</div>
        <div>Active Particles: {metrics.particlePool.activeParticles}</div>
        <div>Pool Reuse Rate: {(metrics.particlePool.reuseRate * 100).toFixed(1)}%</div>
        <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
      </div>
    </div>
  );
};

export default PerformanceOptimizer;
export { PerformanceOptimizer };