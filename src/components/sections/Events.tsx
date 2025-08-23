import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, Wrench, Terminal, Users, Brain, FileText } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import LazyImage from '../ui/LazyImage';
import PixelTransition from '../ui/PixelTransition';
import blindPoster from '../../assets/images/blind.jpg';
import paperPoster from '../../assets/images/paper.jpg';
import traditionalPoster from '../../assets/images/Traditional.jpg';
import promptPoster from '../../assets/images/prompt.jpg';
import spotImage1 from '../../assets/images/1.png';
import spotImage2 from '../../assets/images/2.png';
import spotImage3 from '../../assets/images/3.png';
import spotImage4 from '../../assets/images/4.png';
import spotImage5 from '../../assets/images/5.png';
import spotImage6 from '../../assets/images/6.png';
import spotImage7 from '../../assets/images/7.png';
import spotImage8 from '../../assets/images/8.png';

// Lazy load CircularGallery for better performance
const CircularGallery = React.lazy(() => import('../ui/CircularGallery'));

const Events: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('day1');
  const [showAllSpotEvents, setShowAllSpotEvents] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const days = [
    { id: 'day1', label: 'Day 1', date: 'August 22' },
    { id: 'day2', label: 'Day 2', date: 'August 23' },
  ];

  const events = {
    day1: [
      {
        id: 1,
        eventId: "codeverse",
        title: "CodeVerse",
        tagline: "Where Every Code is a Universe, and Every Coder an Saver",
        time: "10:00 AM",
        venue: "Computer Lab Block A",
        category: "technical",
        icon: Terminal,
        participants: "Individual (1)",
        description: "Inter-Universe Coding Quest with algorithmic challenges",
        gradient: "from-blue-400 to-blue-600",
        poster: traditionalPoster,
      },
      {
        id: 2,
        eventId: "blind-sync",
        title: "Blind Sync",
        tagline: "Two Minds One Vision",
        time: "02:00 PM",
        venue: "Main Auditorium",
        category: "technical",
        icon: Users,
        participants: "Teams of 2",
        description: "Team-based coding with one member coding and other guiding",
        gradient: "from-pink-400 to-pink-600",
        poster: blindPoster,
      },
    ],
    day2: [
      {
        id: 3,
        eventId: "prompt-realm",
        title: "Prompt Realm",
        tagline: "Craft the Way through Magic and Logic",
        time: "03:00 PM",
        venue: "AI Lab",
        category: "technical",
        icon: Brain,
        participants: "Individual (1)",
        description: "Solve enchanted puzzles to craft powerful prompts",
        gradient: "from-purple-400 to-purple-600",
        poster: promptPoster,
      },
      {
        id: 4,
        eventId: "tech-thesis",
        title: "Tech Thesis",
        tagline: "Where Every Slide Transforms into Insights",
        time: "11:00 AM",
        venue: "Seminar Hall",
        category: "technical",
        icon: FileText,
        participants: "Teams of 3",
        description: "Platform where innovation meets imagination through presentations",
        gradient: "from-green-400 to-green-600",
        poster: paperPoster,
      },
    ],
  };

  // Spot Events Data
  const spotEvents = {
    day1: [
      {
        id: 1,
        eventId: "spot-event-1",
        title: "Image Word Guessing",
        image: spotImage1,
        description: "Fun word-guessing game with images",
        onClick: () => navigate('/event/spot-event-1'),
      },
      {
        id: 2,
        eventId: "spot-event-2", 
        title: "Tech Trivia",
        image: spotImage2,
        description: "Test your tech knowledge",
        onClick: () => navigate('/event/spot-event-2'),
      },
      {
        id: 3,
        eventId: "spot-event-3",
        title: "Code Debugging",
        image: spotImage3,
        description: "Find and fix bugs in code",
        onClick: () => navigate('/event/spot-event-3'),
      },
      {
        id: 4,
        eventId: "spot-event-4",
        title: "UI/UX Design",
        image: spotImage4,
        description: "Create beautiful UI/UX designs",
        onClick: () => navigate('/event/spot-event-4'),
      },
    ],
    day2: [
      {
        id: 5,
        eventId: "spot-event-5",
        title: "Spot Event 5",
        image: spotImage5,
        description: "First spot event challenge for Day 2",
        onClick: () => navigate('/event/spot-event-5'),
      },
      {
        id: 6,
        eventId: "spot-event-6",
        title: "Spot Event 6",
        image: spotImage6,
        description: "Second spot event for Day 2",
        onClick: () => navigate('/event/spot-event-6'),
      },
      {
        id: 7,
        eventId: "spot-event-7",
        title: "Spot Event 7",
        image: spotImage7,
        description: "Third spot event challenge for Day 2",
        onClick: () => navigate('/event/spot-event-7'),
      },
      {
        id: 8,
        eventId: "spot-event-8",
        title: "Spot Event 8",
        image: spotImage8,
        description: "Final spot event for Day 2",
        onClick: () => navigate('/event/spot-event-8'),
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="events" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-blue animate-float-3d" style={{ top: '20%', right: '10%', animationDelay: '1s' }} />
        <div className="bg-orb-cyan animate-float-3d" style={{ bottom: '10%', left: '15%', animationDelay: '3s' }} />
        <div className="bg-orb-purple animate-float-3d" style={{ top: '60%', right: '70%', animationDelay: '5s' }} />
        
        {/* Additional floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`events-particle-${i}`}
            className="absolute bg-cyan-400 rounded-full animate-float opacity-15"
            style={{
              width: `${1.5 + Math.random() * 3}px`,
              height: `${1.5 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 4}s`
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
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient font-audiowide mb-6"
          >
            EVENT SCHEDULE
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Two days of intense competition, learning, and celebration. Choose your battles and 
            claim your victories in the tech fest arena.
          </motion.p>
        </motion.div>

        {/* Day Selector */}
        <motion.div
          className="flex justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="dashboard-glass p-2 rounded-2xl">
            <div className="flex gap-2">
              {days.map((day) => (
                <motion.button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-6 py-3 rounded-xl font-orbitron font-semibold transition-all duration-300 relative overflow-hidden ${
                    selectedDay === day.id
                      ? 'crystal-glass text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  <div className="relative z-10">
                    <div className="text-sm sm:text-base">{day.label}</div>
                    <div className="text-xs opacity-80">{day.date}</div>
                  </div>
                  {selectedDay === day.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      layoutId="daySelector"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {selectedDay === day.id && (
                    <>
                      <div className="scan-line-top" />
                      <div className="scan-line-bottom" />
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {events[selectedDay as keyof typeof events].map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
              >
                <MagicCard 
                  className="ultra-liquid-glass magic-card-enhanced main-event-highlight rounded-3xl relative overflow-hidden min-h-[520px] lg:min-h-[560px] flex flex-col transition-smooth"
                  glowColor="0, 200, 255"
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  particleCount={0}
                  disableStars={true}
                >
                  <div className="relative flex flex-col h-full">
                    {/* Enhanced Visual Effects */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                      <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-blue-400 to-transparent animate-pulse delay-1000"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Event Poster Image with Pixel Transition */}
                    <div className="w-full h-64 sm:h-[280px] lg:h-[320px] relative rounded-t-3xl overflow-hidden flex-shrink-0">
                      <PixelTransition
                        firstContent={
                          <div className="relative w-full h-full">
                            <img 
                              src={event.poster} 
                              alt={event.title}
                              className="w-full h-full object-contain object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                            {/* Geometric overlay effects */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-cyan-400/50 rotate-45 animate-spin-slow"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-bounce"></div>
                          </div>
                        }
                        secondContent={
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                            <div className="text-center p-6">
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient font-audiowide mb-2">
                                {event.title}
                              </h3>
                              <p className="text-lg text-primary font-orbitron font-medium">
                                {event.tagline}
                              </p>
                              <div className="mt-4 flex items-center justify-center gap-2">
                                <event.icon className="w-6 h-6 text-primary" />
                                <span className="text-sm text-muted-foreground font-inter">
                                  {event.time} • {event.venue}
                                </span>
                              </div>
                            </div>
                          </div>
                        }
                        gridSize={12}
                        pixelColor="rgba(59, 130, 246, 0.8)"
                        animationStepDuration={0.4}
                        className="w-full h-full rounded-t-3xl"
                        style={{ width: '100%', height: '100%' }}
                        aspectRatio="0%"
                      />
                    </div>
                    
                    {/* Content section pushed to bottom */}
                    <div className="flex-1 flex flex-col justify-end p-6">
                      {/* Scan Lines */}
                      <div className="scan-line-top" />
                  
                      <div className="relative z-10">
                        {/* Event Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${event.gradient} bg-opacity-20`}>
                              <event.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-holographic font-audiowide event-title">
                                {event.title}
                              </h3>
                              <div className="text-sm text-muted-foreground font-orbitron">
                                {event.time} • {event.venue}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm font-inter leading-relaxed mb-4">
                          {event.description}
                        </p>

                        {/* More Details Button */}
                        <motion.button
                          className="w-full neu-button py-2 rounded-lg text-sm font-semibold text-primary font-orbitron btn-enhanced hover-glow"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/event/${event.eventId}`)}
                        >
                          More Details
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="scan-line-bottom" />
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Spot Events Section */}
        <motion.div
          className="mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient font-audiowide mb-4">
              SPOT EVENTS
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
              On-the-spot challenges and surprises await! Navigate through our interactive gallery to discover 
              the exciting spot events for {selectedDay === 'day1' ? 'Day 1' : 'Day 2'}.
            </p>
          </motion.div>

          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <MagicCard
              className="dashboard-glass p-6 rounded-3xl max-w-6xl mx-auto relative"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={20}
            >
              <div className="absolute inset-0">
                <div className="bg-orb-purple opacity-20" />
                <div className="crystal-facet-center" />
              </div>

              <div className="relative z-10">
                <div 
                  className="gallery-container" 
                  style={{ 
                    height: isMobile ? '300px' : '600px', 
                    position: 'relative' 
                  }}
                >
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <CircularGallery 
                      items={spotEvents[selectedDay as keyof typeof spotEvents].map(event => ({
                        image: event.image,
                        text: event.title,
                        onClick: event.onClick
                      }))}
                      bend={isMobile ? 1.5 : 3} 
                      textColor="#ffffff" 
                      borderRadius={0.05} 
                      scrollEase={isMobile ? 0.05 : 0.02}
                      autoRotate={true}
                      autoRotateSpeed={isMobile ? 0.5 : 0.8}
                      scrollSpeed={isMobile ? 2 : 3}
                      font={isMobile ? "bold 20px Figtree" : "bold 30px Figtree"}
                    />
                  </Suspense>
                </div>
                
                {/* More Details Button */}
                <div className="text-center mt-8">
                  <motion.button
                    className="neu-button px-8 py-3 rounded-xl text-lg font-semibold text-primary font-orbitron bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllSpotEvents(!showAllSpotEvents)}
                  >
                    {showAllSpotEvents ? 'Hide Details' : 'View All Spot Events'}
                  </motion.button>
                </div>
              </div>

              <div className="scan-line-top" />
              <div className="scan-line-bottom" />
            </MagicCard>
          </motion.div>
          
          {/* All Spot Events Details */}
          <AnimatePresence>
            {showAllSpotEvents && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="mt-8 overflow-hidden"
              >
                <MagicCard
                  className="dashboard-glass p-8 rounded-3xl max-w-6xl mx-auto relative"
                  glowColor="147, 197, 253"
                  enableTilt={false}
                  enableMagnetism={true}
                  clickEffect={true}
                  particleCount={25}
                >
                  <div className="absolute inset-0">
                    <div className="bg-orb-cyan opacity-20" />
                    <div className="crystal-facet-center" />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl sm:text-3xl font-bold text-gradient font-audiowide mb-8 text-center">
                      All Spot Events - {selectedDay === 'day1' ? 'Day 1' : 'Day 2'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {spotEvents[selectedDay as keyof typeof spotEvents].map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300`}
                        >
                          <div className="flex-shrink-0">
                            <PixelTransition
                              firstContent={
                                <LazyImage
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                />
                              }
                              secondContent={
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm">
                                  <div className="text-center p-2">
                                    <h4 className="text-sm sm:text-base font-bold text-gradient font-audiowide">
                                      {event.title}
                                    </h4>
                                  </div>
                                </div>
                              }
                              gridSize={8}
                              pixelColor="rgba(59, 130, 246, 0.6)"
                              animationStepDuration={0.3}
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-blue-400/30"
                              style={{ width: '100%', height: '100%' }}
                              aspectRatio="0%"
                            />
                          </div>
                          
                          <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            <h5 className="text-lg sm:text-xl font-bold text-holographic font-audiowide mb-2">
                              {event.title}
                            </h5>
                            <p className="text-muted-foreground text-sm font-inter leading-relaxed mb-4">
                              {event.description}
                            </p>
                            <motion.button
                              className="neu-button px-4 py-2 rounded-lg text-sm font-semibold text-primary font-orbitron bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/60 btn-enhanced hover-glow transition-smooth"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={event.onClick}
                            >
                              View Details
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="scan-line-top" />
                  <div className="scan-line-bottom" />
                </MagicCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


      </div>

      {/* Space Particles - Stars (Optimized) */}
      {[...Array(100)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-cyan-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;
        
        return (
          <motion.div
            key={`event-star-${i}`}
            className={`absolute ${blueShade} rounded-full`}
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
      {[...Array(36)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(6, 182, 212, 0.5)', 'rgba(147, 197, 253, 0.5)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`event-orb-${i}`}
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

      {/* Shooting Stars */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={`event-shooting-${i}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 4px rgba(6, 182, 212, 0.8)',
          }}
          animate={{
            x: [0, 120],
            y: [0, 60],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 2.5 + Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  );
};

export default Events;
