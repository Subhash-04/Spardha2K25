import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Preloader from './components/layout/Preloader';
import GlobalEffects from './components/ui/GlobalEffects';

// Global Styles for MagicBento
import './styles/magicBento.css';

// Lazy load page components
const MainPage = React.lazy(() => import('./pages/MainPage'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const EventDetailPage = React.lazy(() => import('./pages/EventDetailPage'));
const NotFound = React.lazy(() => import('./components/pages/NotFound'));




function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark theme as default
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Optimized to 1.2 seconds for faster loading

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Apply global glow effects to all cards */}
        <GlobalEffects />
        
        {/* Preloader */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <Preloader onLoadingComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        {!isLoading && (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                <p className="text-muted-foreground animate-pulse">Loading...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:eventId" element={<EventDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </Router>
  );
}

export default App;
