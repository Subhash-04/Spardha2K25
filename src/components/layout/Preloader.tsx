import React from 'react';
import vvitLogo from '../../assets/images/vvituacm_logo.png';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [allContentLoaded, setAllContentLoaded] = React.useState(false);

  React.useEffect(() => {
    // Simulate content loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setAllContentLoaded(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Check if all resources are loaded
     const checkResourcesLoaded = () => {
       const images = document.querySelectorAll('img');
       const scripts = document.querySelectorAll('script');
       const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
       
       let loadedCount = 0;
       const totalResources = images.length + scripts.length + stylesheets.length;
       
       const checkComplete = () => {
         loadedCount++;
         if (loadedCount >= totalResources * 0.8) { // 80% of resources loaded
           setLoadingProgress(100);
           setAllContentLoaded(true);
         }
       };
       
       images.forEach(img => {
         if (img.complete) checkComplete();
         else img.addEventListener('load', checkComplete);
       });
       
       scripts.forEach(script => {
         if ((script as any).readyState === 'complete') checkComplete();
         else script.addEventListener('load', checkComplete);
       });
       
       stylesheets.forEach(link => {
         if ((link as HTMLLinkElement).sheet) checkComplete();
         else link.addEventListener('load', checkComplete);
       });
     };

    if (document.readyState === 'complete') {
      checkResourcesLoaded();
    } else {
      window.addEventListener('load', checkResourcesLoaded);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('load', checkResourcesLoaded);
    };
  }, []);

  React.useEffect(() => {
    if (allContentLoaded && loadingProgress >= 100) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 800); // Small delay after everything is loaded
      return () => clearTimeout(timer);
    }
  }, [allContentLoaded, loadingProgress, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 animate-fade-in">
      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Preloader Container */}
         <div className="relative w-32 h-32 mb-8">
           {/* Outer Circle */}
           <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin-slow shadow-lg shadow-blue-500/30" />
           
           {/* Middle Circle */}
           <div className="absolute top-3 left-3 w-24 h-24 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin-reverse shadow-md shadow-cyan-400/20" />
           
           {/* Inner Circle */}
           <div className="absolute top-6 left-6 w-20 h-20 border-2 border-transparent border-t-blue-300 rounded-full animate-spin-fast shadow-sm shadow-blue-300/10" />
          
          {/* Logo Container with Glow Effect */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-blue-400/30 shadow-2xl shadow-blue-500/20 flex items-center justify-center">
               {/* Inner glow effect */}
               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/5 animate-pulse" />
               
               {/* Logo */}
               <img
                 src={vvitLogo}
                 alt="VVITU ACM Logo"
                 className="w-12 h-12 object-contain relative z-10 drop-shadow-lg filter brightness-110 contrast-110"
               />
               
               {/* Outer glow ring */}
               <div className="absolute -inset-1 rounded-full border border-blue-400/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
             </div>
           </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in-up animation-delay-500">
            SPARDHA 2025
          </h1>
          <p className="text-slate-300 text-base md:text-lg animate-fade-in-up animation-delay-700">
            Vasireddy Venkatadri International Technological University
            <br />
            <span className="text-blue-400">ACM Student Chapter</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mb-6 animate-scale-in animation-delay-900">
          <div className="relative h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
               className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
               style={{ width: `${loadingProgress}%` }}
             />
          </div>
          
          <div className="flex justify-between items-center mt-3 text-sm animate-fade-in animation-delay-1100">
            <span className="text-slate-400">Loading...</span>
            <span className="text-blue-400 font-mono">{Math.round(loadingProgress)}%</span>
          </div>
        </div>




      </div>
    </div>
  );
};

export default Preloader;
