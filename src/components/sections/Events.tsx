import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, Wrench, Terminal, Users, Brain, FileText, Star } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import LazyImage from '../ui/LazyImage';
import blindPoster from '../../assets/optimized/images/blind.jpg';
import paperPoster from '../../assets/optimized/images/paper.jpg';
import traditionalPoster from '../../assets/optimized/images/Traditional.jpg';
import promptPoster from '../../assets/optimized/images/prompt.jpg';
import spotImage1 from '../../assets/images/1.png';
import spotImage2 from '../../assets/images/2.png';
import spotImage3 from '../../assets/images/3.png';
import spotImage4 from '../../assets/images/4.png';
import spotImage5 from '../../assets/images/5.png';
import spotImage6 from '../../assets/optimized/images/6.jpg';
import spotImage7 from '../../assets/optimized/images/7.jpg';
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
    { id: 'day1', label: 'Day 1', date: 'September 16' },
    { id: 'day2', label: 'Day 2', date: 'September 17' },
  ];

  const events = {
    day1: [
      {
        id: 1,
        eventId: "codeverse",
        title: "CodeVerse",
        tagline: "Where Every Code is a Universe, and Every Coder an Saver",
        time: "9:00 AM",
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
        time: "10:00 AM",
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
        eventId: "tech-thesis",
        title: "Tech Thesis",
        tagline: "Where Every Slide Transforms into Insights",
        time: "9:00 AM",
        venue: "Seminar Hall",
        category: "technical",
        icon: FileText,
        participants: "Teams of 2-3",
        description: "Platform where innovation meets imagination through presentations",
        gradient: "from-orange-400 to-orange-600",
        poster: paperPoster,
      },
      {
        id: 4,
        eventId: "prompt-realm",
        title: "Prompt Realm",
        tagline: "Craft the Way through Magic and Logic",
        time: "9:30 AM",
        venue: "AI Lab",
        category: "technical",
        icon: Star,
        participants: "Individual (1)",
        description: "Solve enchanted puzzles to craft powerful prompts",
        gradient: "from-purple-400 to-purple-600",
        poster: promptPoster,
      },
    ],
  };

  // Spot Events Data
  const spotEvents = {
    day1: [
      {
        id: 1,
        eventId: "spot-event-1",
        title: "Term Twist",
        image: spotImage1,
        description: "Unscramble tech terms in record time",
        onClick: () => navigate('/event/spot-event-1'),
      },
      {
        id: 2,
        eventId: "spot-event-2", 
        title: "Think Tac Toe",
        image: spotImage2,
        description: "Strategic tic-tac-toe with logic questions",
        onClick: () => navigate('/event/spot-event-2'),
      },
      {
        id: 3,
        eventId: "spot-event-3",
        title: "Queen Quest",
        image: spotImage3,
        description: "Place 8 queens strategically on chessboard",
        onClick: () => navigate('/event/spot-event-3'),
      },
      {
        id: 4,
        eventId: "spot-event-4",
        title: "Flash Focus",
        image: spotImage4,
        description: "Memory challenge with tech images",
        onClick: () => navigate('/event/spot-event-4'),
      },
    ],
    day2: [
      {
        id: 5,
        eventId: "spot-event-5",
        title: "Skill Shot",
        image: spotImage5,
        description: "Categorize tech terms accurately",
        onClick: () => navigate('/event/spot-event-5'),
      },
      {
        id: 6,
        eventId: "spot-event-6",
        title: "Core Hunt",
        image: spotImage6,
        description: "Identify CPU components and functions",
        onClick: () => navigate('/event/spot-event-6'),
      },
      {
        id: 7,
        eventId: "spot-event-7",
        title: "Tower of Hanoi",
        image: spotImage7,
        description: "Solve the classic disk puzzle",
        onClick: () => navigate('/event/spot-event-7'),
      },
      {
        id: 8,
        eventId: "spot-event-8",
        title: "Roll Storm",
        image: spotImage8,
        description: "Dice rolling competition for highest score",
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

        {/* Featured Events */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3
             variants={itemVariants}
             className="text-2xl sm:text-3xl font-bold text-gradient font-audiowide mb-8 text-center"
           >
             Main Events
           </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { title: "CodeVerse", eventId: "codeverse", gradient: "from-blue-400 to-blue-600" },
              { title: "Blind Sync", eventId: "blind-sync", gradient: "from-pink-400 to-pink-600" },
              { title: "Tech Thesis", eventId: "tech-thesis", gradient: "from-orange-400 to-orange-600" },
              { title: "Prompt Realm", eventId: "prompt-realm", gradient: "from-purple-400 to-purple-600" }
            ].map((event, index) => (
              <motion.button
                key={event.eventId}
                onClick={() => navigate(`/event/${event.eventId}`)}
                className="crystal-glass p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-full h-2 bg-gradient-to-r ${event.gradient} rounded-full mb-3 group-hover:shadow-lg transition-all duration-300`} />
                <h4 className="font-orbitron font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h4>
                <div className="mt-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View Details →
                </div>
              </motion.button>
            ))}
          </div>
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
                    
                    {/* Event Poster Image - Larger size */}
                    <div className="w-full h-64 sm:h-[280px] lg:h-[320px] relative rounded-t-3xl overflow-hidden flex-shrink-0">
                      <img 
                        src={event.poster} 
                        alt={event.title}
                        className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-110 event-poster"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                      {/* Geometric overlay effects */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-2 border-cyan-400/50 rotate-45 animate-spin-slow"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-bounce"></div>
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
                              <h3 className="text-lg sm:text-xl font-bold text-cyan-300 font-audiowide event-title" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.4), 0 0 16px rgba(6, 182, 212, 0.2)' }}>
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
                
                {/* Mobile Scroll Message */}
                {isMobile && (
                  <motion.div
                    className="text-center mt-4 mb-4"
                    variants={itemVariants}
                  >
                    <p className="text-xs text-muted-foreground font-inter opacity-75">
                      Tap and drag to navigate • Click center card to view details
                    </p>
                  </motion.div>
                )}
                
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
                            <LazyImage
                              src={event.image}
                              alt={event.title}
                              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-blue-400/30"
                            />
                          </div>
                          
                          <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            <h5 className="text-lg sm:text-xl font-bold text-cyan-300 font-audiowide mb-2" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.4), 0 0 16px rgba(6, 182, 212, 0.2)' }}>
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
