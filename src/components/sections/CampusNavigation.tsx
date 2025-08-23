import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Cpu, FlaskConical, Microscope } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import navImage from '../../assets/images/nav.png';

interface CampusBlock {
  id: string;
  name: string;
  color: string;
  position: { row: number; col: number };
  labs: string[];
  facilities: string[];
}

const campusBlocks: CampusBlock[] = [
  {
    id: 'A',
    name: 'Block A',
    color: 'from-blue-400 to-blue-600',
    position: { row: 1, col: 1 },
    labs: ['Computer Lab 1', 'Computer Lab 2', 'Software Lab', 'Electronics Lab', 'Digital Lab', 'VLSI Lab', 'Physics Lab', 'Chemistry Lab', 'Bio-Tech Lab', 'Mechanical Lab', 'CAD Lab', 'Workshop'],
    facilities: ['Rooms: A101-A150', 'Wi-Fi Zone', 'Study Area', 'Project Room', 'Seminar Hall', 'Research Center', 'Library Wing', 'Innovation Hub', 'Maker Space']
  },
  {
    id: 'NEW',
    name: 'New Block',
    color: 'from-cyan-400 to-cyan-600',
    position: { row: 1, col: 2 },
    labs: ['AI/ML Lab', 'Data Science Lab', 'IoT Lab'],
    facilities: ['Rooms: N101-N120', 'Co-working Space', 'Event Hall']
  }
];



const CampusNavigation: React.FC = () => {
  return (
    <section id="campus" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-cyan" style={{ top: '0%', left: '0%' }} />
        <div className="bg-orb-blue" style={{ bottom: '0%', right: '0%' }} />
        <div className="bg-orb-purple" style={{ top: '50%', left: '50%' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient font-audiowide mb-6">
            CAMPUS NAVIGATION
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            Navigate through the Tech campus with our interactive map. Discover labs, 
            facilities, and event venues across different blocks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Campus Map Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Enhanced Liquid Glass Container */}
            <MagicCard
              className="ultra-liquid-glass rounded-3xl p-8 sm:p-10 relative"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={15}
            >
              {/* Ultra Crystal Background Effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-blue-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-400/30 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-600/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Animated Scan Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="scan-line-top"></div>
                <div className="scan-line-bottom"></div>
              </div>

              <h3 className="text-2xl font-bold text-holographic mb-6 font-audiowide relative z-10">
                VVITU Campus Layout - Nambur, Guntur
              </h3>
              
              {/* Navigation Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-6 relative z-10 flex justify-center"
              >
                <img 
                  src={navImage} 
                  alt="Campus Navigation" 
                  className="max-w-full h-auto rounded-2xl shadow-2xl border border-white/20"
                  style={{ maxHeight: '300px' }}
                />
              </motion.div>
              
              {/* Enhanced Grid Container */}
              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {campusBlocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative h-32 flex flex-col items-center justify-center cursor-pointer"
                    style={{
                      gridColumn: block.position.col,
                      gridRow: block.position.row
                    }}
                  >
                    <MagicCard
                      className="w-full h-full flex flex-col items-center justify-center"
                      glowColor="0, 200, 255"
                      enableTilt={true}
                      enableMagnetism={true}
                      clickEffect={true}
                      particleCount={8}
                    >
                      {/* Premium Glass Card Background with Enhanced Gradients */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        {/* Main gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${block.color} rounded-2xl`}></div>
                        
                        {/* Glass overlay with subtle transparency */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                        
                        {/* Glossy highlight effect */}
                        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl"></div>
                        
                        {/* Side highlight */}
                        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-white/20 to-transparent rounded-l-2xl"></div>
                        
                        {/* Bottom right subtle shadow */}
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/20 to-transparent rounded-br-2xl"></div>
                        
                        {/* Animated glow border */}
                        <div className="absolute inset-0 rounded-2xl border border-white/30 shadow-lg"></div>
                        
                        {/* Floating light particles inside */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      
                      {/* Content */}
                      <Building className="w-6 sm:w-8 h-6 sm:h-8 mb-2 z-10 text-white drop-shadow-lg" />
                      <span className="text-xl sm:text-2xl font-bold font-orbitron z-10 text-white drop-shadow-lg">{block.id}</span>
                      <span className="text-xs sm:text-sm font-medium z-10 text-white/90 drop-shadow-md text-center">{block.name}</span>
                    </MagicCard>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Legend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="legend-container">
                  <div className="legend-bg-effect"></div>
                  
                  <h4 className="font-semibold text-foreground mb-3 flex items-center relative z-10 font-audiowide">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Campus Legend
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-base relative z-10">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-2 shadow-lg"></div>
                      <span className="font-orbitron">Computer Science</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded mr-2 shadow-lg"></div>
                      <span className="font-orbitron">Electronics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded mr-2 shadow-lg"></div>
                      <span className="font-orbitron">Science Labs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded mr-2 shadow-lg"></div>
                      <span className="font-orbitron">Mechanical</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded mr-2 shadow-lg"></div>
                      <span className="font-orbitron">Innovation Hub</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MagicCard>
          </motion.div>

          {/* Facilities Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gradient mb-6 font-audiowide">
              FACILITIES & LABS
            </h3>

            {/* Block Details */}
            <div className="space-y-4">
              {campusBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <MagicCard
                    className="crystal-glass rounded-2xl p-6 card-3d relative"
                    glowColor="0, 200, 255"
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    particleCount={8}
                  >
                    {/* Background Effects */}
                    <div className="crystal-facet-top opacity-30" />
                    <div className="crystal-rotate-8s opacity-20" />
                    
                    <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className={`w-6 h-6 bg-gradient-to-r ${block.color} rounded mr-3 shadow-lg`}></div>
                      <h4 className="text-lg font-semibold text-holographic font-audiowide">
                        {block.name}
                      </h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2 flex items-center font-orbitron">
                          <FlaskConical className="w-4 h-4 mr-2 text-primary" />
                          Laboratories
                        </h5>
                        <ul className="text-base text-muted-foreground space-y-1">
                          {block.labs.map((lab, i) => (
                            <li key={i} className="flex items-center font-inter">
                              <Microscope className="w-3 h-3 mr-2 text-accent" />
                              {lab}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-2 flex items-center font-orbitron">
                          <Building className="w-4 h-4 mr-2 text-primary" />
                          Facilities
                        </h5>
                        <ul className="text-base text-muted-foreground space-y-1">
                          {block.facilities.map((facility, i) => (
                            <li key={i} className="flex items-center font-inter">
                              <Cpu className="w-3 h-3 mr-2 text-accent" />
                              {facility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  );
};

export default CampusNavigation;