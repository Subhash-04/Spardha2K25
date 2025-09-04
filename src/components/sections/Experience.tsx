import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import MagicCard from '../ui/MagicCard';

// Import main video
import mainVideo from '../../assets/videos/main.mp4'; // Temporarily disabled for optimization

const Experience: React.FC = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  
  useEffect(() => {
    const handleVideoPlay = async () => {
      if (videoRef.current) {
        try {
          // Try to play with sound first
          await videoRef.current.play();
        } catch (error) {
          // If failed (likely due to autoplay policy), mute and try again
          console.log('Autoplay with sound failed, falling back to muted autoplay');
          videoRef.current.muted = true;
          try {
            await videoRef.current.play();
          } catch (mutedError) {
            console.log('Muted autoplay also failed:', mutedError);
          }
        }
      }
    };
    
    // Use intersection observer to play video when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            handleVideoPlay();
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-purple" style={{ top: '20%', left: '10%' }} />
        <div className="bg-orb-cyan" style={{ bottom: '30%', right: '15%' }} />
        <div className="bg-orb-blue" style={{ top: '60%', right: '70%' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient font-audiowide">
              EXPERIENCE
            </motion.h2>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <motion.p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-audiowide" style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)'}}>
              SPARDHA 2K25
            </motion.p>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Dive into the Tech universe of Spardha 2025. Witness the fusion of technology,
            creativity, and innovation in this immersive experience.
          </motion.p>
        </motion.div>

        {/* Main Video Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <MagicCard
            className="max-w-5xl mx-auto"
            glowColor="138, 43, 226"
            enableTilt={false}
            enableMagnetism={true}
            clickEffect={true}
            particleCount={25}
          >
            <div className="ultra-liquid-glass rounded-3xl overflow-hidden relative">
              {/* Video Container */}
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  loop
                  preload="metadata"
                  controlsList="nodownload"
                  playsInline
                >
                  <source src={mainVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Scan lines for video */}
              <div className="scan-line-top" />
              <div className="scan-line-bottom" />

              {/* Corner HUD elements */}
              <div className="hud-corner-top-right" />
              <div className="hud-corner-bottom-left" />
            </div>
          </MagicCard>
        </motion.div>



        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <MagicCard
            className="dashboard-glass p-8 rounded-3xl max-w-3xl mx-auto relative"
            glowColor="138, 43, 226"
            enableTilt={false}
            enableMagnetism={true}
            clickEffect={true}
            particleCount={15}
          >
            <div className="absolute inset-0">
              <div className="bg-orb-purple opacity-30" />
              <div className="crystal-facet-center" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-gradient font-audiowide mb-4">
                Ready to Join the Experience?
              </h3>
              <p className="text-muted-foreground font-inter mb-6 leading-relaxed">
                Don't just watch from the sidelines. Be part of the most immersive tech festival
                experience and create memories that will last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                <motion.button
                  className="crystal-glass px-8 py-3 rounded-xl text-lg font-semibold text-foreground border border-accent/30 font-orbitron"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const videoSection = document.querySelector('#main-video-section');
                    if (videoSection) {
                      videoSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Watch Full Video
                </motion.button>
              </div>
            </div>

            <div className="scan-line-top" />
            <div className="scan-line-bottom" />
          </MagicCard>
        </motion.div>
      </div>

      {/* Space Particles - Stars (Optimized) */}
      {[...Array(120)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-purple-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;

        return (
          <motion.div
            key={`exp-star-${i}`}
            className={`absolute ${blueShade} rounded-full`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${size * 2}px rgba(147, 51, 234, ${glowIntensity})`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 ${size * 2}px rgba(147, 51, 234, ${glowIntensity})`,
                `0 0 ${size * 4}px rgba(147, 51, 234, ${glowIntensity * 1.2})`,
                `0 0 ${size * 2}px rgba(147, 51, 234, ${glowIntensity})`
              ]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Floating Orbs */}
      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(147, 51, 234, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(168, 85, 247, 0.5)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={`exp-orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Shooting Stars */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`exp-shooting-${i}`}
          className="absolute w-1 h-1 bg-purple-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 4px rgba(168, 85, 247, 0.8)',
          }}
          animate={{
            x: [0, 150],
            y: [0, 75],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 2 + Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Nebula Particles */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={`exp-nebula-${i}`}
          className="absolute rounded-full opacity-15"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;
