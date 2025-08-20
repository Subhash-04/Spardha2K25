import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import vvitLogo from '../../assets/images/vvituacm_logo.png';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Campus', href: '#campus' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavigation = (href: string, name: string) => {
    if (name === 'Events') {
      navigate('/events');
    } else if (name === 'Campus') {
      navigate('/campus');
    } else if (location.pathname === '/') {
      // If on main page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to main page with hash
      navigate(`/${href}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 animate-slide-down animation-delay-200 dashboard-glass"
      style={{ 
        position: 'fixed', 
        top: '0', 
        left: '0', 
        right: '0',
        zIndex: 99999,
        width: '100%'
      }}
    >
      {/* Scan Lines */}
      <div className="scan-line-top" />
      <div className="scan-line-bottom" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Enhanced Logo */}
          <div
            className="flex items-center space-x-4 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
            onClick={() => handleNavigation('#home', 'Home')}
          >
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-transparent border-2 border-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm hover:scale-110 hover:rotate-360 transition-all duration-600"
              >
                <img
                  src={vvitLogo}
                  alt="VVITU ACM Logo"
                  className="w-16 h-16 object-contain rounded-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 
                className="text-xl font-audiowide text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-fade-in-left animation-delay-300"
              >
                SPARDHA 2025
              </h1>
              <p 
                className="text-xs text-primary/70 font-orbitron tracking-wider animate-fade-in-left animation-delay-500"
              >
                VVITU ACM Chapter
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.name)}
                className={`relative group px-6 py-3 text-sm font-medium text-foreground/80 hover:text-foreground font-orbitron transition-all duration-300 rounded-xl overflow-hidden hover:scale-105 hover:-translate-y-1 active:scale-95 animate-fade-in-down animation-delay-${index * 100}`}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text */}
                <span className="relative z-10 tracking-wide">{item.name}</span>
                
                {/* Animated underline */}
                <div
                  className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full w-0 group-hover:w-4/5 transition-all duration-400 ease-out transform -translate-x-1/2"
                />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Enhanced CTA Button - Desktop */}
            <button
              onClick={() => {
                const registerSection = document.querySelector('#register-section');
                if (registerSection) {
                  registerSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback to events if register section not found
                  handleNavigation('#events', 'Events');
                }
                setIsMenuOpen(false);
              }}
              className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-orbitron text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group overflow-hidden relative hover:scale-105 hover:-translate-y-1 active:scale-95 animate-fade-in-right animation-delay-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 tracking-wide">Register Now</span>
              <div
                className="ml-2 w-1 h-1 bg-white rounded-full animate-pulse-scale"
              />
            </button>



            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg crystal-glass hover:bg-primary/10 transition-colors duration-200 hover:scale-110 active:scale-90"
            >
              <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-primary" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div className={`md:hidden ultra-liquid-glass border-t border-primary/20 backdrop-blur-xl transition-all duration-400 ease-in-out overflow-hidden ${
        isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
      }`}>
        {isMenuOpen && (
          <div>
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href, item.name)}
                    className={`group relative text-left px-6 py-4 text-foreground/80 hover:text-foreground rounded-xl transition-all duration-300 font-orbitron overflow-hidden border border-transparent hover:border-primary/30 hover:translate-x-2 hover:scale-105 active:scale-98 animate-fade-in-left animation-delay-${index * 100}`}
                  >
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Text with enhanced styling */}
                    <span className="relative z-10 tracking-wide text-sm font-medium">{item.name}</span>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </button>
                ))}
                
                {/* Mobile CTA Button */}
                <button
                  onClick={() => {
                    const registerSection = document.querySelector('#register-section');
                    if (registerSection) {
                      registerSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      handleNavigation('#events', 'Events');
                    }
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-orbitron text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group overflow-hidden relative hover:scale-105 active:scale-98 animate-fade-in-up animation-delay-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 tracking-wide">Register for Events</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* HUD Elements */}
      <div className="hud-corner-top-right" />
      <div className="hud-status-vertical" />
    </header>
  );
};

export default Header;
