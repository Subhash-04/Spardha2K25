# Performance Optimization System

This directory contains a comprehensive performance optimization system for the Spardha 2025 website, designed to handle heavy particle effects and media files efficiently.

## Components

### 1. MediaCache (`mediaCache.ts`)
Implements localStorage-based caching for images and videos to reduce network requests and improve loading times.

**Features:**
- Automatic cache size management (50MB limit)
- Cache expiration (7 days)
- LRU eviction policy
- Base64 encoding for storage
- Hit rate tracking

**Usage:**
```typescript
import MediaCache from './mediaCache';

const cache = MediaCache.getInstance();

// Preload and cache media
await cache.preloadMedia('path/to/image.jpg');

// Get cached media (returns base64 or null)
const cachedUrl = cache.getCachedMedia('path/to/image.jpg');
```

### 2. ParticlePool (`particlePool.ts`)
Implements object pooling for particle systems to reduce memory allocation and garbage collection.

**Features:**
- Object reuse to minimize memory allocation
- Batch creation for different particle types
- Automatic pool size management
- Performance statistics tracking
- Type-specific optimizations

**Usage:**
```typescript
import ParticlePool from './particlePool';

const pool = ParticlePool.getInstance();

// Create optimized particle batches
const stars = pool.createStarBatch(400, { width: 1920, height: 1080 });
const orbs = pool.createOrbBatch(125, { width: 1920, height: 1080 });
```

### 3. PerformanceOptimizer (`performanceOptimizer.tsx`)
Combines media caching and particle pooling with performance monitoring and automatic optimization.

**Features:**
- Unified performance management
- Automatic performance monitoring
- Dynamic optimization based on metrics
- React hooks for easy integration
- Performance metrics dashboard

**Usage:**
```typescript
import { usePerformanceOptimizer, PerformanceMonitor } from './performanceOptimizer';

const MyComponent = () => {
  const { metrics, createOptimizedParticles, preloadAssets } = usePerformanceOptimizer({
    enableMediaCache: true,
    enableParticlePooling: true,
    maxParticlesPerSection: 500
  });

  // Use optimized particles
  const particles = createOptimizedParticles('star', 400, { width: 1920, height: 1080 });

  return (
    <div>
      {/* Your component content */}
      <PerformanceMonitor showMetrics={true} />
    </div>
  );
};
```

## Integration Guide

### Step 1: Update Component Imports
```typescript
import { usePerformanceOptimizer, PerformanceMonitor } from '../utils/performanceOptimizer';
```

### Step 2: Initialize Performance Optimizer
```typescript
const { metrics, createOptimizedParticles, preloadAssets } = usePerformanceOptimizer({
  enableMediaCache: true,
  enableParticlePooling: true,
  maxParticlesPerSection: 500, // Adjust based on section needs
  particleUpdateInterval: 16   // 60fps
});
```

### Step 3: Preload Media Assets
```typescript
useEffect(() => {
  const mediaAssets = [
    '/path/to/background.jpg',
    '/path/to/video.mp4'
  ];
  preloadAssets(mediaAssets);
}, [preloadAssets]);
```

### Step 4: Replace Particle Arrays with Optimized System

**Before:**
```typescript
{[...Array(400)].map((_, i) => (
  <motion.div
    key={`star-${i}`}
    className="absolute bg-blue-400 rounded-full"
    // ... particle properties
  />
))}
```

**After:**
```typescript
{createOptimizedParticles('star', 400, { width: 1920, height: 1080 }).map((particle, i) => (
  <motion.div
    key={`star-${i}`}
    className={`absolute ${particle.color} rounded-full`}
    style={{
      left: `${particle.position.x}px`,
      top: `${particle.position.y}px`,
      ...particle.style
    }}
    animate={particle.animation}
  />
))}
```

### Step 5: Add Performance Monitor (Development Only)
```typescript
{process.env.NODE_ENV === 'development' && <PerformanceMonitor showMetrics={true} />}
```

## Performance Benefits

### Media Caching
- **Reduced Network Requests**: Assets are cached locally after first load
- **Faster Load Times**: Subsequent visits load instantly from cache
- **Bandwidth Savings**: Eliminates repeated downloads
- **Offline Support**: Cached assets work without internet

### Particle Pooling
- **Memory Efficiency**: Reuses objects instead of creating new ones
- **Reduced GC Pressure**: Minimizes garbage collection pauses
- **Better Frame Rates**: Consistent performance with high particle counts
- **Scalable Performance**: Automatically adjusts based on device capabilities

### Automatic Optimization
- **Dynamic Adjustment**: Reduces particle counts when performance drops
- **Memory Management**: Clears caches when memory usage is high
- **Performance Monitoring**: Real-time metrics for debugging
- **Graceful Degradation**: Maintains functionality on slower devices

## Configuration Options

```typescript
interface PerformanceConfig {
  enableMediaCache: boolean;        // Enable/disable media caching
  enableParticlePooling: boolean;   // Enable/disable particle pooling
  maxParticlesPerSection: number;   // Maximum particles per section
  particleUpdateInterval: number;   // Update interval in ms (16ms = 60fps)
  mediaPreloadList: string[];       // URLs to preload on initialization
}
```

## Monitoring and Debugging

The performance monitor displays real-time metrics:
- **FPS**: Current frame rate
- **Cache Hit Rate**: Percentage of media served from cache
- **Active Particles**: Currently rendered particles
- **Pool Reuse Rate**: Percentage of particles reused from pool
- **Memory Usage**: Current JavaScript heap size

## Best Practices

1. **Preload Critical Assets**: Add important images/videos to the preload list
2. **Adjust Particle Limits**: Set appropriate `maxParticlesPerSection` for each component
3. **Monitor Performance**: Use the performance monitor during development
4. **Test on Various Devices**: Ensure good performance across different hardware
5. **Progressive Enhancement**: Start with lower particle counts and increase based on performance

## Troubleshooting

### High Memory Usage
- Reduce `maxParticlesPerSection`
- Clear cache manually: `MediaCache.getInstance().clearCache()`
- Check for memory leaks in particle animations

### Low Frame Rate
- Reduce particle counts
- Increase `particleUpdateInterval`
- Disable non-essential animations

### Cache Issues
- Check localStorage availability
- Verify cache size limits
- Clear expired items manually

## Future Enhancements

- WebGL-based particle rendering for better performance
- Service Worker integration for advanced caching
- WebAssembly particle physics calculations
- Adaptive quality based on device capabilities
- Real-time performance analytics