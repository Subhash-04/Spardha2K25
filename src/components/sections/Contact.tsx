import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Instagram, Linkedin } from 'lucide-react';
import MagicCard from '../ui/MagicCard';

const Contact: React.FC = () => {
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
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone 1',
      info: '+91 123 456 7890',
      link: 'tel:+911234567890',
      gradient: 'from-green-500 to-blue-600',
      bgColor: 'bg-gradient-to-r from-green-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone 2',
      info: '+91 987 654 3210',
      link: 'tel:+919876543210',
      gradient: 'from-blue-500 to-green-600',
      bgColor: 'bg-gradient-to-r from-blue-500 to-green-600',
    },
    {
      icon: Phone,
      title: 'Phone 3',
      info: '+91 555 123 4567',
      link: 'tel:+915551234567',
      gradient: 'from-purple-500 to-blue-600',
      bgColor: 'bg-gradient-to-r from-purple-500 to-blue-600',
    },

    {
      icon: Instagram,
      title: 'Instagram',
      info: '@acm_vvitu',
      link: 'https://www.instagram.com/acm_vvitu?igsh=MXRzOXd0cWRrcGY5Yw==',
      gradient: 'from-pink-500 to-orange-600',
      bgColor: 'bg-gradient-to-r from-pink-500 to-orange-600',
    },
   ];

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', link: 'https://www.instagram.com/acm_vvitu?igsh=MXRzOXd0cWRrcGY5Yw==', color: 'text-pink-500' },
    { icon: Linkedin, name: 'LinkedIn', link: 'https://www.linkedin.com/in/acmvvit/', color: 'text-blue-600' },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-blue animate-float-3d" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="bg-orb-cyan animate-float-3d" style={{ bottom: '20%', right: '15%', animationDelay: '2s' }} />
        <div className="bg-orb-purple animate-float-3d" style={{ top: '60%', left: '70%', animationDelay: '4s' }} />
        
        {/* Additional floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`contact-particle-${i}`}
            className="absolute bg-blue-400 rounded-full animate-float opacity-20"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 3}s`
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
            CONTACT US
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Connect with us for queries, partnerships, or to join the Tech revolution. 
            We're here to help you navigate the future.
          </motion.p>
        </motion.div>

        {/* Contact Information Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.title}
              variants={cardVariants}
            >
              <MagicCard
                className="block w-full"
                glowColor="0, 200, 255"
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={8}
              >
                <a 
                  href={contact.link} 
                  className="crystal-glass p-6 rounded-2xl text-center relative block w-full h-full"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${contact.gradient} opacity-20 rounded-full blur-2xl`} />
                    <div className="crystal-facet-top" />
                    <div className="crystal-rotate-8s opacity-30" />
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-xl ${contact.bgColor} mb-6 shadow-lg`}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-holographic font-audiowide mb-3">
                      {contact.title}
                    </h3>
                    <p className="text-base text-muted-foreground font-inter leading-relaxed">
                      {contact.info}
                    </p>
                  </div>
                </a>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Social Media & Additional Info */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Social Media */}
            <MagicCard
              className="crystal-glass p-8 rounded-3xl relative"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={10}
            >
              <div className="absolute inset-0">
                <div className="bg-orb-purple opacity-10" />
                <div className="crystal-facet-corner" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gradient font-audiowide mb-6">
                  Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      className="neu-button p-4 rounded-xl flex items-center gap-3 hover:bg-primary/5 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className={`w-5 h-5 ${social.color}`} />
                      <span className="text-foreground font-orbitron text-sm">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="hud-corner-top-right" />
              <div className="hud-status-horizontal" />
            </MagicCard>

            {/* Quick Info */}
            <MagicCard
              className="dashboard-glass p-8 rounded-3xl relative"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={10}
            >
              <div className="absolute inset-0">
                <div className="bg-orb-blue opacity-10" />
                <div className="crystal-rotate-12s opacity-20" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gradient font-audiowide mb-6">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                    <span className="text-foreground font-orbitron text-sm">
                      Registration Opens: February 1, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
                    <span className="text-foreground font-orbitron text-sm">
                      Early Bird Deadline: February 28, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
                    <span className="text-foreground font-orbitron text-sm">
                      Festival Dates: August 22-23, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
                    <span className="text-foreground font-orbitron text-sm">
                      Venue: VVIT Campus, Guntur
                    </span>
                  </div>
                </div>
              </div>

              <div className="scan-line-top" />
              <div className="hud-corner-bottom-left" />
            </MagicCard>
          </motion.div>
          
          {/* Location & Map Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <MagicCard
              className="ultra-liquid-glass p-8 rounded-3xl relative"
              glowColor="0, 200, 255"
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={12}
            >
              <div className="absolute inset-0">
                <div className="bg-orb-cyan opacity-10" />
                <div className="crystal-facet-center" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-gradient font-audiowide mb-8">
                  Find Us
                </h3>

                {/* Address Details */}
                <div className="dashboard-glass p-6 rounded-xl relative overflow-hidden mb-6">
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-holographic font-audiowide mb-2">
                          Vasireddy Venkatadri International Technological University
                        </h4>
                        <p className="text-muted-foreground font-inter text-base leading-relaxed">
                          Nambur (V), Guntur, Andhra Pradesh 522508<br />
                          Near Pedakakani, Guntur District
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="crystal-glass p-2 rounded-xl relative overflow-hidden">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.5441234567!2d80.4567890!3d16.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVasavi%20Vidya%20Vihar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="VVIT Location - Guntur"
                      className="filter brightness-90 contrast-110"
                    />
                  </div>
                </div>
              </div>

              <div className="scan-line-top" />
              <div className="scan-line-bottom" />
            </MagicCard>
          </motion.div>
        </div>


      </div>

      {/* Space Particles - Stars */}
      {[...Array(90)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const blueShade = Math.random() > 0.5 ? 'bg-blue-400' : 'bg-cyan-400';
        const glowIntensity = Math.random() * 0.6 + 0.3;
        
        return (
          <motion.div
            key={`contact-star-${i}`}
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
      {[...Array(64)].map((_, i) => {
        const size = Math.random() * 4 + 3;
        const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(6, 182, 212, 0.5)', 'rgba(147, 197, 253, 0.5)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`contact-orb-${i}`}
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
      {[...Array(28)].map((_, i) => (
        <motion.div
          key={`contact-shooting-${i}`}
          className="absolute w-1 h-1 bg-blue-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 4px rgba(59, 130, 246, 0.8)',
          }}
          animate={{
            x: [0, 130],
            y: [0, 65],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 2.2 + Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  );
};

export default Contact;
