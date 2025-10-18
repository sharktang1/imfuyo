import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Moon, Sun, Leaf } from 'lucide-react';

const Loading = ({ lottieLoaded }) => {
  const [isDark, setIsDark] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Flicker effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 300);
    }, 2000);

    // Show fallback if Lottie doesn't load within 3 seconds
    const fallbackTimer = setTimeout(() => {
      if (!lottieLoaded) {
        setShowFallback(true);
      }
    }, 3000);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(fallbackTimer);
    };
  }, [lottieLoaded]);

  return (
    <div className={`min-h-screen w-full transition-all duration-700 overflow-hidden ${
      isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-emerald-100'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          isDark ? 'bg-green-500' : 'bg-green-300'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse ${
          isDark ? 'bg-emerald-500' : 'bg-emerald-200'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse ${
          isDark ? 'bg-teal-500' : 'bg-teal-100'
        }`} style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isDark 
              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
              : 'bg-white/80 hover:bg-white text-gray-900 border border-gray-200'
          } shadow-lg hover:shadow-xl transform hover:scale-110`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
        
        {/* Logo/Brand */}
        <div className="absolute top-8 left-8 flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <div className={`absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity ${
              isDark ? 'bg-green-700' : 'bg-green-300'
            }`}></div>
            <div className={`relative p-3 rounded-2xl transform group-hover:scale-110 transition-transform duration-300 ${
              isDark ? 'bg-gradient-to-br from-green-700 to-emerald-800' : 'bg-gradient-to-br from-green-400 to-emerald-500'
            }`}>
              <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span 
            className="text-2xl font-bold tracking-tight transition-all duration-500"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#6E260E'
            }}
          >
            Imfuyo
          </span>
        </div>

        {/* Lottie Animation - With Preload Handling */}
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl lg:max-w-6xl">
          <div className="relative w-full h-64 lg:h-96">
            {!showFallback ? (
              <DotLottieReact
                src="https://lottie.host/68638530-e1e4-49f9-952a-1c3efcd7aeac/2hywu50vnf.lottie"
                loop
                autoplay
                className="w-full h-full"
                onEvent={(event) => {
                  if (event === 'load') {
                    console.log('Lottie loaded successfully');
                  }
                }}
              />
            ) : (
              // Fallback animation if Lottie fails to load
              <div className="w-full h-full flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-4 border-t-transparent animate-spin ${
                  isDark ? 'border-green-400' : 'border-green-600'
                }`}></div>
              </div>
            )}
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 -z-10 transition-all duration-500 ${
              isDark ? 'bg-green-500 shadow-2xl shadow-green-500/50' : 'bg-green-400'
            }`}></div>
          </div>
        </div>

        {/* Loading Content - Simplified */}
        <div className="w-full max-w-2xl text-center space-y-8">
          
          {/* Imfuyo Name with Bouncy Dots */}
          <div className="space-y-6">
            <h1 
              className={`text-5xl lg:text-7xl font-bold transition-all duration-500 ${
                flicker ? 'opacity-70 scale-105' : 'opacity-100 scale-100'
              } ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                color: '#6E260E'
              }}
            >
              Imfuyo
            </h1>
            
            {/* Bouncy Dots */}
            <div className="flex items-center justify-center space-x-3">
              {[0, 1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`w-4 h-4 rounded-full animate-bounce ${
                    isDark ? 'bg-green-400' : 'bg-green-600'
                  }`}
                  style={{ 
                    animationDelay: `${dot * 0.15}s`,
                    animationDuration: '1.2s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-bounce {
          animation: bounce 1.2s infinite ease-in-out;
        }

        /* Ensure Lottie container is properly sized */
        .lottie-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Loading;