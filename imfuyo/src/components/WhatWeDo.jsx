import React, { useState, useEffect, useRef } from 'react';
import { Leaf, TrendingUp, Users, Shield, Award, Target, ArrowRight } from 'lucide-react';

const WhatWeDo = ({ isDark, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inView, setInView] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentSection, setCurrentSection] = useState('hero');
  const sectionRefs = useRef({});

  const images = [
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831421/U63A7356_xtd0q3.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831420/559A7873_ztd1co.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831419/U63A7348_emfgyj.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831418/U63A7312_ekn7xq.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831417/559A7920_msrfzv.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831414/559A5680_pbt5pc.jpg",
  ];

  const sections = ['hero', 'challenge', 'solution', 'services', 'vision', 'cta'];

  // Preload all images before starting slideshow
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [index]: true }));
            resolve(src);
          };
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Intersection Observer for scroll animations and image transitions
  useEffect(() => {
    const observers = [];
    
    sections.forEach((key, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({ ...prev, [key]: true }));
            setCurrentSection(key);
            // Change image based on section
            if (index < images.length) {
              setCurrentImageIndex(index);
            }
          }
        },
        { threshold: 0.3 }
      );

      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [imagesLoaded]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Smooth Background Image Slider with White/Dark Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Loading placeholder */}
        {!imagesLoaded && (
          <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="animate-pulse">
              <div className={`w-16 h-16 border-4 ${isDark ? 'border-white' : 'border-gray-900'} border-t-transparent rounded-full animate-spin`} />
            </div>
          </div>
        )}

        {/* All images layered - only current one is visible */}
        {imagesLoaded && images.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: idx === currentImageIndex ? 1 : 0,
              transform: idx === currentImageIndex ? 'scale(1)' : 'scale(1.05)',
              willChange: 'opacity, transform',
            }}
          >
            <img
              src={img}
              alt={`Background ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            {/* White/Dark gradient overlay with smooth transition */}
            <div 
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.88) 0%, rgba(31, 41, 55, 0.85) 50%, rgba(17, 24, 39, 0.88) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(249, 250, 251, 0.85) 50%, rgba(255, 255, 255, 0.88) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={(el) => (sectionRefs.current['hero'] = el)}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-700 ${
                inView['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['hero'] ? 'fadeInBounce 1s ease-out' : 'none'
              }}
            >
              Empowering Africa's
              <br />
              <span className={isDark ? 'text-orange-400' : 'text-orange-700'}>Agricultural Future</span>
            </h1>
            <p 
              className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-6 transition-all duration-700 delay-200 ${
                inView['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                animation: inView['hero'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
              }}
            >
              Every morning, as the sun rises over the fertile lands of Africa, millions of smallholder farmers wake up with a dream—to provide for their families, to see their crops flourish, and to build a better future. Yet, for too many, these dreams remain out of reach.
            </p>
            <p 
              className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
                inView['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isDark ? 'text-green-400' : 'text-green-700'}`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                animation: inView['hero'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
              }}
            >
              At Imfuyo, we're changing that story.
            </p>
          </div>
        </section>

        {/* The Challenge Section */}
        <section
          ref={(el) => (sectionRefs.current['challenge'] = el)}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div 
            className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
              inView['challenge'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              animation: inView['challenge'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <div className="flex items-center justify-center mb-8">
              <div 
                className={`p-5 rounded-2xl transition-all duration-700 ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Target className={`w-10 h-10 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </div>
            </div>

            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-8 text-center leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['challenge'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
              }}
            >
              The Challenge We Face
            </h2>

            <div className="space-y-6">
              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['challenge'] ? 'fadeInBounce 1s ease-out 0.3s backwards' : 'none'
                }}
              >
                Across Africa, agriculture is the backbone of economies and the lifeline of communities. Yet smallholder farmers—who produce over 80% of the continent's food—face a persistent challenge: access to financial services.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['challenge'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
                }}
              >
                Traditional banks see them as too risky. Without collateral, credit history, or formal documentation, farmers are locked out of the capital they need to invest in better seeds, equipment, and livestock. The result? Cycles of poverty that span generations.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed font-semibold ${
                  isDark ? 'text-green-400' : 'text-green-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['challenge'] ? 'fadeInBounce 1s ease-out 0.5s backwards' : 'none'
                }}
              >
                But what if there was another way? What if technology could bridge this gap?
              </p>
            </div>
          </div>
        </section>

        {/* Our Solution Section */}
        <section
          ref={(el) => (sectionRefs.current['solution'] = el)}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div 
            className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
              inView['solution'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              animation: inView['solution'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <div className="flex items-center justify-center mb-8">
              <div 
                className={`p-5 rounded-2xl transition-all duration-700 ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Leaf className={`w-10 h-10 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </div>
            </div>

            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-8 text-center leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['solution'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
              }}
            >
              Our <span className={isDark ? 'text-orange-400' : 'text-orange-700'}>Innovation</span>
            </h2>

            <div className="space-y-6">
              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['solution'] ? 'fadeInBounce 1s ease-out 0.3s backwards' : 'none'
                }}
              >
                Imfuyo merges agriculture with modern data-driven analytics and financial technology. We've built a platform that understands farmers in ways traditional institutions never could.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['solution'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
                }}
              >
                By analyzing real-time data—weather patterns, soil conditions, market prices, and crop performance—we can assess creditworthiness not through paperwork, but through potential. We see what farmers can achieve, not just what they've done before.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['solution'] ? 'fadeInBounce 1s ease-out 0.5s backwards' : 'none'
                }}
              >
                Our mobile-first approach means that a farmer in rural Kenya can apply for a loan, receive financial education, and access insurance—all from their phone. No branches, no lengthy forms, no discrimination.
              </p>
            </div>

            {/* Stats Overlay */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: '10,000+', label: 'Farmers Empowered' },
                { value: '$5M+', label: 'Capital Deployed' },
                { value: '15+', label: 'Communities Transformed' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className={`text-center p-4 transition-all duration-700 ${
                    isDark ? 'bg-gray-800/40' : 'bg-white/40'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    animation: inView['solution'] ? `fadeInBounce 1s ease-out ${0.6 + idx * 0.1}s backwards` : 'none'
                  }}
                >
                  <div 
                    className={`text-3xl sm:text-4xl font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className={`text-xs sm:text-sm ${
                      isDark ? 'text-green-400' : 'text-green-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section
          ref={(el) => (sectionRefs.current['services'] = el)}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div 
            className={`max-w-5xl mx-auto transform transition-all duration-1000 ${
              inView['services'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-12 text-center leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['services'] ? 'fadeInBounce 1s ease-out' : 'none'
              }}
            >
              How We Serve
            </h2>

            <div className="space-y-16">
              {/* Service 1 */}
              <div 
                className="flex flex-col md:flex-row items-start gap-6"
                style={{
                  animation: inView['services'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
                }}
              >
                <div 
                  className={`p-4 rounded-2xl flex-shrink-0 transition-all duration-700 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <TrendingUp className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </div>
                <div>
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Agricultural Credit
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    We provide flexible financing tailored to farming cycles. Whether it's seeds for planting season or equipment for harvest, our loans are designed around the rhythms of agriculture—not banking calendars. With competitive rates and seamless digital applications, farmers can access capital when they need it most.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div 
                className="flex flex-col md:flex-row items-start gap-6"
                style={{
                  animation: inView['services'] ? 'fadeInBounce 1s ease-out 0.3s backwards' : 'none'
                }}
              >
                <div 
                  className={`p-4 rounded-2xl flex-shrink-0 transition-all duration-700 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Shield className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </div>
                <div>
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Livestock Insurance
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    Livestock is more than an asset—it's a family's livelihood, a child's school fees, a community's future. Our comprehensive insurance protects against losses from disease, drought, and disasters. When the unexpected happens, farmers don't lose everything. They have a safety net to rebuild and continue.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div 
                className="flex flex-col md:flex-row items-start gap-6"
                style={{
                  animation: inView['services'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
                }}
              >
                <div 
                  className={`p-4 rounded-2xl flex-shrink-0 transition-all duration-700 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Users className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </div>
                <div>
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Financial Education
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    Capital without knowledge is opportunity wasted. Through community-based programs, we teach financial literacy, loan management, and sustainable farming practices. We're not just handing out money—we're building capacity, confidence, and long-term prosperity.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div 
                className="flex flex-col md:flex-row items-start gap-6"
                style={{
                  animation: inView['services'] ? 'fadeInBounce 1s ease-out 0.5s backwards' : 'none'
                }}
              >
                <div 
                  className={`p-4 rounded-2xl flex-shrink-0 transition-all duration-700 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Award className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </div>
                <div>
                  <h3 
                    className={`text-2xl sm:text-3xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Market Access
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    Growing the crop is only half the journey. We connect farmers directly to buyers and markets, cutting out exploitative middlemen and ensuring fair prices. Through our platform, farmers know the market value of their produce and negotiate from a position of strength.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Vision Section */}
        <section
          ref={(el) => (sectionRefs.current['vision'] = el)}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div 
            className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
              inView['vision'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              animation: inView['vision'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-8 text-center leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['vision'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
              }}
            >
              Building a <span className={isDark ? 'text-orange-400' : 'text-orange-700'}>Legacy</span>
            </h2>

            <div className="space-y-6">
              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['vision'] ? 'fadeInBounce 1s ease-out 0.3s backwards' : 'none'
                }}
              >
                This isn't just about loans and insurance. It's about dignity. It's about a mother who can afford to send all her children to school. It's about a young farmer who doesn't have to migrate to the city for work. It's about communities that thrive, not just survive.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['vision'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
                }}
              >
                Every farmer we support represents a ripple effect—better nutrition, stronger local economies, and a more food-secure Africa. When agriculture flourishes, nations flourish.
              </p>

              <p 
                className={`text-lg sm:text-xl leading-relaxed font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                  animation: inView['vision'] ? 'fadeInBounce 1s ease-out 0.5s backwards' : 'none'
                }}
              >
                At Imfuyo, we believe in the potential of every farmer. We see their dreams not as distant hopes, but as achievable realities. Together, we're cultivating a future where African agriculture doesn't just feed the continent—it transforms it.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section 
          ref={(el) => (sectionRefs.current['cta'] = el)}
          className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div 
            className="max-w-4xl mx-auto text-center"
            style={{
              animation: inView['cta'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
                animation: inView['cta'] ? 'fadeInBounce 1s ease-out 0.2s backwards' : 'none'
              }}
            >
              Join Us in Transforming Agriculture
            </h2>
            <p 
              className={`text-lg sm:text-xl mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                animation: inView['cta'] ? 'fadeInBounce 1s ease-out 0.3s backwards' : 'none'
              }}
            >
              Whether you're a farmer seeking support or a partner wanting to invest in Africa's future, there's a place for you in this movement.
            </p>
            <button 
              className={`group inline-flex items-center space-x-2 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-2xl hover:scale-105 transform ${
                isDark 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                animation: inView['cta'] ? 'fadeInBounce 1s ease-out 0.4s backwards' : 'none'
              }}
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px);
          }
          80% {
            transform: translateY(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatWeDo;