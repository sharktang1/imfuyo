import React, { useState, useEffect, useRef } from 'react';
import Navbar from './landingcomps/Navbar';
import Hero from './landingcomps/Hero';
import About from './landingcomps/About';
import Services from './landingcomps/Services';
import Contact from './landingcomps/Contact';
import Footer from './landingcomps/Footer';
import MobileMenu from './landingcomps/MobileMenu';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [transitionDir, setTransitionDir] = useState('down');
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const containerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const isScrollingRef = useRef(true);

  const sections = ['hero', 'about', 'services', 'contact', 'footer'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamic scroll effect
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrollingRef.current) return;
      
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollRef.current < 900) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      setTransitionDir(direction > 0 ? 'down' : 'up');

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
  }, [activeSection, sections.length]);

  // Handle contact modal state
  useEffect(() => {
    isScrollingRef.current = !showContactModal;
  }, [showContactModal]);

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

  const getSlideTransform = (sectionIndex) => {
    if (sectionIndex < activeSection) {
      return 'blur-lg scale-95 opacity-0 -translate-y-20';
    } else if (sectionIndex > activeSection) {
      return 'blur-lg scale-95 opacity-0 translate-y-20';
    }
    return 'blur-none scale-100 opacity-100 translate-y-0';
  };

  // Common props for all components
  const commonProps = {
    isDark,
    setIsDark,
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    setActiveSection,
    showContactModal,
    setShowContactModal
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-gray-900' : ''}`}
      style={{ height: '100vh', userSelect: 'none' }}
    >
      {/* Mobile Menu */}
      <MobileMenu 
        {...commonProps}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Sections Container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Hero Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(0)}`}
          style={{ 
            zIndex: activeSection === 0 ? 40 : 0,
            pointerEvents: activeSection === 0 ? 'auto' : 'none'
          }}
        >
          <Hero 
            {...commonProps}
            isActive={activeSection === 0}
            transformClass=""
            parallaxOffset={parallaxOffset}
          />
        </div>

        {/* About Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(1)}`}
          style={{ 
            zIndex: activeSection === 1 ? 40 : 0,
            pointerEvents: activeSection === 1 ? 'auto' : 'none'
          }}
        >
          <About 
            {...commonProps}
            isActive={activeSection === 1}
            transformClass=""
            parallaxOffset={parallaxOffset}
          />
        </div>

        {/* Services Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(2)}`}
          style={{ 
            zIndex: activeSection === 2 ? 40 : 0,
            pointerEvents: activeSection === 2 ? 'auto' : 'none'
          }}
        >
          <Services 
            {...commonProps}
            isActive={activeSection === 2}
            transformClass=""
            parallaxOffset={parallaxOffset}
          />
        </div>

        {/* Contact Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(3)}`}
          style={{ 
            zIndex: activeSection === 3 ? 40 : 0,
            pointerEvents: activeSection === 3 ? 'auto' : 'none'
          }}
        >
          <Contact 
            {...commonProps}
            isActive={activeSection === 3}
            transformClass=""
          />
        </div>

        {/* Footer Section */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${getSlideTransform(4)}`}
          style={{ 
            zIndex: activeSection === 4 ? 40 : 0,
            pointerEvents: activeSection === 4 ? 'auto' : 'none'
          }}
        >
          <Footer 
            {...commonProps}
            isActive={activeSection === 4}
            transformClass=""
          />
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow: hidden;
        }

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

        /* Improved mobile touch targets */
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Better scrolling on mobile */
        @media (max-width: 768px) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
}