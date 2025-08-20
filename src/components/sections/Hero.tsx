import React, { useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import { usePerformanceOptimizer } from '../../utils/performanceOptimizer';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { preloadAssets } = usePerformanceOptimizer({
    enableMediaCache: true,
    enableParticlePooling: true,
    maxParticlesPerSection: 400,
    particleUpdateInterval: 32
  });

  // Memoize particle configurations to prevent recreation on every render
  const particleConfigs = useMemo(() => {
    const stars = Array.from({ length: 100 }, (_, i) => ({
      id: `star-${i}`,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 3
    }));
    
    const orbs = Array.from({ length: 30 }, (_, i) => ({
      id: `orb-${i}`,
      size: Math.random() * 4 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['rgba(59, 130, 246, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(147, 197, 253, 0.6)'][Math.floor(Math.random() * 3)],
      animationDelay: Math.random() * 2
    }));
    
    const shootingStars = Array.from({ length: 10 }, (_, i) => ({
      id: `shooting-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 50,
      trailLength: Math.random() * 150 + 80,
      animationDelay: i * 0.8 + Math.random() * 4
    }));
    
    return { stars, orbs, shootingStars };
  }, []);

  // Preload any media assets
  useEffect(() => {
    const mediaAssets: string[] = [
      // Add any image/video URLs that need preloading
    ];
    if (mediaAssets.length > 0) {
      preloadAssets(mediaAssets);
    }
  }, [preloadAssets]);

  // Performance monitoring and optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.animationPlayState = 'running';
          } else {
            element.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all particle elements
    const particles = sectionRef.current?.querySelectorAll('[data-particle]');
    particles?.forEach((particle) => observer.observe(particle));

    return () => observer.disconnect();
  }, []);

  // Throttle animations based on device performance
  const shouldReduceMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // CSS animation classes will be used instead of Framer Motion variants

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Space Universe Background Effects */}
      <div className="absolute inset-0">
        {/* Large cosmic orbs */}
        <div className="bg-orb-cyan animate-float-3d opacity-40" />
        <div className="bg-orb-blue animate-float-3d opacity-50" style={{ animationDelay: '2s' }} />
        <div className="bg-orb-purple animate-float-3d opacity-30" style={{ animationDelay: '4s' }} />
        
        {/* Optimized Background Particles Layer - Static positions for performance */}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={`bg-particle-${i}`}
            className="absolute bg-blue-200 rounded-full hero-bg-particle"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.2) % 4}s`
            }}
          />
        ))}        
        
        {/* Slow moving background orbs - fewer for performance */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`bg-orb-${i}`}
            className="absolute rounded-full hero-bg-orb"
            style={{
              width: `${25 + (i * 8)}px`,
              height: `${25 + (i * 8)}px`,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`,
              filter: 'blur(8px)',
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
        
        {/* Additional space atmosphere */}
        <div 
          className="absolute top-10 right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'float-3d 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'float-3d 15s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Optimized Space Universe Particles - Stars */}
      {particleConfigs.stars.map((star) => (
        <div
          key={star.id}
          data-particle
          className="absolute bg-blue-400 rounded-full animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(59, 130, 246, 0.8)`,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: shouldReduceMotion ? '0s' : '3s'
          }}
        />
      ))}

      {/* Optimized Floating Space Particles - Larger glowing orbs */}
      {particleConfigs.orbs.map((orb) => (
        <div
          key={orb.id}
          data-particle
          className="absolute rounded-full animate-float-slow"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${orb.size * 2}px ${orb.color}`,
            animationDelay: `${orb.animationDelay}s`,
            animationDuration: shouldReduceMotion ? '0s' : '5s'
          }}
        />
      ))}

      {/* Optimized Shooting Stars */}
      {particleConfigs.shootingStars.map((star) => (
        <div
          key={star.id}
          data-particle
          className="absolute w-1 h-1 bg-blue-300 rounded-full animate-shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: '0 0 4px rgba(147, 197, 253, 0.8)',
            '--trail-length': `${star.trailLength}px`,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: shouldReduceMotion ? '0s' : '2s'
          } as React.CSSProperties}
        />
      ))}

      {/* Optimized Nebula-like Background Particles */}
      {Array.from({ length: 30 }, (_, i) => {
        const size = Math.random() * 80 + 40;
        return (
          <div
            key={`nebula-${i}`}
            data-particle
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`,
              filter: 'blur(15px)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: shouldReduceMotion ? '0s' : '4s'
            }}
          />
        );
      })}

      {/* Constellation Lines */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`constellation-${i}`}
          className="absolute pointer-events-none animate-constellation"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: '1px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
        {/* Main Title */}
        <div className="mb-8 animate-fade-in-up animation-delay-200">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gradient animate-glow-pulse font-audiowide">
            SPARDHA
          </h1>
          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-2 sm:mt-4 font-audiowide animate-text-glow">
            2025
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-8 space-y-2 animate-fade-in-up animation-delay-400">
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-light font-inter">
            The Annual Techno Fest of Vasireddy Venkatadri International Technological University
          </p>
          <p className="text-base sm:text-xl md:text-2xl text-primary font-medium font-orbitron">
            Presented by ACM VVITU Student Chapter
          </p>
        </div>

        {/* Event Details */}
        <div className="mb-12 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-base sm:text-lg">
            <MagicCard
              className="card--border-glow"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={6}
              disableStars={false}
            >
              <div className="flex items-center gap-3 crystal-glass px-6 py-3 rounded-full hero-card-fix">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-foreground font-orbitron">August 22-23, 2025</span>
              </div>
            </MagicCard>
            
            <MagicCard
              className="card--border-glow"
              glowColor="0, 200, 255" 
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={6}
              disableStars={false}
            >
              <div className="flex items-center gap-3 crystal-glass px-6 py-3 rounded-full hero-card-fix">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-foreground font-orbitron">VVITU Campus, Nambur, Guntur</span>
              </div>
            </MagicCard>
            
            <MagicCard
              className="card--border-glow"
              glowColor="0, 255, 100"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={6}
              disableStars={false}
            >
              <div className="flex items-center gap-3 crystal-glass px-6 py-3 rounded-full hero-card-fix">
                <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-foreground font-orbitron">FREE Registration</span>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-8 animate-bounce-slow">
          <span className="text-xs text-muted-foreground font-orbitron">SCROLL TO EXPLORE</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="text-xs text-primary font-orbitron transform -rotate-90 whitespace-nowrap">
            TECH FEST
          </div>
          <div className="w-px h-16 bg-gradient-to-t from-transparent via-accent to-transparent" />
        </div>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent" />
          <div className="text-xs text-accent font-orbitron transform rotate-90 whitespace-nowrap">
            VVITU CAMPUS, NAMBUR, GUNTUR
          </div>
          <div className="w-px h-16 bg-gradient-to-t from-transparent via-primary to-transparent" />
        </div>
      </div>

      {/* Additional Particle Effects */}
      {/* Shooting Stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-shooting-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 6px rgba(6, 182, 212, 0.8), 0 0 12px rgba(6, 182, 212, 0.4)',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Cosmic Dust Particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={`cosmic-dust-${i}`}
          className="absolute bg-blue-200 rounded-full animate-cosmic-drift"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.4,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Nebula Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full animate-nebula-glow"
          style={{
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(${Math.random() > 0.5 ? '147, 197, 253' : '59, 130, 246'}, 0.6) 0%, transparent 70%)`,
            filter: 'blur(2px)',
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      ))}

      {/* Energy Pulses */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`energy-pulse-${i}`}
          className="absolute rounded-full animate-energy-pulse"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            border: '1px solid rgba(0, 200, 255, 0.3)',
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Scan Lines */}
      <div className="scan-line-top" />
      <div className="scan-line-bottom" />
      

    </section>
  );
};

export default Hero;
