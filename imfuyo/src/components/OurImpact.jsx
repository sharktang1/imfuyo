import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, MapPin, Award, Heart, Sprout, DollarSign, Target } from 'lucide-react';

const OurImpact = ({ isDark, onBack }) => {
  const [inView, setInView] = useState({});
  const sectionRefs = useRef({});

  const impactStats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Farmers Empowered',
      description: 'Smallholder farmers across Africa gaining access to financial services',
      color: 'emerald'
    },
    {
      icon: DollarSign,
      value: '$25M+',
      label: 'Capital Deployed',
      description: 'Total funding provided to agricultural communities',
      color: 'green'
    },
    {
      icon: MapPin,
      value: '150+',
      label: 'Communities Reached',
      description: 'Rural communities transformed through our platform',
      color: 'teal'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Income Growth',
      description: 'Average increase in farmer income after joining our platform',
      color: 'emerald'
    },
    {
      icon: Sprout,
      value: '2M+',
      label: 'Hectares Supported',
      description: 'Agricultural land benefiting from our services',
      color: 'green'
    },
    {
      icon: Target,
      value: '98%',
      label: 'Repayment Rate',
      description: 'Outstanding loan repayment success from our farmers',
      color: 'teal'
    },
    {
      icon: Heart,
      value: '200,000+',
      label: 'Lives Impacted',
      description: 'Family members benefiting from improved farm incomes',
      color: 'emerald'
    },
    {
      icon: Award,
      value: '40+',
      label: 'Partner Organizations',
      description: 'Collaborations with NGOs, cooperatives, and financial institutions',
      color: 'green'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Imfuyo was founded with a mission to transform agricultural finance in Africa'
    },
    {
      year: '2021',
      title: 'First 1,000 Farmers',
      description: 'Reached our first milestone of empowering 1,000 smallholder farmers'
    },
    {
      year: '2022',
      title: 'Regional Expansion',
      description: 'Expanded operations to 5 African countries, serving diverse agricultural communities'
    },
    {
      year: '2023',
      title: '$10M Milestone',
      description: 'Deployed over $10 million in agricultural financing'
    },
    {
      year: '2024',
      title: 'Scale & Impact',
      description: 'Achieved 50,000+ farmers and introduced livestock insurance programs'
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const getColorClasses = (color, isDark) => {
    const colors = {
      emerald: {
        bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
        border: isDark ? 'border-emerald-500/20' : 'border-emerald-200',
        text: isDark ? 'text-emerald-400' : 'text-emerald-600',
        glow: 'from-emerald-500/30 to-emerald-600/30'
      },
      green: {
        bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
        border: isDark ? 'border-green-500/20' : 'border-green-200',
        text: isDark ? 'text-green-400' : 'text-green-600',
        glow: 'from-green-500/30 to-green-600/30'
      },
      teal: {
        bg: isDark ? 'bg-teal-500/10' : 'bg-teal-50',
        border: isDark ? 'border-teal-500/20' : 'border-teal-200',
        text: isDark ? 'text-teal-400' : 'text-teal-600',
        glow: 'from-teal-500/30 to-teal-600/30'
      }
    };
    return colors[color];
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Background with subtle gradient */}
      <div className={`fixed inset-0 -z-10 transition-colors duration-700 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`} />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-300'
          }`} 
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        <div 
          className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-teal-600' : 'bg-teal-300'
          }`} 
          style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-3s' }}
        />
        <div 
          className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDark ? 'bg-green-600' : 'bg-green-300'
          }`} 
          style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '-6s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section
          ref={(el) => (sectionRefs.current['hero'] = el)}
          className="max-w-7xl mx-auto mb-20"
        >
          <div 
            className="text-center"
            style={{
              animation: inView['hero'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Our <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Impact</span>
            </h1>
            <p 
              className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Transforming lives, empowering communities, and revolutionizing agriculture across Africa
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section
          ref={(el) => (sectionRefs.current['stats'] = el)}
          className="max-w-7xl mx-auto mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => {
              const colorClasses = getColorClasses(stat.color, isDark);
              const Icon = stat.icon;
              
              return (
                <div
                  key={idx}
                  className={`relative group ${
                    inView['stats'] ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    animation: inView['stats'] 
                      ? `fadeInBounce 1s ease-out ${idx * 0.1}s backwards` 
                      : 'none'
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorClasses.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  />
                  
                  {/* Card */}
                  <div 
                    className={`relative h-full p-6 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' 
                        : 'bg-white/70 border-gray-200/50 hover:border-gray-300'
                    } backdrop-blur-sm hover:scale-105`}
                  >
                    {/* Icon */}
                    <div className={`mb-4 p-3 rounded-xl ${colorClasses.bg} ${colorClasses.border} border inline-block`}>
                      <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>

                    {/* Value */}
                    <h3 
                      className={`text-4xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {stat.value}
                    </h3>

                    {/* Label */}
                    <p 
                      className={`text-lg font-semibold mb-2 ${colorClasses.text}`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {stat.label}
                    </p>

                    {/* Description */}
                    <p 
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Journey Timeline */}
        <section
          ref={(el) => (sectionRefs.current['timeline'] = el)}
          className="max-w-5xl mx-auto mb-20"
        >
          <div 
            className="text-center mb-12"
            style={{
              animation: inView['timeline'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Our Journey
            </h2>
            <p 
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Key milestones in our mission to transform African agriculture
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`relative ${
                    idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                  style={{
                    animation: inView['timeline'] 
                      ? `fadeInBounce 1s ease-out ${0.2 + idx * 0.15}s backwards` 
                      : 'none'
                  }}
                >
                  <div className={`flex items-center ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}>
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${
                      idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}>
                      <div 
                        className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/50' 
                            : 'bg-white/70 border-gray-200/50 hover:border-emerald-400/50'
                        } backdrop-blur-sm`}
                      >
                        <span 
                          className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${
                            isDark 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {milestone.year}
                        </span>
                        <h3 
                          className={`text-xl font-bold mb-2 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {milestone.title}
                        </h3>
                        <p 
                          className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 bg-white z-10"
                      style={{
                        borderColor: isDark ? '#10b981' : '#059669'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          ref={(el) => (sectionRefs.current['cta'] = el)}
          className="max-w-4xl mx-auto text-center pb-20"
        >
          <div 
            className={`relative p-12 rounded-3xl border ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' 
                : 'bg-gradient-to-br from-white/80 to-emerald-50/50 border-emerald-200'
            } backdrop-blur-lg`}
            style={{
              animation: inView['cta'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 blur-2xl -z-10 opacity-50"
            />

            <h2 
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Join Us in Making an Impact
            </h2>
            <p 
              className={`text-lg mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Together, we can create lasting change in African agriculture
            </p>
            <button 
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              } shadow-xl`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Get Involved
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
      `}</style>
    </div>
  );
};

export default OurImpact;