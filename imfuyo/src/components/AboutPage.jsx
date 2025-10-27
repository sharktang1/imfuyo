import React, { useState, useEffect, useRef } from 'react';
import AboutWhoWeAre from './aboutComps/AboutWhoWeAre';
import AboutMissionVision from './aboutComps/AboutMissionVision';
import AboutTeam from './aboutComps/AboutTeam';
import AboutAwards from './aboutComps/AboutAwards';
import AboutPartners from './aboutComps/AboutPartners';
import AboutTestimonials from './aboutComps/AboutTestimonials';
import AboutFooter from './aboutComps/AboutFooter';

// Scroll Indicator Component
const ScrollIndicator = ({ isDark, isFooter }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show indicator after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Hide indicator after 7 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Text */}
        <p 
          className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : isFooter ? 'text-gray-200' : 'text-gray-700'
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {isFooter ? 'Back to top' : 'Scroll to explore'}
        </p>

        {/* Vertical Line with Animated Dot */}
        <div className="relative flex flex-col items-center">
          {/* Line */}
          <div 
            className={`w-0.5 h-12 ${
              isDark ? 'bg-gray-600' : isFooter ? 'bg-gray-300' : 'bg-gray-400'
            }`}
          />
          
          {/* Animated Dot */}
          <div 
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-[#40916c]' : 'bg-[#40916c]'
            }`}
            style={{
              animation: isFooter ? 'scroll-up 2s ease-in-out infinite' : 'scroll-down 2s ease-in-out infinite',
              top: isFooter ? '100%' : '0%'
            }}
          />
        </div>

        {/* Arrow */}
        <div className={`transform ${isFooter ? 'rotate-180' : ''}`}>
          <svg 
            className={`w-4 h-4 ${
              isDark ? 'text-gray-400' : isFooter ? 'text-gray-300' : 'text-gray-600'
            }`}
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage({ 
  isDark, 
  setIsDark, 
  targetSection,
  setTargetSection,
  activeSection,
  setActiveSection
}) {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const containerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const isScrollingRef = useRef(true);

  const sections = ['who-we-are', 'mission-vision', 'team', 'awards', 'partners', 'testimonials', 'footer'];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle target section navigation
  useEffect(() => {
    if (targetSection) {
      const sectionIndex = sections.indexOf(targetSection);
      if (sectionIndex !== -1) {
        setActiveSection(sectionIndex);
        setTargetSection(null);
      }
    }
  }, [targetSection, setTargetSection, sections, setActiveSection]);

  // Disable scrolling when any modal is open
  useEffect(() => {
    isScrollingRef.current = !isModalOpen && !isVideoModalOpen;
  }, [isModalOpen, isVideoModalOpen]);

  // Wheel event handler for section transitions
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't handle scroll if scrolling is disabled (modal open)
      if (!isScrollingRef.current) return;

      // Check if the target is within an interactive element
      const target = e.target;
      const isInteractiveElement = 
        target.closest('[role="dialog"]') || 
        target.closest('.team-card') ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('iframe') ||
        target.closest('[data-no-scroll]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'IFRAME';
      
      // Allow normal interaction with interactive elements
      if (isInteractiveElement) {
        return;
      }
      
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollRef.current < 900) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      let newSection = activeSection + direction;
      newSection = Math.max(0, Math.min(newSection, sections.length - 1));

      if (newSection !== activeSection) {
        setActiveSection(newSection);
        lastScrollRef.current = now;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeSection, sections.length, setActiveSection]);

  // Parallax mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Get transform classes for section transitions
  const getSlideTransform = (sectionIndex) => {
    if (sectionIndex < activeSection) {
      return 'blur-lg scale-95 opacity-0 -translate-y-20';
    } else if (sectionIndex > activeSection) {
      return 'blur-lg scale-95 opacity-0 translate-y-20';
    }
    return 'blur-none scale-100 opacity-100 translate-y-0';
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`} 
      style={{ height: '100vh' }}
    >
      {/* Sections Container */}
      <div className="relative w-full h-full overflow-hidden">
        
        {/* Who We Are Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(0)}`}
          style={{ 
            zIndex: activeSection === 0 ? 40 : 0,
            pointerEvents: activeSection === 0 ? 'auto' : 'none'
          }}
        >
          <AboutWhoWeAre 
            isActive={activeSection === 0} 
            isDark={isDark} 
            parallaxOffset={parallaxOffset} 
          />
        </div>

        {/* Mission & Vision Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(1)}`}
          style={{ 
            zIndex: activeSection === 1 ? 40 : 0,
            pointerEvents: activeSection === 1 ? 'auto' : 'none'
          }}
        >
          <AboutMissionVision 
            isActive={activeSection === 1} 
            isDark={isDark} 
            parallaxOffset={parallaxOffset} 
          />
        </div>

        {/* Team Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(2)}`}
          style={{ 
            zIndex: activeSection === 2 ? 40 : 0,
            pointerEvents: activeSection === 2 ? 'auto' : 'none'
          }}
        >
          <AboutTeam 
            isActive={activeSection === 2} 
            isDark={isDark} 
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        {/* Awards Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(3)}`}
          style={{ 
            zIndex: activeSection === 3 ? 40 : 0,
            pointerEvents: activeSection === 3 ? 'auto' : 'none'
          }}
        >
          <AboutAwards 
            isActive={activeSection === 3} 
            isDark={isDark} 
          />
        </div>

        {/* Partners Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(4)}`}
          style={{ 
            zIndex: activeSection === 4 ? 40 : 0,
            pointerEvents: activeSection === 4 ? 'auto' : 'none'
          }}
        >
          <AboutPartners 
            isActive={activeSection === 4} 
            isDark={isDark} 
          />
        </div>

        {/* Testimonials Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(5)}`}
          style={{ 
            zIndex: activeSection === 5 ? 40 : 0,
            pointerEvents: activeSection === 5 ? 'auto' : 'none'
          }}
        >
          <AboutTestimonials 
            isActive={activeSection === 5} 
            isDark={isDark}
            setIsVideoModalOpen={setIsVideoModalOpen}
          />
        </div>

        {/* Footer Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(6)}`}
          style={{ 
            zIndex: activeSection === 6 ? 40 : 0,
            pointerEvents: activeSection === 6 ? 'auto' : 'none'
          }}
        >
          <AboutFooter 
            isActive={activeSection === 6} 
            isDark={isDark} 
          />
        </div>
      </div>

      {/* Scroll Indicator - Show on all sections except footer */}
      {activeSection !== 6 && (
        <ScrollIndicator 
          key={`scroll-${activeSection}`}
          isDark={isDark}
          isFooter={false}
        />
      )}

      {/* Footer Scroll Indicator - Show only on footer */}
      {activeSection === 6 && (
        <ScrollIndicator 
          key={`scroll-footer-${activeSection}`}
          isDark={isDark}
          isFooter={true}
        />
      )}

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow: hidden;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.05); 
          }
        }

        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(48px);
            opacity: 0;
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-48px);
            opacity: 0;
          }
        }

        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}