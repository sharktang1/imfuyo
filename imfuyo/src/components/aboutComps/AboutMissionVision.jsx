import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Target, Rocket } from 'lucide-react';

export default function AboutMissionVision({ 
  isActive, 
  isDark, 
  parallaxOffset 
}) {
  const [inView, setInView] = useState(false);
  const missionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = missionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const isInViewCheck = rect.top < windowHeight * 0.8 && rect.bottom > 0;
      setInView(isInViewCheck && isActive);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  return (
    <section 
      className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}
      ref={missionRef}
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
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center h-full">
            
            {/* Left Side - Lottie Animation */}
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
                  src="https://lottie.host/8c8b6bc9-31b7-4680-b4e6-b43421a31c88/OGQ7AOjPjh.lottie"
                  loop
                  autoplay
                  className="w-full h-full max-w-full"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`lg:col-span-5 space-y-12 transform transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              
              {/* Mission Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Target className={`w-6 h-6 flex-shrink-0 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} strokeWidth={2.5} />
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`} 
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Our Mission
                  </h3>
                </div>
                <p 
                  className={`text-sm sm:text-base leading-relaxed max-w-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  To revolutionize agricultural financing by providing accessible, technology-driven solutions that empower African farmers.
                </p>
              </div>

              {/* Vision Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Rocket className={`w-6 h-6 flex-shrink-0 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} strokeWidth={2.5} />
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`} 
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Our Vision
                  </h3>
                </div>
                <p 
                  className={`text-sm sm:text-base leading-relaxed max-w-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  To become Africa's leading AgriFintech platform, creating a thriving ecosystem where every farmer succeeds.
                </p>
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
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}