import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Error Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`error-particle-${i}`}
            className="absolute bg-red-400 rounded-full animate-float opacity-30"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Glitch Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`glitch-line-${i}`}
            className="absolute bg-cyan-400 animate-glitch-line opacity-20"
            style={{
              width: `${50 + Math.random() * 200}px`,
              height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-glitch-text">
            404
          </h1>
          {/* Glitch Effect Overlay */}
          <h1 className="absolute top-0 left-0 text-9xl md:text-[12rem] font-bold text-red-500 opacity-30 animate-glitch-overlay">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 animate-fade-in-up animation-delay-500">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            Oops! The page you're looking for seems to have drifted into the digital void.
          </p>
          <p className="text-base text-gray-400">
            Don't worry, even the best explorers sometimes take a wrong turn in cyberspace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-700">
          <Link
            to="/"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            <Home size={20} className="group-hover:animate-bounce" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} className="group-hover:animate-pulse" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 animate-fade-in-up animation-delay-900">
          <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
            <Search size={16} />
            Try searching for what you need:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Events', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Robot/Error Icon */}
      <div className="absolute bottom-10 right-10 animate-bounce-slow opacity-20">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg rotate-45 animate-spin-slow" />
      </div>
    </div>
  );
};

export default NotFound;