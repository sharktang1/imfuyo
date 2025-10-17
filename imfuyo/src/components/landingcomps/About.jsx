import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

const About = ({ 
  isActive, 
  transformClass, 
  parallaxOffset, 
  isDark, 
  setActiveSection, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  activeSection, 
  setIsDark 
}) => {
  const [imagePositions, setImagePositions] = useState({ top: false, bottom: false });
  const [inView, setInView] = useState(false);
  const aboutRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Scroll animation for images - bringing cards together and dispersing
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = aboutRef.current;
      if (!aboutSection) return;

      const aboutRect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in view
      const aboutInView = aboutRect.top < windowHeight * 0.8 && aboutRect.bottom > 0;
      setInView(aboutInView);
      
      // Calculate scroll progress within the about section
      if (aboutInView) {
        // Progress from 0 to 1 as user scrolls through the section
        const sectionTop = aboutRect.top;
        const sectionHeight = aboutRect.height;
        const scrollProgress = 1 - Math.max(0, Math.min(1, sectionTop / (windowHeight * 0.8)));
        
        // Images come together at different stages
        // Top image appears first (at 30% scroll progress)
        // Bottom image appears second (at 60% scroll progress)
        setImagePositions({
          top: scrollProgress > 0.3,
          bottom: scrollProgress > 0.6
        });
      } else if (aboutRect.top > windowHeight) {
        // Section hasn't been reached yet - reset to initial state
        setImagePositions({ top: false, bottom: false });
      } else {
        // Section has been scrolled past - keep images visible
        setImagePositions({ top: true, bottom: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`absolute inset-0 transition-all duration-1000 ease-out ${transformClass}`}
      ref={aboutRef}
    >
      <section 
        className={`relative w-full h-screen flex flex-col transition-colors duration-700 ${
          isDark ? 'bg-gray-800' : 'bg-[#faf8f5]'
        }`}
      >
        {/* Navbar integrated in about */}
        <div className="relative z-10">
          <Navbar 
            isDark={isDark}
            setIsDark={setIsDark}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* About Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Side - Animated Image Cards */}
              <div ref={imageContainerRef} className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                {/* Back Image - Top Right */}
                <div 
                  className={`absolute rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out ${
                    imagePositions.top 
                      ? 'top-0 right-0 w-[55%] sm:w-[60%] h-[60%] sm:h-[70%] opacity-100 rotate-0' 
                      : 'top-1/2 right-[-20%] w-[45%] sm:w-[50%] h-[50%] sm:h-[60%] opacity-0 rotate-12'
                  }`}
                  style={{ 
                    transitionDelay: imagePositions.top ? '0.2s' : '0s',
                    zIndex: 20,
                    transform: imagePositions.top && parallaxOffset 
                      ? `translate(${parallaxOffset.x * 0.3}px, ${parallaxOffset.y * 0.3}px) rotate(0deg)` 
                      : undefined
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=900&fit=crop" 
                    alt="Farmers in field"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/20 to-transparent"></div>
                </div>

                {/* Front Image - Bottom Left */}
                <div 
                  className={`absolute rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out ${
                    imagePositions.bottom
                      ? 'bottom-0 left-0 w-[60%] sm:w-[65%] h-[55%] sm:h-[65%] opacity-100 rotate-0'
                      : 'bottom-1/2 left-[-20%] w-[50%] sm:w-[55%] h-[45%] sm:h-[55%] opacity-0 -rotate-12'
                  }`}
                  style={{ 
                    transitionDelay: imagePositions.bottom ? '0.4s' : '0s',
                    zIndex: 30,
                    transform: imagePositions.bottom && parallaxOffset
                      ? `translate(${parallaxOffset.x * 0.2}px, ${parallaxOffset.y * 0.2}px) rotate(0deg)`
                      : undefined
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=800&fit=crop" 
                    alt="Agricultural innovation"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/20 to-transparent"></div>
                </div>

                {/* Decorative glow effect */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#40916c]/10 rounded-full blur-3xl transition-all duration-1000 ${
                  inView ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
                }`}></div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-4 sm:space-y-6">
                <div className={`transform transition-all duration-1000 ${
                  inView 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-10 opacity-0'
                }`}>
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    About <span style={{ color: '#6E260E' }}>Imfuyo</span>
                  </h2>
                </div>

                <div className={`space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed transition-all duration-1000 delay-300 ${
                  inView 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-10 opacity-0'
                } ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <p>
                    Imfuyo is a pioneering agricultural fintech platform dedicated to transforming the lives of smallholder farmers across Africa through innovative financial solutions and strategic partnerships.
                  </p>

                  <p>
                    We bridge the gap between traditional agriculture and modern financial services, enabling farmers to access the resources they need to thrive and build prosperous communities.
                  </p>
                </div>

                {/* Get to Know Us Button */}
                <div className={`transform transition-all duration-1000 delay-500 ${
                  inView 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}>
                  <button className="group flex items-center justify-center sm:justify-start space-x-2 bg-[#40916c] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-[#2d6a4f] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform mt-4 sm:mt-6 w-full sm:w-auto text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <span>Get to Know Us More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;