import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import MagicCard from '../ui/MagicCard';

// Import main video
import mainVideo from '../../assets/videos/main.mp4'; // Temporarily disabled for optimization

const Experience: React.FC = () => {
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
            <motion.p className="text-2xl sm:text-3xl md:text-4xl font-bold text-holographic font-audiowide">
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
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  muted={false}
                  controlsList="nodownload"
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

        {/* Feature Highlights */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              title: "Immersive Tech",
              description: "Experience cutting-edge technology and innovation",
              color: "text-primary",
              gradient: "from-blue-400 to-blue-600"
            },
            {
              title: "Cultural Fusion",
              description: "Where technology meets art and creativity",
              color: "text-purple-400",
              gradient: "from-purple-400 to-purple-600"
            },
            {
              title: "Future Vision",
              description: "Step into the Tech world of tomorrow",
              color: "text-accent",
              gradient: "from-cyan-400 to-cyan-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
            >
              <MagicCard
                className="h-full"
                glowColor="0, 200, 255"
                enableTilt={false}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={8}
              >
                <div className="crystal-glass p-6 rounded-2xl h-full relative overflow-hidden group hover:bg-white/5 transition-all duration-300">
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <h3 className={`text-xl font-bold ${feature.color} font-audiowide mb-3`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-inter leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Crystal effects */}
                  <div className="crystal-facet-corner opacity-20" />
                  <div className="scan-line-top" />
                </div>
              </MagicCard>
            </motion.div>
          ))}
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
                  className="neu-button px-8 py-3 rounded-xl text-lg font-semibold text-primary font-orbitron"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.button>
                <motion.button
                  className="crystal-glass px-8 py-3 rounded-xl text-lg font-semibold text-foreground border border-accent/30 font-orbitron"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
      {[...Array(240)].map((_, i) => {
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
      {[...Array(80)].map((_, i) => {
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
      {[...Array(32)].map((_, i) => (
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
      {[...Array(48)].map((_, i) => (
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
};

export default Experience;
