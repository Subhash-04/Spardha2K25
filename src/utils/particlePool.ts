/**
 * Particle Pool System
 * Implements object pooling for particles to reduce memory allocation and improve performance
 */

import React from 'react';

interface ParticleConfig {
  type: 'star' | 'orb' | 'shooting' | 'nebula' | 'constellation';
  size: number;
  color: string;
  position: { x: number; y: number };
  animation: any;
  style?: React.CSSProperties;
}

interface PoolStats {
  totalCreated: number;
  activeParticles: number;
  pooledParticles: number;
  reuseRate: number;
}

class ParticlePool {
  private static instance: ParticlePool;
  private pools: Map<string, ParticleConfig[]> = new Map();
  private activeParticles: Set<ParticleConfig> = new Set();
  private totalCreated = 0;
  private totalReused = 0;
  private readonly MAX_POOL_SIZE = 1000;
  private readonly POOL_TYPES = ['star', 'orb', 'shooting', 'nebula', 'constellation'];

  private constructor() {
    this.initializePools();
  }

  public static getInstance(): ParticlePool {
    if (!ParticlePool.instance) {
      ParticlePool.instance = new ParticlePool();
    }
    return ParticlePool.instance;
  }

  /**
   * Get a particle from the pool or create a new one
   */
  public getParticle(config: Partial<ParticleConfig>): ParticleConfig {
    const type = config.type || 'star';
    const pool = this.pools.get(type) || [];
    
    let particle: ParticleConfig;
    
    if (pool.length > 0) {
      particle = pool.pop()!;
      this.totalReused++;
      // Update particle with new config
      Object.assign(particle, config);
    } else {
      particle = this.createParticle(config);
      this.totalCreated++;
    }
    
    this.activeParticles.add(particle);
    return particle;
  }

  /**
   * Return a particle to the pool
   */
  public returnParticle(particle: ParticleConfig): void {
    if (!this.activeParticles.has(particle)) {
      return;
    }
    
    this.activeParticles.delete(particle);
    const pool = this.pools.get(particle.type) || [];
    
    if (pool.length < this.MAX_POOL_SIZE / this.POOL_TYPES.length) {
      // Reset particle to default state
      this.resetParticle(particle);
      pool.push(particle);
      this.pools.set(particle.type, pool);
    }
  }

  /**
   * Create optimized star particles in batch
   */
  public createStarBatch(count: number, containerBounds: { width: number; height: number }): ParticleConfig[] {
    const particles: ParticleConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const colors = ['bg-blue-400', 'bg-cyan-400', 'bg-blue-300'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const glowIntensity = Math.random() * 0.8 + 0.2;
      
      const particle = this.getParticle({
        type: 'star',
        size,
        color,
        position: {
          x: Math.random() * containerBounds.width,
          y: Math.random() * containerBounds.height
        },
        style: {
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: `0 0 ${size * 3}px rgba(59, 130, 246, ${glowIntensity}), 0 0 ${size * 6}px rgba(59, 130, 246, ${glowIntensity * 0.5})`
        },
        animation: {
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
          transition: {
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }
        }
      });
      
      particles.push(particle);
    }
    
    return particles;
  }

  /**
   * Create optimized orb particles in batch
   */
  public createOrbBatch(count: number, containerBounds: { width: number; height: number }): ParticleConfig[] {
    const particles: ParticleConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 4;
      const colors = ['rgba(59, 130, 246, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0.6)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const particle = this.getParticle({
        type: 'orb',
        size,
        color,
        position: {
          x: Math.random() * containerBounds.width,
          y: Math.random() * containerBounds.height
        },
        style: {
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`
        },
        animation: {
          y: [0, -40, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.3, 1],
          transition: {
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }
        }
      });
      
      particles.push(particle);
    }
    
    return particles;
  }

  /**
   * Create optimized shooting star particles in batch
   */
  public createShootingBatch(count: number, containerBounds: { width: number; height: number }): ParticleConfig[] {
    const particles: ParticleConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const trailLength = Math.random() * 200 + 100;
      
      const particle = this.getParticle({
        type: 'shooting',
        size: 1,
        color: 'bg-blue-300',
        position: {
          x: Math.random() * containerBounds.width,
          y: Math.random() * (containerBounds.height * 0.5)
        },
        style: {
          width: '1px',
          height: '1px',
          boxShadow: '0 0 6px rgba(147, 197, 253, 0.8), 0 0 12px rgba(147, 197, 253, 0.4)'
        },
        animation: {
          x: [0, trailLength],
          y: [0, trailLength * 0.5],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          transition: {
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.5 + Math.random() * 3,
            ease: "easeOut"
          }
        }
      });
      
      particles.push(particle);
    }
    
    return particles;
  }

  /**
   * Get pool statistics
   */
  public getStats(): PoolStats {
    const totalPooled = Array.from(this.pools.values()).reduce((sum, pool) => sum + pool.length, 0);
    const totalRequests = this.totalCreated + this.totalReused;
    
    return {
      totalCreated: this.totalCreated,
      activeParticles: this.activeParticles.size,
      pooledParticles: totalPooled,
      reuseRate: totalRequests > 0 ? this.totalReused / totalRequests : 0
    };
  }

  /**
   * Clear all pools and reset statistics
   */
  public clearPools(): void {
    this.pools.clear();
    this.activeParticles.clear();
    this.totalCreated = 0;
    this.totalReused = 0;
    this.initializePools();
  }

  /**
   * Optimize pools by removing excess particles
   */
  public optimizePools(): void {
    const targetSize = Math.floor(this.MAX_POOL_SIZE / this.POOL_TYPES.length / 2);
    
    this.pools.forEach((pool, type) => {
      if (pool.length > targetSize) {
        pool.splice(targetSize);
        this.pools.set(type, pool);
      }
    });
  }

  private initializePools(): void {
    this.POOL_TYPES.forEach(type => {
      this.pools.set(type, []);
    });
  }

  private createParticle(config: Partial<ParticleConfig>): ParticleConfig {
    return {
      type: config.type || 'star',
      size: config.size || 1,
      color: config.color || 'bg-blue-400',
      position: config.position || { x: 0, y: 0 },
      animation: config.animation || {},
      style: config.style || {}
    };
  }

  private resetParticle(particle: ParticleConfig): void {
    // Reset to default values to prevent memory leaks
    particle.position = { x: 0, y: 0 };
    particle.animation = {};
    particle.style = {};
  }
}

// Performance monitoring hook
export const useParticlePerformance = () => {
  const [stats, setStats] = React.useState<PoolStats>({
    totalCreated: 0,
    activeParticles: 0,
    pooledParticles: 0,
    reuseRate: 0
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const pool = ParticlePool.getInstance();
      setStats(pool.getStats());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return stats;
};

export default ParticlePool;
export { ParticlePool };