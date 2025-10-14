import React, { useState, useEffect, useRef } from 'react';
import { Leaf, X, ArrowRight, Target, Users, Moon, Sun, Menu } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [typedText, setTypedText] = useState('');
  const [imagePositions, setImagePositions] = useState({ top: false, bottom: false });
  const [inViewSections, setInViewSections] = useState({
    about: false,
    impact: false
  });

  const aboutRef = useRef(null);
  const impactRef = useRef(null);
  const imageContainerRef = useRef(null);

  const fullText = "An AgriFintech Merging agriculture with modern Data driven analytics and technologies.";

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const aboutSection = aboutRef.current;
      const impactSection = impactRef.current;
      const scrollPosition = window.scrollY;

      setScrolled(scrollPosition > 20);

      // Determine current section
      if (scrollPosition < heroHeight - 100) {
        setCurrentSection('hero');
      } else if (aboutSection && scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight - 100) {
        setCurrentSection('about');
      } else if (impactSection) {
        setCurrentSection('impact');
      }

      // Check if sections are in view
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutInView = aboutRect.top < window.innerHeight * 0.8 && aboutRect.bottom > 0;
        setInViewSections(prev => ({ ...prev, about: aboutInView }));
        
        // Calculate image positions based on scroll within about section
        if (aboutInView) {
          const progress = 1 - Math.max(0, Math.min(1, aboutRect.top / (window.innerHeight * 0.8)));
          setImagePositions({
            top: progress > 0.3,
            bottom: progress > 0.6
          });
        } else {
          setImagePositions({ top: false, bottom: false });
        }
      }

      if (impactSection) {
        const impactRect = impactSection.getBoundingClientRect();
        const impactInView = impactRect.top < window.innerHeight * 0.8 && impactRect.bottom > 0;
        setInViewSections(prev => ({ ...prev, impact: impactInView }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setTextVisible(true), 300);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!textVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [textVisible]);

  const getNavbarStyle = () => {
    if (currentSection === 'hero') {
      return {
        bg: scrolled ? 'bg-[#2d6a4f]/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent',
        text: 'text-[#f8f9fa]',
        hoverBg: 'hover:bg-white/15'
      };
    } else if (currentSection === 'about') {
      return {
        bg: isDark ? 'bg-gray-800/95 backdrop-blur-xl shadow-lg' : 'bg-white/95 backdrop-blur-xl shadow-lg',
        text: isDark ? 'text-gray-200' : 'text-gray-900',
        hoverBg: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg' : 'bg-[#f5f1ed]/95 backdrop-blur-xl shadow-lg',
        text: isDark ? 'text-gray-200' : 'text-gray-900',
        hoverBg: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200/50'
      };
    }
  };

  const navStyle = getNavbarStyle();
  const navItems = ['Solutions', 'About', 'Impact', 'Contact'];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-gray-900' : ''}`}>
      {/* Hero Section with Constant Green Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Constant green background */}
        <div className="absolute inset-0 bg-green-background"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-4 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-[#74c69d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-4 w-56 h-56 sm:top-40 sm:right-10 sm:w-96 sm:h-96 bg-[#52b788] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-56 h-56 sm:-bottom-20 sm:w-96 sm:h-96 bg-[#95d5b2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Navbar - Mobile Optimized */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navStyle.bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo - Mobile Optimized */}
              <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#74c69d] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-[#74c69d] to-[#95d5b2] p-2 sm:p-3 rounded-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>
                  Imfuyo
                </span>
              </div>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.toLowerCase()}`}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 font-medium rounded-2xl transition-all duration-300 backdrop-blur-sm ${navStyle.text} ${navStyle.hoverBg}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-3">
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                    currentSection === 'hero'
                      ? 'bg-white/15 hover:bg-white/25 text-white'
                      : isDark 
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                
                <button className="flex items-center space-x-2 bg-[#40916c] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-[#2d6a4f] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Mobile menu button - Simplified without theme toggle */}
              <div className="flex items-center space-x-2 md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-xl transition-colors relative z-50 ${navStyle.text} ${navStyle.hoverBg}`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Enhanced with Theme Toggle */}
        <div 
          className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
            mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-[#2d6a4f]/95 backdrop-blur-2xl transition-opacity duration-500 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className={`relative h-full flex items-center justify-center transition-all duration-500 transform ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="text-center space-y-6 px-4 w-full max-w-sm">
              {/* Mobile Logo */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="bg-gradient-to-br from-[#74c69d] to-[#95d5b2] p-3 rounded-3xl">
                  <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold text-[#f8f9fa]" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>
                  Imfuyo
                </span>
              </div>

              {/* Navigation Items */}
              <div className="space-y-3">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block group"
                  >
                    <span className="relative block text-xl font-semibold text-[#f8f9fa] px-6 py-3 transition-all duration-300 group-hover:text-[#95d5b2] group-hover:bg-white/10 rounded-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {item}
                    </span>
                  </a>
                ))}
              </div>

              {/* Theme Toggle in Mobile Menu */}
              <div className="pt-2">
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="w-full flex items-center justify-center space-x-3 bg-white/15 text-white px-6 py-4 rounded-full font-semibold hover:bg-white/25 transition-all duration-300"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {isDark ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Switch to Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-2">
                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-[#f8f9fa] text-[#2d6a4f] px-8 py-4 rounded-full font-bold hover:bg-[#95d5b2] transition-all duration-300 shadow-2xl text-base"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content - Mobile Optimized */}
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="max-w-6xl mx-auto text-center w-full">
            <div className={`transition-all duration-1000 transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#f8f9fa] mb-4 sm:mb-6 leading-tight tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Welcome to
                <br />
                <span style={{ color: '#6E260E' }}>
                  Imfuyo
                </span>
              </h1>

              <p 
                className="text-lg sm:text-xl lg:text-2xl text-[#d8f3dc] max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed min-h-[3rem] sm:min-h-[4rem] px-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {typedText}
                <span className="animate-blink">|</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-12 sm:mt-16">
                <button className="group flex items-center justify-center space-x-2 bg-[#f8f9fa] text-[#2d6a4f] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-[#95d5b2] hover:text-[#1b4332] transition-all duration-300 shadow-2xl hover:scale-105 transform w-full sm:w-auto text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 sm:px-8 sm:py-4 text-[#f8f9fa] font-bold rounded-full border-2 border-[#f8f9fa]/40 hover:bg-white/15 hover:border-[#f8f9fa]/60 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Mobile Optimized */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
          isDark ? 'bg-gray-800' : 'bg-[#faf8f5]'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - Mobile Optimized Image Cards */}
            <div ref={imageContainerRef} className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Back Image */}
              <div 
                className={`absolute rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out ${
                  imagePositions.top 
                    ? 'top-0 right-0 w-[55%] sm:w-[60%] h-[60%] sm:h-[70%] opacity-100 rotate-0' 
                    : 'top-1/2 right-[-20%] w-[45%] sm:w-[50%] h-[50%] sm:h-[60%] opacity-0 rotate-12'
                }`}
                style={{ 
                  transitionDelay: imagePositions.top ? '0.2s' : '0s',
                  zIndex: 20
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=900&fit=crop" 
                  alt="Farmers in field"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/20 to-transparent"></div>
              </div>

              {/* Front Image */}
              <div 
                className={`absolute rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out ${
                  imagePositions.bottom
                    ? 'bottom-0 left-0 w-[60%] sm:w-[65%] h-[55%] sm:h-[65%] opacity-100 rotate-0'
                    : 'bottom-1/2 left-[-20%] w-[50%] sm:w-[55%] h-[45%] sm:h-[55%] opacity-0 -rotate-12'
                }`}
                style={{ 
                  transitionDelay: imagePositions.bottom ? '0.4s' : '0s',
                  zIndex: 30
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=800&fit=crop" 
                  alt="Agricultural innovation"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/20 to-transparent"></div>
              </div>

              {/* Decorative glow */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#40916c]/10 rounded-full blur-3xl transition-all duration-1000 ${
                inViewSections.about ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
              }`}></div>
            </div>

            {/* Right Side - Mobile Optimized Content */}
            <div className="space-y-4 sm:space-y-6">
              <div className={`transform transition-all duration-1000 ${
                inViewSections.about 
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
                inViewSections.about 
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
                inViewSections.about 
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
      </section>

      {/* Impact Section - Mobile Optimized */}
      <section 
        id="impact" 
        ref={impactRef}
        className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
          isDark ? 'bg-gray-900' : 'bg-[#f5f1ed]'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            inViewSections.impact 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}>
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our <span style={{ color: '#6E260E' }}>Impact</span>
            </h2>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto transition-colors duration-500 px-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              Making a real difference in communities across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { number: '10K+', label: 'Farmers Empowered' },
              { number: '$5M+', label: 'Loans Disbursed' },
              { number: '15+', label: 'Countries Reached' }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl text-center transition-all duration-500 border transform ${
                  inViewSections.impact 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-20 opacity-0 scale-95'
                } ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
                    : 'bg-white border-gray-200 hover:shadow-2xl'
                } hover:scale-105`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#40916c] mb-2 sm:mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {stat.number}
                </div>
                <p className={`text-base sm:text-lg font-medium transition-colors duration-500 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow-x: hidden;
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