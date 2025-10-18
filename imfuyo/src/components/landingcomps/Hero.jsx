import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

const Hero = ({ isActive, transformClass, parallaxOffset, hideNavbar }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "An AgriFintech Merging agriculture with modern Data driven analytics and technologies.";

  useEffect(() => {
    setTextVisible(true);
  }, []);

  useEffect(() => {
    if (!isActive || !textVisible) return;

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
  }, [textVisible, isActive]);

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out filter ${transformClass}`}>
      <div className="relative min-h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-green-background"></div>

        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-10 left-4 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-[#74c69d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-transform duration-700"
            style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}
          ></div>
          <div 
            className="absolute top-20 right-4 w-56 h-56 sm:top-40 sm:right-10 sm:w-96 sm:h-96 bg-[#52b788] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse transition-transform duration-700" 
            style={{ animationDelay: '2s', transform: `translate(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px)` }}
          ></div>
          <div 
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-56 h-56 sm:-bottom-20 sm:w-96 sm:h-96 bg-[#95d5b2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transition-transform duration-700" 
            style={{ animationDelay: '4s', transform: `translate(${parallaxOffset.x * 0.3}px, ${parallaxOffset.y * 0.3}px)` }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-6xl mx-auto text-center w-full">
            <div className={`transition-all duration-1000 transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
                <button className="group flex items-center justify-center space-x-2 bg-[#f8f9fa] text-[#2d6a4f] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-[#95d5b2] hover:text-[#1b4332] transition-all duration-300 shadow-2xl hover:scale-105 transform w-full sm:w-auto text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <Users className="w-5 h-5" />
                  <span>Blog & Community</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 text-[#f8f9fa] font-bold rounded-full border-2 border-[#f8f9fa]/40 hover:bg-white/15 hover:border-[#f8f9fa]/60 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>AI Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;