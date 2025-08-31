import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Events from '../components/sections/Events';

interface EventsPageProps {}

const EventsPage: React.FC<EventsPageProps> = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="bg-orb-blue" style={{ top: '10%', right: '20%' }} />
        <div className="bg-orb-cyan" style={{ bottom: '20%', left: '10%' }} />
        <div className="bg-orb-purple" style={{ top: '50%', right: '60%' }} />
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Page Header */}
        <motion.section 
          className="pt-32 pb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient font-audiowide">
                SPARDHA EVENTS
              </motion.h1>
            </motion.div>
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover all the exciting events, competitions, and workshops happening at Spardha 2025. 
              From technical challenges to creative showcases, there's something for everyone.
            </motion.p>
          </div>
        </motion.section>
        
        {/* Events Section */}
        <Events />
      </main>
      
      <Footer />
      
      {/* Space Particles - Stars */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-cyan-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;
        
        return (
          <motion.div
            key={`events-page-star-${i}`}
            className={`fixed ${blueShade} rounded-full pointer-events-none`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${size * 2}px rgba(59, 130, 246, ${glowIntensity})`,
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
      {[...Array(8)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(59, 130, 246, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(147, 197, 253, 0.3)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`events-page-orb-${i}`}
            className="fixed rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            animate={{
              y: [0, -25, 0],
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
    </div>
  );
};

export default EventsPage;