import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Navbar from './landingcomps/Navbar';
import Hero from './landingcomps/Hero';
import About from './landingcomps/About';
import Services from './landingcomps/Services';
import Contact from './landingcomps/Contact';
import Footer from './landingcomps/Footer';
import MobileMenu from './landingcomps/MobileMenu';

// Floating WhatsApp Button Component
const FloatingWhatsAppButton = ({ isDark, onClick, activeSection }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setHasShownInitial(true);
      
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  // Hide WhatsApp button on footer section
  if (activeSection === 4) return null;
  
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 pointer-events-auto">
      {/* Tooltip Message */}
      <div 
        className={`absolute bottom-20 right-0 transition-all duration-500 transform ${
          showTooltip 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{
          maxWidth: '280px',
          minWidth: '240px'
        }}
      >
        <div 
          className={`relative rounded-2xl p-4 shadow-2xl ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
          style={{
            animation: showTooltip ? 'bounce-in 0.5s ease-out' : 'none'
          }}
        >
          <button
            onClick={() => setShowTooltip(false)}
            className={`absolute -top-2 -right-2 p-1.5 rounded-full transition-all duration-200 ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <X className="w-3 h-3" />
          </button>

          <p 
            className={`text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            💬 Reach out to us on WhatsApp!
          </p>
          
          <div 
            className={`absolute -bottom-2 right-8 w-4 h-4 transform rotate-45 ${
              isDark ? 'bg-gray-800 border-r border-b border-gray-700' : 'bg-white border-r border-b border-gray-200'
            }`}
          />
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => hasShownInitial && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)'
        }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-75 bg-green-400"
          style={{ animationDuration: '2s' }}
        />
        
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>

        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </button>
    </div>
  );
};

export default function LandingPage({ onNavigateToAbout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [transitionDir, setTransitionDir] = useState('down');
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
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
    setShowContactModal,
    onNavigateToAbout
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254700000000?text=Hello%20Imfuyo!%20I%20have%20a%20question', '_blank');
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

      {/* Fixed Navbar - Always visible except on footer */}
      {activeSection !== 4 && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
          <Navbar 
            isHero={activeSection === 0}
            isDark={isDark}
            setIsDark={setIsDark}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      )}

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
            hideNavbar={true}
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
            hideNavbar={true}
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
            hideNavbar={true}
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
            hideNavbar={true}
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

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton 
        isDark={isDark}
        onClick={handleWhatsAppClick}
        activeSection={activeSection}
      />

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

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        @media (max-width: 768px) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
}