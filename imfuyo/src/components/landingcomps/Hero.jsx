import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export default function Hero({ parallaxOffset, onNavigateToCommunity, onNavigateToAIConsulting }) {
  const [textVisible, setTextVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fullText = "An AgriFintech Merging agriculture with modern Data driven analytics and technologies.";

  // Use lower resolution images for faster loading
  const backgroundImages = [
    'https://res.cloudinary.com/dof2wtgd6/image/upload/c_scale,w_1280,q_70,f_auto/v1760831409/559A5667_gji800.jpg',
    'https://res.cloudinary.com/dof2wtgd6/image/upload/c_scale,w_1280,q_70,f_auto/v1760831413/559A7883_xfzurq.jpg',
    'https://res.cloudinary.com/dof2wtgd6/image/upload/c_scale,w_1280,q_70,f_auto/v1760831404/559A5664_lusfum.jpg'
  ];

  // Show content immediately - no waiting for images
  useEffect(() => {
    setTextVisible(true);
  }, []);

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

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Static gradient background as fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332] to-[#081c15]"></div>

      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transform: index === currentImageIndex 
                ? `scale(1.05) translate(${parallaxOffset.x * 0.02}px, ${parallaxOffset.y * 0.02}px)` 
                : `scale(1.1) translate(${parallaxOffset.x * 0.02}px, ${parallaxOffset.y * 0.02}px)`,
              transition: 'opacity 2s ease-in-out, transform 2s ease-out',
              willChange: 'opacity, transform'
            }}
          >
            <img
              src={image}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Hero Content - Always visible */}
      <div 
        className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none opacity-100" 
        style={{ paddingTop: '80px' }}
      >
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="transition-all duration-1000 transform opacity-100 scale-100">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#f8f9fa] mb-4 sm:mb-6 leading-tight tracking-tight select-none"
              style={{ fontFamily: "'Outfit', sans-serif", pointerEvents: 'none' }}
            >
              Welcome to
              <br />
              <span style={{ color: '#6E260E' }}>
                Imfuyo
              </span>
            </h1>

            <p 
              className="text-lg sm:text-xl lg:text-2xl text-[#d8f3dc] max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed min-h-[3rem] sm:min-h-[4rem] px-2 select-none"
              style={{ fontFamily: "'Outfit', sans-serif", pointerEvents: 'none' }}
            >
              {typedText}
              <span className="animate-blink">|</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-12 sm:mt-16 pointer-events-auto">
              <button 
                onClick={onNavigateToCommunity}
                className="group flex items-center justify-center space-x-2 bg-[#f8f9fa] text-[#2d6a4f] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-[#95d5b2] hover:text-[#1b4332] transition-all duration-300 shadow-2xl hover:scale-105 transform w-full sm:w-auto text-sm sm:text-base" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Users className="w-5 h-5" />
                <span>Blog & Community</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onNavigateToAIConsulting}
                className="group flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 font-bold rounded-full border-2 transition-all duration-300 backdrop-blur-md w-full sm:w-auto text-sm sm:text-base shadow-xl" 
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.9) 0%, rgba(245, 158, 11, 0.9) 100%)',
                  borderColor: 'rgba(250, 204, 21, 0.6)',
                  color: '#1f2937'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(245, 158, 11, 1) 100%)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(250, 204, 21, 0.9) 0%, rgba(245, 158, 11, 0.9) 100%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>AI Consultant</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
}