import React, { Suspense, useEffect } from 'react';

// Layout Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlobalEffects from '../components/ui/GlobalEffects';

// Campus Navigation Component
import CampusNavigation from '../components/sections/CampusNavigation';

// Loading component for better UX
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

interface CampusPageProps {}

const CampusPage: React.FC<CampusPageProps> = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Apply global glow effects to all cards */}
      <GlobalEffects />
      
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative pt-20">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-secondary to-background">
          {/* Animated Background Grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}
          />
          
          {/* Watermark hiding overlay (for Spline) */}
          <div className="absolute bottom-0 right-0 bg-background w-48 h-16 sm:w-56 sm:h-20 md:w-64 md:h-24 lg:w-72 lg:h-28 z-10" />
        </div>

        {/* Campus Navigation Section */}
        <Suspense fallback={<SectionLoader />}>
          <CampusNavigation />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampusPage;