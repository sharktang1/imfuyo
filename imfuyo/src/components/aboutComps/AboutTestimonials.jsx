import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';

export default function AboutTestimonials({ isActive, isDark, setIsVideoModalOpen }) {
  const [inView, setInView] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Google Drive file IDs - extracted from preview URLs
  const videos = [
    {
      id: 1,
      title: 'Charles Mwangi',
      subtitle: 'Farmer Testimonial',
      // Direct Google Drive link - user sees full Drive interface
      driveUrl: 'https://drive.google.com/file/d/1gf-VApyIpNd7jTXxKbr4wYxpZGI7xOlW/view?usp=sharing',
      // For preview thumbnail
      previewUrl: 'https://drive.google.com/file/d/1gf-VApyIpNd7jTXxKbr4wYxpZGI7xOlW/preview'
    },
    {
      id: 2,
      title: 'Christine & Bernard',
      subtitle: 'Partnership Story',
      driveUrl: 'https://drive.google.com/file/d/1PUVR_GvIoohdwb8xho-k2sCMjJD_Dimb/view?usp=sharing',
      previewUrl: 'https://drive.google.com/file/d/1PUVR_GvIoohdwb8xho-k2sCMjJD_Dimb/preview'
    }
  ];

  useEffect(() => {
    if (isActive) {
      setInView(true);
    }
  }, [isActive]);

  const handleVideoClick = (e, video) => {
    e.stopPropagation();
    setSelectedVideo(video);
    if (setIsVideoModalOpen) {
      setIsVideoModalOpen(true);
    }
  };

  const handleOpenInDrive = (e, driveUrl) => {
    e.stopPropagation();
    // Open full Google Drive viewer in new tab
    window.open(driveUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setSelectedVideo(null);
    if (setIsVideoModalOpen) {
      setIsVideoModalOpen(false);
    }
  };

  return (
    <section className={`relative w-full h-screen flex flex-col overflow-hidden transition-colors duration-700 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
    }`}
      ref={sectionRef}
    >
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-200'
        }`} style={{ animation: 'float 10s ease-in-out infinite' }}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-teal-600' : 'bg-teal-200'
        }`} style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '-5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-[60] flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            className={`text-4xl sm:text-5xl lg:text-6xl font-black ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Testimonials
          </h2>
        </div>

        {/* Video Grid */}
        <div className="w-full max-w-6xl mx-auto" data-no-scroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, idx) => (
              <div
                key={video.id}
                className={`video-card group cursor-pointer transform transition-all duration-1000 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + idx * 150}ms` }}
                onClick={(e) => handleVideoClick(e, video)}
                onMouseEnter={() => setHoveredCard(video.id)}
                onMouseLeave={() => setHoveredCard(null)}
                data-no-scroll
              >
                <div className={`relative rounded-2xl overflow-hidden backdrop-blur-xl ${
                  isDark 
                    ? 'bg-gray-800/50 border-2 border-gray-700/50 shadow-xl shadow-black/20' 
                    : 'bg-white/90 border-2 border-white/50 shadow-lg'
                } transition-all duration-500 ${
                  hoveredCard === video.id ? 'scale-105 shadow-2xl -translate-y-2' : 'scale-100'
                }`}>
                  
                  {/* Video Preview Container */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    {/* Google Drive Preview Thumbnail */}
                    <iframe
                      src={video.previewUrl}
                      className="w-full h-full"
                      title={`${video.title} preview`}
                      style={{
                        border: 'none',
                        borderRadius: '0.5rem',
                        pointerEvents: 'none'
                      }}
                      loading="lazy"
                    ></iframe>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center pointer-events-none">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isDark
                          ? 'bg-emerald-500/90 group-hover:bg-emerald-400 group-hover:scale-110'
                          : 'bg-emerald-600/90 group-hover:bg-emerald-500 group-hover:scale-110'
                      } shadow-2xl backdrop-blur-sm`}>
                        <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className={`p-5 pointer-events-none ${
                    isDark ? 'bg-gray-800/70' : 'bg-white/70'
                  }`}>
                    <h3 
                      className={`text-xl font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {video.title}
                    </h3>
                    <p 
                      className={`text-sm ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {video.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal - Opens Google Drive in New Tab */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
          onClick={handleCloseVideo}
          role="dialog"
          aria-modal="true"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-16 right-0 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-50 cursor-pointer hover:scale-110"
              type="button"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content - Compact and Responsive */}
            <div className={`rounded-2xl overflow-hidden ${
              isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
            } shadow-2xl max-h-[85vh] flex flex-col`}>
              
              {/* Preview Thumbnail */}
              <div className="w-full aspect-video bg-black overflow-hidden relative flex-shrink-0">
                <iframe
                  src={selectedVideo.previewUrl}
                  className="w-full h-full"
                  title={selectedVideo.title}
                  style={{ border: 'none' }}
                  loading="eager"
                ></iframe>
              </div>

              {/* Video Info & CTA - Compact */}
              <div className={`p-5 sm:p-6 ${isDark ? 'bg-gray-900' : 'bg-white'} flex-shrink-0`}>
                <h3 
                  className={`text-lg sm:text-xl font-bold mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {selectedVideo.title}
                </h3>
                <p 
                  className={`text-sm mb-4 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {selectedVideo.subtitle}
                </p>

                {/* Action Buttons - Stacked on mobile, side by side on desktop */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Watch in full quality on Google Drive
                  </p>
                  
                  {/* Open in Google Drive Button */}
                  <button
                    onClick={(e) => handleOpenInDrive(e, selectedVideo.driveUrl)}
                    className="group relative inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
                    style={{
                      background: 'linear-gradient(135deg, #40916c 0%, #2d6a4f 100%)',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                    
                    <span className="relative">Watch Now</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Opens in a new tab • Powered by Google Drive
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .video-card {
          user-select: none;
        }
      `}</style>
    </section>
  );
}