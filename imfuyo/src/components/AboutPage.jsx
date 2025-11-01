import React, { useState, useEffect, useRef } from 'react';
import AboutWhoWeAre from './aboutComps/AboutWhoWeAre';
import AboutMissionVision from './aboutComps/AboutMissionVision';
import AboutTeam from './aboutComps/AboutTeam';
import AboutAwards from './aboutComps/AboutAwards';
import AboutPartners from './aboutComps/AboutPartners';
import AboutTestimonials from './aboutComps/AboutTestimonials';

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
  const sectionRefs = useRef([]);
  const lastScrollRef = useRef(0);
  const isScrollingRef = useRef(true);

  const sections = ['who-we-are', 'mission-vision', 'team', 'awards', 'partners', 'testimonials'];

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, []);

  // Enable body scrolling and set up natural scroll behavior
  useEffect(() => {
    // Enable body scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  // Handle target section navigation
  useEffect(() => {
    if (targetSection) {
      const sectionIndex = sections.indexOf(targetSection);
      if (sectionIndex !== -1 && sectionRefs.current[sectionIndex]) {
        sectionRefs.current[sectionIndex].scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setTargetSection(null);
      }
    }
  }, [targetSection, setTargetSection, sections]);

  // Disable scrolling when any modal is open
  useEffect(() => {
    isScrollingRef.current = !isModalOpen && !isVideoModalOpen;
  }, [isModalOpen, isVideoModalOpen]);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && index !== activeSection) {
            setActiveSection(index);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [activeSection, setActiveSection]);

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

  return (
    <div 
      ref={containerRef} 
      className={`relative transition-colors duration-700 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Who We Are Section */}
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="relative w-full min-h-screen"
      >
        <AboutWhoWeAre 
          isActive={activeSection === 0} 
          isDark={isDark} 
          parallaxOffset={parallaxOffset} 
        />
      </div>

      {/* Mission & Vision Section */}
      <div 
        ref={el => sectionRefs.current[1] = el}
        className="relative w-full min-h-screen"
      >
        <AboutMissionVision 
          isActive={activeSection === 1} 
          isDark={isDark} 
          parallaxOffset={parallaxOffset} 
        />
      </div>

      {/* Team Section */}
      <div 
        ref={el => sectionRefs.current[2] = el}
        className="relative w-full min-h-screen"
      >
        <AboutTeam 
          isActive={activeSection === 2} 
          isDark={isDark} 
        />
      </div>

      {/* Awards Section */}
      <div 
        ref={el => sectionRefs.current[3] = el}
        className="relative w-full min-h-screen"
      >
        <AboutAwards 
          isActive={activeSection === 3} 
          isDark={isDark} 
        />
      </div>

      {/* Partners Section */}
      <div 
        ref={el => sectionRefs.current[4] = el}
        className="relative w-full min-h-screen"
      >
        <AboutPartners 
          isActive={activeSection === 4} 
          isDark={isDark} 
        />
      </div>

      {/* Testimonials Section */}
      <div 
        ref={el => sectionRefs.current[5] = el}
        className="relative w-full min-h-screen"
      >
        <AboutTestimonials 
          isActive={activeSection === 5} 
          isDark={isDark}
          setIsVideoModalOpen={setIsVideoModalOpen}
        />
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
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

        /* Custom scrollbar styles */
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

        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}