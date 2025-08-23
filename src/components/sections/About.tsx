import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Zap } from 'lucide-react';
import MagicCard from '../ui/MagicCard';

const About: React.FC = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      transition: { duration: 0.3 },
    },
  };

  const stats = [
    { icon: Users, value: "5000+", label: "Participants", color: "text-primary" },
    { icon: Trophy, value: "4", label: "Events", color: "text-accent" },
    { icon: Calendar, value: "2", label: "Days", color: "text-primary" },
    { icon: Zap, value: "∞", label: "Energy", color: "text-accent" },
  ];

  const features = [
    {
      title: "Problem Solving Mastery",
      description: "Develop algorithmic thinking and coding expertise through CodeVerse challenges",
      gradient: "from-white to-gray-200",
    },
    {
      title: "Team Collaboration",
      description: "Master synchronized teamwork and communication skills via Blind Sync",
      gradient: "from-white to-gray-200",
    },
    {
      title: "Research & Presentation",
      description: "Build technical research and presentation abilities with Tech Thesis",
      gradient: "from-white to-gray-200",
    },
    {
      title: "AI Innovation Skills",
      description: "Learn prompt engineering and AI interaction through Prompt Realm",
      gradient: "from-white to-gray-200",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-cyan animate-float-3d" style={{ top: '10%', left: '80%', animationDelay: '2s' }} />
        <div className="bg-orb-blue animate-float-3d" style={{ bottom: '20%', left: '10%', animationDelay: '4s' }} />
        
        {/* Additional floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`about-particle-${i}`}
            className="absolute bg-white rounded-full animate-float opacity-10"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
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
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient font-audiowide">
              ABOUT SPARDHA
            </motion.h2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Spardha 2025 at VVIT University - A journey through the multiverse of technology and imagination, where
            every idea shapes a new reality. Step into a dimension where innovation meets infinite possibilities
            and creativity knows no bounds.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
            >
              <MagicCard
                className="crystal-glass p-6 rounded-2xl text-center relative card-3d"
                glowColor="255, 255, 255"
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={8}
              >
                {/* Background Effects */}
                <div className="crystal-facet-top" />
                <div className="crystal-facet-corner" />
                <div className="crystal-rotate-8s" />
                
                <div className="relative z-10">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} style={stat.color === 'text-white' ? { filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' } : {}} />
                  <div className={`text-3xl sm:text-4xl font-bold ${stat.color} font-orbitron mb-3`} style={stat.color === 'text-white' ? { textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)' } : {}}>
                    {stat.value}
                  </div>
                  <div className="text-base text-muted-foreground font-inter">{stat.label}</div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
            >
              <MagicCard
                className="ultra-liquid-glass p-8 rounded-3xl relative card-3d"
                glowColor="255, 255, 255"
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={12}
              >
                {/* Background Effects */}
                <div className="absolute inset-0">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} opacity-20 rounded-full blur-3xl`} />
                  <div className="crystal-rotate-12s" />
                </div>

                {/* Scan Lines */}
                <div className="scan-line-top" />
                <div className="scan-line-bottom" />

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-300 font-audiowide mb-4" style={{ textShadow: '0 0 8px rgba(147, 51, 234, 0.4), 0 0 16px rgba(147, 51, 234, 0.2)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-inter leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Space Particles - Stars (Optimized) */}
      {[...Array(12)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-cyan-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;
        
        return (
          <motion.div
            key={`about-star-${i}`}
            className={`absolute ${blueShade} rounded-full`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${size * 2}px rgba(6, 182, 212, ${glowIntensity})`,
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

      {/* Floating Orbs */}
      {[...Array(60)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(6, 182, 212, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(147, 197, 253, 0.5)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`about-orb-${i}`}
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

      {/* Shooting Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`about-shooting-${i}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 4px rgba(6, 182, 212, 0.8)',
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
            delay: i * 3 + Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  );
};

export default About;
