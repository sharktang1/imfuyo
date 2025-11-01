import React, { useState, useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';


export default function AboutTeam({ isActive, isDark }) {
  const [inView, setInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const teamRef = useRef(null);

  const founder = {
    name: 'Benard Njathi',
    title: 'Founder & President',
    image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1761038091/1_hn32m4zAd8TrYJfS8wFFog_ul6ntd.jpg',
    bio: 'Benard Njathi is the visionary founder and driving force behind our AgriFintech revolution. With a deep passion for transforming African agriculture, he recognized the critical gap in accessible financing for smallholder farmers and set out to bridge it through innovative technology.',
    journey: 'Starting from humble beginnings, Benard has built a platform that serves thousands of farmers across Africa. His commitment to empowering agricultural communities has established new standards in digital financial services for the farming sector.'
  };

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = founder.image;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = teamRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setInView(rect.top < windowHeight * 0.8 && rect.bottom > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  return (
    <section 
      className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}
      ref={teamRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-300'
        }`} style={{ animation: 'float 8s ease-in-out infinite' }}></div>
        <div className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          isDark ? 'bg-teal-600' : 'bg-teal-300'
        }`} style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-3s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className={`text-center mb-6 transform transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              The Man Behind the Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Side - Founder Image */}
            <div className={`lg:col-span-5 relative transform transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              
              {/* Glow effect behind image */}
              <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-30 -z-10 ${
                isDark ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : 'bg-gradient-to-br from-emerald-300 to-teal-300'
              }`} style={{ 
                width: '110%', 
                height: '110%', 
                left: '-5%', 
                top: '-5%',
                animation: 'pulse 4s ease-in-out infinite'
              }}></div>

              {/* Image Container */}
              <div className={`relative rounded-3xl overflow-hidden backdrop-blur-xl ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'
              } shadow-2xl`}>
                
                {!imageLoaded && (
                  <div className={`w-full aspect-[3/4] flex items-center justify-center ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}>
                    <div className="animate-pulse">
                      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                )}

                {imageLoaded && (
                  <>
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                      style={{ aspectRatio: '3/4', maxHeight: '65vh' }}
                      draggable="false"
                    />
                    
                    {/* Gradient Overlay at Bottom */}
                    <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
                      isDark ? 'from-gray-900/95 via-gray-900/70 to-transparent' : 'from-gray-900/90 via-gray-900/60 to-transparent'
                    }`}></div>

                    {/* Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 
                        className="text-white text-2xl sm:text-3xl font-bold mb-1"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {founder.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-emerald-400" />
                        <p 
                          className="text-emerald-300 text-sm sm:text-base font-medium"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {founder.title}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`lg:col-span-7 space-y-5 transform transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              
              {/* Bio */}
              <div className="space-y-3">
                <p 
                  className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {founder.bio}
                </p>
                <p 
                  className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {founder.journey}
                </p>
              </div>

              {/* Quote */}
              <div className={`rounded-2xl p-5 backdrop-blur-xl border-l-4 ${
                isDark 
                  ? 'bg-white/5 border-emerald-500 border-r border-t border-b border-white/10' 
                  : 'bg-white/70 border-emerald-600 border-r border-t border-b border-white/50'
              }`}>
                <p 
                  className={`text-sm sm:text-base italic leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`} 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  "Every farmer deserves access to the tools and resources they need to thrive. We're not just providing financial services—we're building pathways to prosperity."
                </p>
                <p 
                  className={`mt-2 text-xs sm:text-sm font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  — {founder.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}