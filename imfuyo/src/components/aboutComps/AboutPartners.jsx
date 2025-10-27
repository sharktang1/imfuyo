import React, { useState, useEffect, useRef } from 'react';
import { Handshake } from 'lucide-react';

export default function AboutPartnerships({ isActive, isDark }) {
  const [inView, setInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  const partners = [
    {
      id: 1,
      name: 'Neotex',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896768/neotext_qjeahl.jpg',
      category: 'Technology Partner'
    },
    {
      id: 2,
      name: 'Rafiki Microfinance Bank',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896719/imfuyo_rafiki_h3l02a.png',
      category: 'Financial Partner'
    },
    {
      id: 3,
      name: 'Lead Farmer',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896670/lead_tsoan9.png',
      category: 'Agricultural Partner'
    },
    {
      id: 4,
      name: 'Muthegi Agricultural Development Forum',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896649/Muthegilogo_egnfmj.jpg',
      category: 'Community Partner'
    },
    {
      id: 5,
      name: 'Nyeri County Government',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896621/imfuyo_nyeri_kvz0ij.png',
      category: 'Government Partner'
    },
    {
      id: 6,
      name: 'Narok County Government',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896601/Narok_20County_20Logo_or5udk.png',
      category: 'Government Partner'
    },
    {
      id: 7,
      name: 'Gearbox Europlacer',
      image: 'https://res.cloudinary.com/dpymwa41m/image/upload/v1760896558/gearbox_z5giqc.png',
      category: 'Technology Partner'
    }
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = partners.map((partner) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [partner.id]: true }));
            resolve(partner.image);
          };
          img.onerror = reject;
          img.src = partner.image;
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

  // Viewport detection
  useEffect(() => {
    if (isActive) {
      setInView(true);
    }
  }, [isActive]);

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
          <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-200'
          }`} style={{ animation: 'float 10s ease-in-out infinite' }}></div>
          <div className={`absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDark ? 'bg-teal-600' : 'bg-teal-200'
          }`} style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '-5s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-[60] flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className={`text-center mb-20 transform transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center justify-center space-x-3">
              <Handshake className={`w-8 h-8 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} strokeWidth={2.5} />
              <h2 
                className={`text-4xl sm:text-5xl lg:text-6xl font-black ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Our Partners
              </h2>
            </div>
          </div>

          {/* Infinite Scrolling Partners */}
          <div className={`w-full max-w-7xl transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`} data-no-scroll>
            {/* Loading State */}
            {!imagesLoaded && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-pulse">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}

            {/* Scrolling Container */}
            {imagesLoaded && (
              <div 
                className="relative overflow-hidden py-8"
                data-no-scroll
              >
                {/* Gradient Masks */}
                <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-900 to-transparent' 
                    : 'bg-gradient-to-r from-[#fafaf9] to-transparent'
                }`}></div>
                <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                  isDark 
                    ? 'bg-gradient-to-l from-gray-900 to-transparent' 
                    : 'bg-gradient-to-l from-[#fafaf9] to-transparent'
                }`}></div>

                {/* Scrolling Track */}
                <div 
                  ref={scrollRef}
                  className="flex space-x-8 animate-scroll"
                  data-no-scroll
                  style={{ 
                    width: 'max-content',
                    willChange: 'transform'
                  }}
                >
                  {duplicatedPartners.map((partner, index) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="flex-shrink-0 flex flex-col items-center"
                      data-no-scroll
                    >
                      {/* Partner Card */}
                      <div 
                        className={`relative w-80 h-52 rounded-2xl overflow-hidden backdrop-blur-xl ${
                          isDark 
                            ? 'bg-gray-800/50 border-2 border-gray-700/50 shadow-xl shadow-black/20' 
                            : 'bg-white/90 border-2 border-white/50 shadow-lg'
                        }`}
                        data-no-scroll
                      >
                        {/* Partner Logo */}
                        <div className="absolute inset-0 flex items-center justify-center p-8" data-no-scroll>
                          <img 
                            src={partner.image}
                            alt={partner.name}
                            loading="lazy"
                            decoding="async"
                            className="max-w-full max-h-full object-contain"
                            style={{ 
                              filter: isDark ? 'brightness(1.3) contrast(1.15) saturate(1.1)' : 'brightness(1) contrast(1.05)'
                            }}
                            draggable="false"
                          />
                        </div>
                      </div>

                      {/* Partner Name Below */}
                      <div className="mt-4 text-center">
                        <h3 
                          className={`text-lg font-bold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 3));
            }
          }

          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}</style>
      </section>
    </div>
  );
}