import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Tag, TrendingUp, DollarSign } from 'lucide-react';

export default function AboutAwards({ isActive, isDark }) {
  const [inView, setInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [counters, setCounters] = useState({
    farmers: 0,
    livestock: 0,
    projects: 0,
    opportunity: 0
  });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const awardImage = "https://res.cloudinary.com/dpymwa41m/image/upload/c_fill,w_1400,h_900,q_auto:good,f_auto/v1760893161/award_winning_startup_n8esdp.jpg";

  const achievements = [
    {
      id: 1,
      icon: Users,
      value: 1500,
      label: "Farmers Trained",
      description: "Empowering farmers with modern skills",
      colorFrom: "emerald-500",
      colorTo: "emerald-600",
      suffix: ""
    },
    {
      id: 2,
      icon: Tag,
      value: 5000,
      label: "Livestock Identified",
      description: "Advanced tagging for productivity",
      colorFrom: "teal-500",
      colorTo: "teal-600",
      suffix: ""
    },
    {
      id: 3,
      icon: TrendingUp,
      value: 100,
      label: "Dairy Projects",
      description: "Collaborative farming initiatives",
      colorFrom: "cyan-500",
      colorTo: "cyan-600",
      suffix: ""
    },
    {
      id: 4,
      icon: DollarSign,
      value: 23000000000,
      label: "Market Opportunity",
      description: "Unlocking agricultural growth",
      colorFrom: "blue-500",
      colorTo: "blue-600",
      suffix: "$"
    }
  ];

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = awardImage;
  }, []);

  // Viewport detection
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInViewCheck = rect.top < windowHeight * 0.7 && rect.bottom > 0;
      setInView(isInViewCheck && isActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  // Counter animation
  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      achievements.forEach((achievement) => {
        let currentStep = 0;
        const increment = achievement.value / steps;

        const timer = setInterval(() => {
          currentStep++;
          setCounters(prev => ({
            ...prev,
            [achievement.id === 1 ? 'farmers' : 
             achievement.id === 2 ? 'livestock' : 
             achievement.id === 3 ? 'projects' : 'opportunity']: 
              Math.min(Math.round(increment * currentStep), achievement.value)
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [inView]);

  const formatNumber = (num, suffix) => {
    if (num >= 1000000000) {
      return `${suffix}${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${suffix}${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${suffix}${(num / 1000).toFixed(1)}K`;
    }
    return `${suffix}${num}`;
  };

  const getCurrentValue = (id) => {
    switch(id) {
      case 1: return counters.farmers;
      case 2: return counters.livestock;
      case 3: return counters.projects;
      case 4: return counters.opportunity;
      default: return 0;
    }
  };

  const getGradientStyle = (colorFrom, colorTo) => {
    const colorMap = {
      'emerald-500': '#10b981',
      'emerald-600': '#059669',
      'teal-500': '#14b8a6',
      'teal-600': '#0d9488',
      'cyan-500': '#06b6d4',
      'cyan-600': '#0891b2',
      'blue-500': '#3b82f6',
      'blue-600': '#2563eb'
    };

    return {
      background: `linear-gradient(135deg, ${colorMap[colorFrom]}, ${colorMap[colorTo]})`
    };
  };

  return (
    <div 
      className={`fixed inset-0 transition-all duration-1000 ease-out ${
        isActive ? 'opacity-100 scale-100 blur-none pointer-events-auto' : 'opacity-0 scale-95 blur-lg pointer-events-none'
      }`}
      ref={sectionRef}
    >
      <section className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-300'
          }`} style={{ animation: 'drift 10s ease-in-out infinite' }}></div>
          <div className={`absolute -bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-teal-600' : 'bg-teal-300'
          }`} style={{ animation: 'drift 12s ease-in-out infinite', animationDelay: '-4s' }}></div>
        </div>

        {/* Main Content - Higher positioning to view everything at once */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="w-full max-w-7xl mx-auto">
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left: Award Image - Centered with space */}
              <div className={`flex flex-col justify-center space-y-6 transform transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {!imageLoaded && (
                    <div className={`w-full h-[350px] flex items-center justify-center ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}>
                      <div className="animate-pulse">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </div>
                  )}
                  
                  {imageLoaded && (
                    <img 
                      src={awardImage}
                      alt="Imfuyo Award Ceremony"
                      loading="eager"
                      decoding="async"
                      className="w-full h-[350px] object-cover"
                      style={{ willChange: "auto" }}
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  
                  {/* Award Badge Overlay */}
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      1st Place
                    </span>
                  </div>
                </div>

                {/* Award Description */}
                <div className={`p-5 rounded-2xl ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'
                } backdrop-blur-xl`}>
                  <p 
                    className={`text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Imfuyo</strong>, led by Founder and CEO <strong>Bernard Njathi</strong>, was awarded <strong>first place in scalability and impact</strong> out of 100 startups at the <strong>Glovo-Esade Tech-Based Competition</strong>, presented by <strong>Mr. Takeshi Oikawa</strong>, Managing Director at Boston Consulting Group, Kenya.
                  </p>
                </div>
              </div>

              {/* Right: Achievement Stats - Centered as cards */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                  {achievements.map((achievement, idx) => {
                    const Icon = achievement.icon;
                    const currentValue = getCurrentValue(achievement.id);
                    
                    return (
                      <div
                        key={achievement.id}
                        className={`transform transition-all duration-1000 ${
                          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                        style={{ transitionDelay: `${300 + idx * 100}ms` }}
                      >
                        <div className={`p-5 rounded-2xl ${
                          isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'
                        } backdrop-blur-xl hover:scale-105 transition-transform duration-300 h-full flex flex-col justify-between`}>
                          {/* Icon with gradient */}
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg mb-3"
                            style={getGradientStyle(achievement.colorFrom, achievement.colorTo)}
                          >
                            <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </div>

                          {/* Value */}
                          <div className={`text-3xl font-black mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {formatNumber(currentValue, achievement.suffix)}
                          </div>

                          {/* Label */}
                          <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                            isDark ? 'text-emerald-400' : 'text-emerald-600'
                          }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {achievement.label}
                          </div>

                          {/* Description */}
                          <p className={`text-xs leading-relaxed ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(20px, -20px) rotate(3deg);
            }
            66% {
              transform: translate(-20px, 20px) rotate(-3deg);
            }
          }
        `}</style>
      </section>
    </div>
  );
}