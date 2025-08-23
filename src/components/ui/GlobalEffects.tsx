import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GlobalEffects: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Create global spotlight effect that follows the cursor
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2000;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    // Function to apply hover effects to all interactive elements
    const applyGlowEffects = () => {
      // Target all card elements
      const cards = document.querySelectorAll('.crystal-glass, .ultra-liquid-glass, .dashboard-glass, .neu-button, [class*="card-3d"], .magic-card');
      
      cards.forEach(card => {
        if (!(card instanceof HTMLElement)) return;
        
        // Set default CSS variables
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '50%');
        card.style.setProperty('--glow-intensity', '0');
        card.style.setProperty('--glow-radius', '200px');
        
        // Add glowing border class if not already present
        if (!card.classList.contains('card--border-glow')) {
          card.classList.add('card--border-glow');
        }
      });
    };
    
    // Run initially
    applyGlowEffects();
    
    // Re-run when DOM changes to catch dynamically added elements
    const observer = new MutationObserver(applyGlowEffects);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Global mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      
      // Move the spotlight to follow cursor
      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
      
      // Check for nearby cards and update their glow position
      document.querySelectorAll('.card--border-glow').forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // If cursor is close to the card
        if (distance < 300) {
          // Calculate relative position for the glow
          const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
          const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
          
          el.style.setProperty('--glow-x', `${relativeX}%`);
          el.style.setProperty('--glow-y', `${relativeY}%`);
          el.style.setProperty('--glow-intensity', (1 - Math.min(distance / 300, 1)).toString());
        } else {
          el.style.setProperty('--glow-intensity', '0');
        }
      });
    };
    
    // Handle mouse leaving the window
    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default GlobalEffects;
