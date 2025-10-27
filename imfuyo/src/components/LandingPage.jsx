import React, { useState, useEffect } from 'react';
import Hero from './landingcomps/Hero';
import About from './landingcomps/About';
import Services from './landingcomps/Services';
import Contact from './landingcomps/Contact';

export default function LandingPage({ 
  isDark, 
  setIsDark, 
  onNavigateToAbout,
  onNavigateToCommunity,
  onNavigateToAIConsulting,
  targetSection,
  setTargetSection,
  activeSection,
  setActiveSection
}) {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`relative transition-colors duration-700 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Hero Section */}
      <Hero 
        parallaxOffset={parallaxOffset}
        onNavigateToCommunity={onNavigateToCommunity}
        onNavigateToAIConsulting={onNavigateToAIConsulting}
      />

      {/* About Section */}
      <About 
        isDark={isDark}
        parallaxOffset={parallaxOffset}
        onNavigateToAbout={onNavigateToAbout}
      />

      {/* Services Section */}
      <Services 
        isDark={isDark}
        parallaxOffset={parallaxOffset}
      />

      {/* Contact Section */}
      <Contact 
        isDark={isDark}
      />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        .bg-green-background {
          background: linear-gradient(
            135deg,
            #2d6a4f 0%,
            #40916c 50%,
            #2d6a4f 100%
          );
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }

        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -30px);
          }
          50% {
            transform: translate(0, -50px);
          }
          75% {
            transform: translate(-30px, -30px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f3f4f6'};
        }

        ::-webkit-scrollbar-thumb {
          background: #40916c;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2d6a4f;
        }
      `}</style>
    </div>
  );
}