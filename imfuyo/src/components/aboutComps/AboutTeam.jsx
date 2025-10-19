import React, { useState, useEffect, useRef } from 'react';
import { X, Award, Target, Briefcase, MousePointerClick } from 'lucide-react';

export default function AboutTeam({ isActive, isDark, setIsModalOpen }) {
  const [inView, setInView] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showClickHint, setShowClickHint] = useState(false);
  const teamRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Benard Njathi',
      role: 'Chief Executive Officer & Founder',
      image: 'https://res.cloudinary.com/dof2wtgd6/image/upload/v1760836563/559A9914-Edit_x0bkvt.jpg',
      bio: 'Visionary leader driving agricultural transformation across Africa. Passionate about empowering farmers through innovative fintech solutions.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 2,
      name: 'Isaac Kidui',
      role: 'Chief Operating Officer',
      image: 'https://res.cloudinary.com/dof2wtgd6/image/upload/v1760836557/559A9930-Edit_pgupcs.jpg',
      bio: 'Operations expert with a track record of scaling agribusiness ventures. Committed to building sustainable systems that deliver impact.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      name: 'Ruth Mwangi',
      role: 'Finance Officer',
      image: 'https://res.cloudinary.com/dof2wtgd6/image/upload/v1760836567/559A9940-Edit_nqme2t.jpg',
      bio: 'Financial strategist ensuring fiscal excellence and transparency. Dedicated to creating value for farmers and stakeholders alike.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 4,
      name: 'Timothy Kyovo',
      role: 'Software Developer',
      image: 'https://res.cloudinary.com/dof2wtgd6/image/upload/v1760836570/559A9966-Edit_dfjisp.jpg',
      bio: 'Tech innovator crafting seamless digital experiences. Building the technology backbone that connects farmers to opportunities.',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  useEffect(() => {
    if (isActive) {
      setInView(true);
    }
  }, [isActive]);

  // Notify parent when modal opens/closes
  useEffect(() => {
    if (setIsModalOpen) {
      setIsModalOpen(!!selectedMember);
    }
  }, [selectedMember, setIsModalOpen]);

  // Show click hint after component is in view
  useEffect(() => {
    if (inView && isActive) {
      const timer = setTimeout(() => {
        setShowClickHint(true);
      }, 1500);

      const hideTimer = setTimeout(() => {
        setShowClickHint(false);
      }, 6000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [inView, isActive]);

  const handleCardClick = (e, member) => {
    e.stopPropagation();
    console.log('Card clicked:', member.name);
    setSelectedMember(member);
    setShowClickHint(false);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setSelectedMember(null);
  };

  return (
    <div 
      className={`fixed inset-0 transition-all duration-1000 ease-out ${
        isActive ? 'opacity-100 scale-100 blur-none pointer-events-auto' : 'opacity-0 scale-95 blur-lg pointer-events-none'
      }`}
      ref={teamRef}
    >
      <section className={`relative w-full h-screen flex flex-col transition-colors duration-700 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-300'
          }`} style={{ animation: 'float 8s ease-in-out infinite' }}></div>
          <div className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-teal-600' : 'bg-teal-300'
          }`} style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-3s' }}></div>
        </div>

        {/* Main Content - Centered with space at bottom */}
        <div className="relative z-[60] flex flex-col items-center justify-center h-full pt-32 px-4 sm:px-6 lg:px-8" style={{ paddingBottom: '15vh' }}>
          
          {/* Header - Compact */}
          <div className={`text-center mb-10 transform transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Meet the Team
            </h2>
          </div>

          {/* Team Cards - Single Row, Small Cards */}
          <div className="w-full max-w-6xl mx-auto" data-no-scroll>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  className={`team-card group cursor-pointer transform transition-all duration-1000 ${
                    inView ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 150}ms`,
                    animation: inView ? `slideInUp 0.8s ease-out ${idx * 150}ms both` : 'none'
                  }}
                  onClick={(e) => handleCardClick(e, member)}
                  onMouseEnter={() => setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  data-no-scroll
                >
                  <div className={`relative rounded-2xl overflow-hidden backdrop-blur-xl ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'
                  } shadow-xl transition-all duration-500 ${
                    hoveredCard === member.id ? 'scale-105 shadow-2xl -translate-y-2' : 'scale-100'
                  }`}>
                    
                    {/* Image Container - Compact */}
                    <div className="relative aspect-[3/4]">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        draggable="false"
                      />
                      
                      {/* Gradient Overlay at Bottom */}
                      <div className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${
                        isDark ? 'from-gray-900/95 via-gray-900/70 to-transparent' : 'from-gray-900/90 via-gray-900/60 to-transparent'
                      }`}></div>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20 pointer-events-none">
                      <h3 
                        className="text-white text-xs sm:text-sm font-bold mb-0.5 leading-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {member.name}
                      </h3>
                      <p 
                        className="text-gray-200 text-[10px] sm:text-xs leading-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Click Me Hint */}
                    {showClickHint && (
                      <div 
                        className="absolute top-2 right-2 z-30 flex items-center space-x-1 bg-emerald-500 text-white px-2 py-1 rounded-full shadow-lg pointer-events-none"
                        style={{ animation: 'bounce 2s ease-in-out infinite' }}
                      >
                        <MousePointerClick className="w-3 h-3" />
                        <span className="text-[10px] font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Click
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Popup */}
        {selectedMember && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            <div 
              className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
              style={{ animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className={`absolute top-4 right-4 z-30 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                type="button"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                
                {/* Left Side - Image */}
                <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Right Side - Info */}
                <div className="md:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
                  {/* Role Badge */}
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 self-start ${
                    isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {selectedMember.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 
                    className={`text-3xl sm:text-4xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {selectedMember.name}
                  </h2>

                  {/* Bio */}
                  <p 
                    className={`text-base sm:text-lg leading-relaxed mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {selectedMember.bio}
                  </p>

                  {/* Decorative Elements */}
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDark ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      <Award className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Leadership
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDark ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      <Target className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Innovation
                      </span>
                    </div>
                  </div>

                  {/* Gradient Line */}
                  <div className="mt-8 h-1 rounded-full bg-gradient-to-r bg-emerald-600 w-24"></div>
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

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-8px) scale(1.05);
            }
          }

          .team-card {
            user-select: none;
          }
        `}</style>
      </section>
    </div>
  );
}