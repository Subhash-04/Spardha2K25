import React from 'react';
import { Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import MagicCard from '../ui/MagicCard';
import vvituLogo from '../../assets/images/vvituacm_logo.png';

const Footer: React.FC = () => {

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', link: 'https://www.instagram.com/acm_vvitu?igsh=MXRzOXd0cWRrcGY5Yw==', color: 'text-pink-500' },
    { icon: Linkedin, name: 'LinkedIn', link: 'https://www.linkedin.com/in/acmvvit/', color: 'text-blue-500' },
  ];

  const quickLinks = [
    { name: 'Home', link: '#home' },
    { name: 'Events', link: '#events' },
    { name: 'Campus', link: '#campus' },
    { name: 'Register', link: '#register' },
    { name: 'About', link: '#about' },
  ];



  return (
    <footer className="relative overflow-hidden pt-16 pb-8 border-t border-border/50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-orb-blue opacity-20" style={{ top: '0%', left: '20%' }} />
        <div className="bg-orb-cyan opacity-15" style={{ bottom: '0%', right: '30%' }} />
        <div className="bg-orb-purple opacity-15" style={{ bottom: '20%', left: '40%' }} />
      </div>

      {/* Scan Lines */}
      <div className="scan-line-top" />
      <div className="scan-line-middle" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-fade-in-up animation-delay-100"
        >
          {/* Logo & About Section */}
          <div className="space-y-6 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-background/20 to-background/5 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                  <img
                    src={vvituLogo}
                    alt="VVITU ACM Logo"
                    className="w-16 h-16 object-contain rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-audiowide text-gradient">SPARDHA 2025</h3>
                <p className="text-sm text-muted-foreground font-orbitron">Tech Fest</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground font-inter leading-relaxed pl-2 border-l-2 border-primary/50">
              Spardha 2025 at VVIT University- A journey through the multiverse of technology and imagination, where 
              every idea shapes a new reality. Step into a dimension of infinite possibilities.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="crystal-glass p-2.5 rounded-lg inline-flex items-center justify-center relative hover:bg-primary/10 shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-primary/60"
                >
                  <div className="absolute inset-0">
                    <div className="crystal-facet-corner opacity-20" />
                  </div>
                  <social.icon className={`w-4 h-4 ${social.color} relative z-10`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 animate-fade-in-up animation-delay-300">
            <div className="dashboard-glass px-4 py-3 rounded-lg inline-block shadow-glow animate-glow-subtle">
              <h4 className="text-lg font-orbitron text-gradient">Navigate</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.link}
                  className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 animate-fade-in-up animation-delay-${300 + index * 100}`}
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                  <span className="font-orbitron text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6 animate-fade-in-up animation-delay-400">
            <div className="dashboard-glass px-4 py-3 rounded-lg inline-block shadow-glow animate-glow-subtle">
              <h4 className="text-lg font-orbitron text-gradient">Contact</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-inter">acm@vvitu.net</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-inter">+91 123 456 7890</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-inter">
                  Vasireddy Venkatadri International Technological University, 
                  Nambur, Guntur - 522508
                </span>
              </div>
            </div>
          </div>

          {/* Live Status */}
          <div className="space-y-6 animate-fade-in-up animation-delay-500">
            <div className="dashboard-glass px-4 py-3 rounded-lg inline-block shadow-glow animate-glow-subtle">
              <h4 className="text-lg font-orbitron text-gradient">Live Status</h4>
            </div>
            <div className="space-y-4">
              <div className="crystal-glass p-4 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-orbitron text-green-400">SYSTEM ONLINE</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">Registration Portal Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Institution Info */}
        <div
          className="mb-12 text-center animate-fade-in-up animation-delay-600"
        >
          <div className="inline-block animate-fade-in-up animation-delay-700">
            <MagicCard
              className="crystal-glass p-6 rounded-2xl relative"
              glowColor="0, 200, 255"
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              particleCount={8}
            >
              <div className="absolute inset-0">
                <div className="crystal-facet-corner opacity-20" />
                <div className="bg-primary/5 absolute inset-0 animate-pulse-slow" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-audiowide text-holographic mb-2">
                  VVITU ACM Student Chapter
                </h4>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-accent to-purple-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-inter">
                  Fostering Tech innovation and technological creativity
                </p>
              </div>
            </MagicCard>
          </div>
        </div>



        {/* Copyright */}
        <div
          className="border-t border-border/30 pt-8 animate-fade-in-up animation-delay-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground/80 font-inter animate-fade-in-up animation-delay-900">
              © 2025 VVITU ACM Student Chapter. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 animate-fade-in-up animation-delay-1000">
              <span className="text-sm text-muted-foreground font-audiowide">Made with passion</span>
              <span className="text-sm text-primary font-bold font-audiowide">by VVITU ACM</span>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div
          className="mt-8 text-center animate-fade-in-up animation-delay-1100"
        >
          <p
            className="text-xs text-muted-foreground/60 font-orbitron tracking-wider animate-pulse-scale"
          >
            [ ENTERING TECH MODE... SYSTEM READY ]
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-accent/20 rounded-full animate-float"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;
