import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

const Services = ({ 
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
  const [currentService, setCurrentService] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [prevService, setPrevService] = useState(0);
  const autoSwitchRef = useRef(null);
  const [inView, setInView] = useState(false);
  const servicesRef = useRef(null);

  const services = [
    { 
      title: 'Financial Education', 
      description: 'Community-based programs covering financial literacy, loan understanding, and livestock insurance fundamentals to empower farmers with knowledge.',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760769497/Gemini_Generated_Image_o3nazpo3nazpo3na_p5xwyd.png',
      color: '#60a5fa'
    },
    { 
      title: 'Livestock Insurance', 
      description: 'Comprehensive insurance products protecting farmers against livestock losses and production challenges, ensuring sustainable farming practices.',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760769580/Gemini_Generated_Image_zc8ouzc8ouzc8ouz_xppvel.png',
      color: '#34d399'
    },
    { 
      title: 'Agricultural Credit', 
      description: 'Flexible financing solutions tailored to farming needs with competitive rates and seamless application processes for growth and expansion.',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760769440/Gemini_Generated_Image_kgcvw9kgcvw9kgcv_gyn6gg.png',
      color: '#fbbf24'
    }
  ];

  // Auto-switch effect
  useEffect(() => {
    if (!autoSwitch) return;

    autoSwitchRef.current = setInterval(() => {
      setPrevService(currentService);
      setCurrentService(prev => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(autoSwitchRef.current);
  }, [autoSwitch, services.length, currentService]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const section = servicesRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const isInView = rect.top < windowHeight * 0.8 && rect.bottom > 0;
      setInView(isInView);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextService = () => {
    setAutoSwitch(false);
    setPrevService(currentService);
    setCurrentService(prev => (prev + 1) % services.length);
  };

  return (
    <div 
      className={`absolute inset-0 transition-all duration-1000 ease-out ${transformClass}`}
      ref={servicesRef}
    >
      <section 
        className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
          isDark 
            ? 'bg-gray-900' 
            : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-200'
          }`} style={{ animation: 'drift 8s ease-in-out infinite' }}></div>
          <div className={`absolute bottom-0 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-teal-600' : 'bg-teal-200'
          }`} style={{ animation: 'drift 10s ease-in-out infinite', animationDelay: '-2s' }}></div>
        </div>

        {/* Navbar */}
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

        {/* Background Gradient - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
              : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
          }`}></div>
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                idx === currentService 
                  ? 'opacity-20' 
                  : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: idx === currentService 
                  ? 'scale(1)' 
                  : 'scale(1.05)'
              }}
            ></div>
          ))}
        </div>

        {/* Main Content - Full Height */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-between">

            {/* Service Display - Grid with Image Container */}
            <div className="flex-1 flex items-center justify-center w-full pt-8 sm:pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full h-full">
                
                {/* Image Container - Left Side */}
                <div className="relative h-64 sm:h-96 lg:h-[400px]">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className={`absolute rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-1000 ease-out inset-0 ${
                        idx === currentService 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95'
                      }`}
                    >
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/10 to-transparent"></div>
                    </div>
                  ))}
                  
                  {/* Subtle glow effect */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#40916c]/10 rounded-full blur-3xl transition-all duration-1000 ${
                    inView ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
                  }`}></div>
                </div>

                {/* Service Content - Right Side */}
                <div className="space-y-6 flex flex-col justify-center">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className={`transition-all duration-1000 ease-out transform ${
                        idx === currentService 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8 hidden'
                      }`}
                    >
                      {/* Service Title */}
                      <h3 
                        className={`text-3xl sm:text-4xl font-bold mb-4 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {service.title}
                      </h3>

                      {/* Service Description */}
                      <p 
                        className={`text-base sm:text-lg leading-relaxed max-w-lg mb-6 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {service.description}
                      </p>

                      {/* Service Indicator Dots */}
                      <div className="flex items-center space-x-3 mb-6">
                        {services.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => {
                              setCurrentService(dotIdx);
                              setAutoSwitch(false);
                            }}
                            className={`transition-all duration-300 rounded-full ${
                              dotIdx === currentService
                                ? `w-8 h-2 ${
                                    isDark ? 'bg-white' : 'bg-gray-900'
                                  }`
                                : `w-2 h-2 ${
                                    isDark ? 'bg-gray-600' : 'bg-gray-400'
                                  }`
                            }`}
                          ></button>
                        ))}
                      </div>

                      {/* Buttons Section - Below Content */}
                      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transform transition-all duration-1000 delay-300 ${
                        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}>
                        {/* Next Service Button */}
                        <button 
                          onClick={handleNextService}
                          className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-110 ${
                            isDark 
                              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                              : 'bg-white/50 hover:bg-white/70 text-gray-900 border border-white/50'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* View All Services & Quotes Button */}
                        <button 
                          className="group relative inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #40916c 0%, #2d6a4f 100%)',
                            fontFamily: "'Outfit', sans-serif"
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                          
                          <span className="relative">View All & Quotes</span>
                          <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

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
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.05);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Services;