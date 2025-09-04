import React, { Suspense } from 'react';

// Layout Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlobalEffects from '../components/ui/GlobalEffects';

// Global Styles for MagicBento
import '../styles/magicBento.css';

// Priority loading: Load Hero immediately, others lazily
import Hero from '../components/sections/Hero';

// Lazy load non-critical sections for better performance
const Experience = React.lazy(() => import('../components/sections/Experience'));
const About = React.lazy(() => import('../components/sections/About'));
const Events = React.lazy(() => import('../components/sections/Events'));
const MainMedia = React.lazy(() => import('../components/sections/MainMedia'));
// const CampusNavigation = React.lazy(() => import('../components/sections/CampusNavigation'));
const Contact = React.lazy(() => import('../components/sections/Contact'));


// Loading component for better UX
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Apply global glow effects to all cards */}
      <GlobalEffects />
      
      {/* Fixed Header */}
      <Header />

      {/* Main Sections */}
      <main className="relative">
        {/* 3D Background - Spline Integration would go here */}
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

        {/* Hero Section - Loaded immediately for faster initial render */}
        <Hero />

        {/* Events Section */}
        <Suspense fallback={<SectionLoader />}>
          <Events />
        </Suspense>

        {/* Experience Section */}
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        
        {/* About Section */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        {/* Main Media Section */}
        <Suspense fallback={<SectionLoader />}>
          <MainMedia />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
