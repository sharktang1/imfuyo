import React, { useState, useEffect, useRef } from "react";

const AboutWhoWeAre = ({ isActive, isDark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [inView, setInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const aboutRef = useRef(null);

  const images = [
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831421/U63A7356_xtd0q3.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831420/559A7873_ztd1co.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831419/U63A7348_emfgyj.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831418/U63A7312_ekn7xq.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831417/559A7920_msrfzv.jpg",
    "https://res.cloudinary.com/dof2wtgd6/image/upload/c_fill,w_1200,h_800,q_auto:good,f_auto/v1760831414/559A5680_pbt5pc.jpg",
  ];

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
        // Still set as loaded to allow component to function
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Cycle images every 5s - only start after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length, imagesLoaded]);

  // Viewport visibility
  useEffect(() => {
    const handleScroll = () => {
      const section = aboutRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setInView(rect.top < windowHeight * 0.8 && rect.bottom > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none`}
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
      }}
      ref={aboutRef}
    >
      <section
        className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-1000 ${
          isDark
            ? "bg-gray-900"
            : "bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]"
        }`}
      >
        {/* Soft glowing blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 ${
              isDark ? "bg-emerald-600" : "bg-emerald-200"
            } animate-drift`}
          />
          <div
            className={`absolute bottom-0 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${
              isDark ? "bg-teal-600" : "bg-teal-200"
            } animate-drift-slow`}
          />
        </div>

        {/* Clean Background Transition */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {prevImageIndex !== null && loadedImages[prevImageIndex] && (
            <div
              key={`prev-${prevImageIndex}`}
              className="absolute inset-0 transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                backgroundImage: `url(${images[prevImageIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0,
                willChange: "opacity",
              }}
            />
          )}
          {loadedImages[currentImageIndex] && (
            <div
              key={`current-${currentImageIndex}`}
              className="absolute inset-0 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.25,
                zIndex: 1,
                willChange: "opacity",
              }}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Static Card — only inner image transitions */}
              <div className="relative h-80 sm:h-96 lg:h-[420px] flex items-center justify-center">
                <div className="relative w-full h-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                  {/* Loading placeholder */}
                  {!imagesLoaded && (
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}>
                      <div className="animate-pulse">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </div>
                  )}
                  
                  {/* Images - only render when loaded */}
                  {imagesLoaded && images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Imfuyo team ${idx + 1}`}
                      loading="eager"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        idx === currentImageIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-[1.02]"
                      }`}
                      style={{ willChange: "opacity, transform" }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/10 to-transparent" />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-6 flex flex-col justify-center h-full">
                <div
                  className={`transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                >
                  
                  <h2
                    className={`text-4xl sm:text-5xl lg:text-6xl font-black mt-2 leading-tight ${
                      isDark ? "text-white" : "text-gray-950"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                  >
                    Who We Are
                  </h2>
                </div>

                <div
                  className={`transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `150ms` }}
                >
                  <p
                    className={`leading-relaxed text-base sm:text-lg font-medium ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                  >
                    Founded with a vision to revolutionize African agriculture, Imfuyo is a pioneering AgriFintech company that bridges traditional farming and modern finance. We work at the intersection of technology and agriculture, providing innovative financial solutions including credit, livestock insurance, and market intelligence. Serving smallholder farmers across the continent, we empower them with the tools and resources needed to grow sustainably and achieve economic resilience.
                  </p>
                </div>

                <div
                  className={`h-1 rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    inView ? "w-20 bg-[#40916c]" : "w-12 bg-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

          @keyframes drift {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -30px); }
          }
          @keyframes drift-slow {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-30px, 20px); }
          }
          .animate-drift {
            animation: drift 12s ease-in-out infinite alternate;
          }
          .animate-drift-slow {
            animation: drift-slow 18s ease-in-out infinite alternate;
          }
        `}</style>
      </section>
    </div>
  );
};

export default AboutWhoWeAre;