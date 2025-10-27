import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowRight } from 'lucide-react';

export default function About({ parallaxOffset, isDark, onNavigateToAbout }) {
  const [inView, setInView] = useState(false);
  const [buttonPulse, setButtonPulse] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={aboutRef}
      className={`relative w-full min-h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-32 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-25 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-200'
        }`} style={{ animation: 'drift 8s ease-in-out infinite' }}></div>
        <div className={`absolute bottom-0 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-teal-600' : 'bg-teal-200'
        }`} style={{ animation: 'drift 10s ease-in-out infinite', animationDelay: '-2s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center h-full">
            
            {/* Left Side - Lottie */}
            <div className={`lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[500px] transform transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              
              {/* Glow effect behind animation */}
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 -z-10 ${
                isDark ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : 'bg-gradient-to-br from-emerald-300 to-teal-300'
              }`} style={{ 
                width: '120%', 
                height: '120%', 
                left: '-10%', 
                top: '-10%',
                animation: 'pulse 4s ease-in-out infinite'
              }}></div>

              {/* Lottie Animation */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <DotLottieReact
                  src="https://lottie.host/05b0936a-e537-4168-ba9f-6dfe891a169b/5b4X2kO7xR.lottie"
                  loop
                  autoplay
                  className="w-full h-full max-w-full"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`lg:col-span-5 space-y-8 transform transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              
              {/* Heading */}
              <div className="space-y-2">
                <h2 
                  className={`text-5xl sm:text-6xl lg:text-6xl font-bold leading-tight ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  About <span style={{ color: '#6E260E' }}>Imfuyo</span>
                </h2>
                <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r from-[#40916c] to-emerald-500`}></div>
              </div>

              {/* Paragraph */}
              <p 
                className={`text-base sm:text-lg leading-relaxed max-w-md ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`} 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Imfuyo is a pioneering agricultural fintech platform bridging smallholder farmers and modern financial services across Africa. Through innovative solutions and data-driven technology, we empower farmers with the capital and tools they need to increase yields, build sustainable practices, and create lasting prosperity for their communities.
              </p>

              {/* CTA Button */}
              <div className={`pt-6 transform transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <button 
                  onClick={onNavigateToAbout}
                  className={`group relative inline-flex items-center space-x-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 ${
                    buttonPulse ? 'scale-105 shadow-xl' : 'scale-100 shadow-lg'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #40916c 0%, #2d6a4f 100%)',
                    fontFamily: "'Outfit', sans-serif",
                    boxShadow: buttonPulse ? '0 0 30px rgba(64, 145, 108, 0.5), 0 8px 16px rgba(0,0,0,0.15)' : '0 8px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  
                  <span className="relative">Know Us Better</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}