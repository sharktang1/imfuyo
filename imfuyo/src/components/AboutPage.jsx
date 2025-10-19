// ==========================================
// src/pages/About/AboutPage.jsx
// ==========================================
import React, { useState, useEffect, useRef } from 'react';
import AboutNavbar from './aboutComps/AboutNavbar';
import AboutMobileMenu from './aboutComps/AboutMobileMenu';
import AboutWhoWeAre from './aboutComps/AboutWhoWeAre';
import AboutMissionVision from './aboutComps/AboutMissionVision';
import AboutTeam from './aboutComps/AboutTeam';
import AboutAwards from './aboutComps/AboutAwards';
import AboutPartners from './aboutComps/AboutPartners';
import AboutTestimonials from './aboutComps/AboutTestimonials';
import AboutFooter from './aboutComps/AboutFooter';

export default function AboutPage({ isDark, setIsDark, onBack }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const isScrollingRef = useRef(true);

  const sections = ['who-we-are', 'mission-vision', 'team', 'awards', 'partners', 'testimonials', 'footer'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Disable scrolling when modal is open
  useEffect(() => {
    isScrollingRef.current = !isModalOpen;
  }, [isModalOpen]);

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
        target.closest('[data-no-scroll]');
      
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
  }, [activeSection, sections.length]);

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
      ref={containerRef} 
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-gray-900' : ''}`} 
      style={{ height: '100vh' }}
    >
      <AboutMobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        isDark={isDark} 
        setIsDark={setIsDark} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {activeSection !== 6 && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
          <AboutNavbar 
            isDark={isDark} 
            setIsDark={setIsDark} 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
            onBack={onBack} 
          />
        </div>
      )}

      <div className="relative w-full h-full">
        <div style={{ zIndex: activeSection === 0 ? 40 : 0 }}>
          <AboutWhoWeAre isActive={activeSection === 0} isDark={isDark} parallaxOffset={parallaxOffset} />
        </div>
        <div style={{ zIndex: activeSection === 1 ? 40 : 0 }}>
          <AboutMissionVision isActive={activeSection === 1} isDark={isDark} parallaxOffset={parallaxOffset} />
        </div>
        <div style={{ zIndex: activeSection === 2 ? 40 : 0, position: 'relative' }}>
          <AboutTeam 
            isActive={activeSection === 2} 
            isDark={isDark} 
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div style={{ zIndex: activeSection === 3 ? 40 : 0 }}>
          <AboutAwards isActive={activeSection === 3} isDark={isDark} />
        </div>
        <div style={{ zIndex: activeSection === 4 ? 40 : 0 }}>
          <AboutPartners isActive={activeSection === 4} isDark={isDark} />
        </div>
        <div style={{ zIndex: activeSection === 5 ? 40 : 0 }}>
          <AboutTestimonials isActive={activeSection === 5} isDark={isDark} />
        </div>
        <div style={{ zIndex: activeSection === 6 ? 40 : 0 }}>
          <AboutFooter isActive={activeSection === 6} isDark={isDark} setActiveSection={setActiveSection} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow: hidden;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}