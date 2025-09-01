import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import LazyImage from '../ui/LazyImage';
import mainPoster from '../../assets/images/main.png';
import mainVideo from '../../assets/videos/promo.mp4'; // Updated to use promo video

const MainMedia: React.FC = () => {
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

  return (
    <section id="media" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <section className="absolute inset-0">
        <span className="bg-orb-cyan" style={{ top: '30%', right: '20%' }} />
        <span className="bg-orb-purple" style={{ bottom: '10%', left: '10%' }} />
      </section>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.header
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient font-audiowide mb-6"
          >
            SPARDHA 2K25
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Explore the visual showcase of our tech fest through posters and videos.
            Immerse yourself in the futuristic aesthetic.
          </motion.p>
        </motion.header>

        <section className="flex flex-col gap-12">
          {/* Main Poster - Full Width */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.figure variants={itemVariants}>
              <MagicCard
                className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto"
                glowColor="0, 200, 255"
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={true}
                particleCount={15}
              >
                <figure className="crystal-glass p-4 rounded-2xl relative">
                  <section className="absolute inset-0">
                    <span className="crystal-facet-top opacity-20" />
                    <span className="crystal-rotate-12s opacity-10" />
                  </section>
                  
                  <figure className="relative z-10 rounded-xl overflow-hidden">
                    <LazyImage 
                      src={mainPoster} 
                      alt="Spardha 2025 Main Poster" 
                      className="w-full object-contain max-h-[600px]"
                    />
                    
                    <span className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </span>
                  </figure>
                </figure>
              </MagicCard>
            </motion.figure>
          </motion.section>

          {/* Register Now Button Section */}
          <motion.section
            id="register-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center"
          >
            <motion.div variants={itemVariants}>
              <MagicCard
                className="relative rounded-2xl overflow-hidden"
                glowColor="0, 200, 255"
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={8}
              >
                <button 
                  data-register-button
                  onClick={() => window.open('https://acm.vvitguntur.com/contact-us/register', '_blank')}
                className="crystal-glass p-6 rounded-2xl relative group transition-all duration-300 backdrop-blur-sm animate-pulse-zoom hover:animate-none hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/20 hover:border-white/40">
                  <div className="absolute inset-0">
                    <span className="crystal-facet-top opacity-20" />
                    <span className="crystal-rotate-12s opacity-10" />
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl font-bold text-gradient font-audiowide tracking-wider">
                      REGISTER NOW
                    </span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </button>
              </MagicCard>
            </motion.div>
          </motion.section>

          {/* Registration Message */}
          <motion.div
            className="text-center mt-4 mb-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-sm text-muted-foreground font-inter opacity-75">
              Click here for registration
            </p>
          </motion.div>

          {/* Experience Spardha 2K25 Section */}
          <motion.section
            id="main-video-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-gradient font-audiowide mb-6 text-center"
            >
              EXPERIENCE SPARDHA 2K25
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed mb-8 text-center"
            >
              Immerse yourself in the futuristic world of technology and innovation through our official teaser video.
            </motion.p>
            <motion.figure variants={itemVariants}>
              <MagicCard
                className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto"
                glowColor="0, 200, 255"
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={true}
                particleCount={15}
              >
                <figure className="ultra-liquid-glass p-4 rounded-2xl relative aspect-[4/3]">
                  <section className="absolute inset-0">
                    <span className="crystal-facet-center opacity-20" />
                    <span className="crystal-rotate-8s opacity-10" />
                  </section>
                  
                  <figure className="relative z-10 rounded-xl overflow-hidden h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                    <video 
                      className="w-full h-full object-cover absolute inset-0"
                      poster={mainPoster}
                      controls
                      autoPlay
                      muted
                      loop
                    >
                      <source src={mainVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <span className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                    <figcaption className="hidden md:block absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                      <h3 className="text-2xl font-bold text-white font-audiowide mb-2">
                        Teaser Video
                      </h3>
                      <p className="text-sm text-white/80 font-inter max-w-md">
                        Watch the official promotional video for Spardha 2025
                      </p>
                    </figcaption>
                    
                    {/* Instagram Audio Experience Button */}
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
                      <button 
                        onClick={() => window.open('https://www.instagram.com/acm_vvitu/reel/DNpwTYWy_1_/', '_blank')}
                        className="crystal-glass p-2 md:p-3 rounded-full relative group transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/20 hover:border-white/40"
                      >
                        <div className="absolute inset-0">
                          <span className="crystal-facet-top opacity-20" />
                          <span className="crystal-rotate-12s opacity-10" />
                        </div>
                        
                        <div className="relative z-10 flex items-center gap-1 md:gap-2">
                          <span className="text-sm md:text-lg">🎵</span>
                          <span className="text-xs md:text-sm font-semibold text-white font-inter">
                            Audio on Insta
                          </span>
                        </div>
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                      </button>
                    </div>
                  </figure>
                </figure>
              </MagicCard>
            </motion.figure>
          </motion.section>
        </section>
      </article>

      {/* Space Particles - Stars (Optimized) */}
      {[...Array(70)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-purple-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;
        
        return (
          <motion.div
            key={`media-star-${i}`}
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

      {/* Floating Orbs (Optimized) */}
      {[...Array(24)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(147, 51, 234, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(6, 182, 212, 0.5)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`media-orb-${i}`}
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
              y: [0, -20, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
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

      {/* Shooting Stars (Optimized) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`media-shooting-${i}`}
          className="absolute w-1 h-1 bg-purple-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 4px rgba(147, 51, 234, 0.8)',
          }}
          animate={{
            x: [0, 100],
            y: [0, 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  );
};

export default MainMedia;

