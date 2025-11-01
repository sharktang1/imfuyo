import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, MapPin, Award, Heart, Sprout, DollarSign, Target, ArrowRight, Building2, ChartBar, Rocket, Calendar } from 'lucide-react';
import { db } from '../Libs/firebase-config.mjs';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const ImfuyoFoundationInc = ({ isDark, onBack, onNavigate }) => {
  const [inView, setInView] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const sectionRefs = useRef({});

  // Cache configuration
  const CACHE_KEY = 'foundation-content-cache';
  const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

  // Default fallback data
  const defaultPageData = {
    stats: [
      {
        icon: 'DollarSign',
        value: '$25M+',
        label: 'Capital Deployed',
        description: 'Total funding provided to agricultural communities through investor support',
        color: 'emerald'
      },
      {
        icon: 'Users',
        value: '50,000+',
        label: 'Farmers Empowered',
        description: 'Smallholder farmers gaining access to better financial products and services',
        color: 'green'
      },
      {
        icon: 'TrendingUp',
        value: '85%',
        label: 'Income Growth',
        description: 'Average increase in farmer income through our enhanced funding programs',
        color: 'teal'
      },
      {
        icon: 'Target',
        value: '98%',
        label: 'Repayment Rate',
        description: 'Outstanding success rate demonstrating sustainable financial model',
        color: 'emerald'
      },
      {
        icon: 'Sprout',
        value: '2M+',
        label: 'Hectares Supported',
        description: 'Agricultural land benefiting from investor-funded improvements',
        color: 'green'
      },
      {
        icon: 'MapPin',
        value: '150+',
        label: 'Communities Reached',
        description: 'Rural communities transformed through strategic investor partnerships',
        color: 'teal'
      },
      {
        icon: 'ChartBar',
        value: '45%',
        label: 'ROI Projection',
        description: 'Expected return on investment for strategic funding partners',
        color: 'emerald'
      },
      {
        icon: 'Building2',
        value: '40+',
        label: 'Partner Organizations',
        description: 'Strategic collaborations with NGOs, cooperatives, and financial institutions',
        color: 'green'
      }
    ],
    milestones: [
      {
        year: '2018',
        title: 'Foundation Established',
        description: 'Imfuyo Foundation Inc. was founded with a vision to revolutionize agricultural finance in Africa',
        impact: 'Foundation'
      },
      {
        year: '2019',
        title: 'First Pilot Program',
        description: 'Launched initial pilot program with 500 farmers in Kenya, validating our financial model',
        impact: '500 Farmers'
      },
      {
        year: '2020',
        title: 'Technology Platform Development',
        description: 'Built proprietary mobile platform for farmer onboarding and credit assessment',
        impact: 'Tech Launch'
      },
      {
        year: '2021',
        title: 'Regional Expansion Begins',
        description: 'Expanded operations to Tanzania and Uganda, reaching 5,000 farmers',
        impact: '3 Countries'
      },
      {
        year: '2022',
        title: '$5M Funding Milestone',
        description: 'Secured significant investment and deployed $5M in agricultural financing',
        impact: '$5M Deployed'
      },
      {
        year: '2023',
        title: 'Award Recognition',
        description: 'Received industry recognition and expanded to 10,000 farmers across East Africa',
        impact: '10K Farmers'
      },
      {
        year: '2024',
        title: 'Current Scale',
        description: 'Now serving 50,000+ farmers with $25M+ capital deployed and 98% repayment rate',
        impact: 'Market Leader'
      }
    ],
    opportunities: [
      {
        area: 'Technology Infrastructure',
        amount: '$5M',
        impact: 'Enhanced data analytics and mobile platform for 500,000 farmers',
        return: '3.2x ROI'
      },
      {
        area: 'Farmer Credit Expansion',
        amount: '$10M',
        impact: 'Provide microloans to 100,000 new farmers across East Africa',
        return: '2.8x ROI'
      },
      {
        area: 'Insurance Products',
        amount: '$3M',
        impact: 'Launch livestock and crop insurance protecting 50,000 families',
        return: '3.5x ROI'
      },
      {
        area: 'Market Linkages',
        amount: '$2M',
        impact: 'Connect 200,000 farmers to premium markets and better prices',
        return: '4.1x ROI'
      }
    ],
    predictions: [
      {
        year: '2025',
        title: 'Regional Expansion',
        description: 'Expand to 3 new African countries, targeting 100,000 additional farmers',
        impact: '+150% Growth'
      },
      {
        year: '2026',
        title: 'Product Diversification',
        description: 'Launch livestock insurance and climate-resilient farming products',
        impact: '+200% Revenue'
      },
      {
        year: '2027',
        title: 'Data Intelligence Platform',
        description: 'Implement AI-driven predictive analytics for crop yields and market pricing',
        impact: '+300% Efficiency'
      },
      {
        year: '2028',
        title: 'Pan-African Leadership',
        description: 'Become the largest AgriFintech platform serving 1 million farmers across Africa',
        impact: 'Market Leader'
      }
    ]
  };

  // Cache management functions
  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
      
      localStorage.removeItem(CACHE_KEY);
      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  };

  const setCachedData = (data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  };

  // Check for meta updates
  const checkForMetaUpdates = async () => {
    try {
      const metaRef = collection(db, 'imfuyofoundation', 'meta', 'changes');
      const metaSnap = await getDocs(metaRef);
      
      let latestUpdate = null;
      
      metaSnap.forEach((doc) => {
        const metaData = doc.data();
        const updateTime = metaData.timestamp?.toDate?.()?.getTime();
        if (updateTime && (!latestUpdate || updateTime > latestUpdate)) {
          latestUpdate = updateTime;
        }
      });
      
      return latestUpdate;
    } catch (error) {
      console.error('Error checking meta updates:', error);
      return null;
    }
  };

  // Fetch page data from Firestore
  const fetchPageData = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      
      // Check cache first
      if (!forceRefresh) {
        const cachedData = getCachedData();
        if (cachedData) {
          setPageData(cachedData);
          setIsLoading(false);
          checkAndUpdateIfNeeded(cachedData.lastMetaCheck);
          return;
        }
      }

      // Fetch all sections from Firestore
      const [statsSnap, journeySnap, investmentSnap, futureSnap] = await Promise.all([
        getDoc(doc(db, 'imfuyofoundation', 'stats')),
        getDoc(doc(db, 'imfuyofoundation', 'journey')),
        getDoc(doc(db, 'imfuyofoundation', 'investment')),
        getDoc(doc(db, 'imfuyofoundation', 'future'))
      ]);

      const fetchedData = {
        stats: statsSnap.exists() && statsSnap.data().stats ? statsSnap.data().stats : defaultPageData.stats,
        milestones: journeySnap.exists() && journeySnap.data().milestones ? journeySnap.data().milestones : defaultPageData.milestones,
        opportunities: investmentSnap.exists() && investmentSnap.data().opportunities ? investmentSnap.data().opportunities : defaultPageData.opportunities,
        predictions: futureSnap.exists() && futureSnap.data().predictions ? futureSnap.data().predictions : defaultPageData.predictions,
        lastMetaCheck: Date.now()
      };

      console.log('Foundation page data loaded from Firestore');
      setPageData(fetchedData);
      setCachedData(fetchedData);
      
    } catch (error) {
      console.error('Error fetching foundation data:', error);
      setPageData(defaultPageData);
    } finally {
      setIsLoading(false);
    }
  };

  // Check and update if needed
  const checkAndUpdateIfNeeded = async (lastCheckTime) => {
    try {
      const latestUpdate = await checkForMetaUpdates();
      
      if (latestUpdate && latestUpdate > lastCheckTime) {
        console.log('Foundation page updated, refreshing data...');
        fetchPageData(true);
      }
    } catch (error) {
      console.error('Error in background update check:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPageData();
  }, []);

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
  }, [isLoading]);

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

  const getIconComponent = (iconName) => {
    const icons = {
      DollarSign,
      Users,
      TrendingUp,
      Target,
      Sprout,
      MapPin,
      ChartBar,
      Building2
    };
    return icons[iconName] || Target;
  };

  const handleGetInvolved = () => {
    if (onNavigate) {
      onNavigate('members');
    }
  };

  // Show loading state
  if (isLoading || !pageData) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>
        <div className="relative z-10 text-center">
          <div className="animate-pulse">
            <div className={`w-16 h-16 border-4 ${isDark ? 'border-white' : 'border-gray-900'} border-t-transparent rounded-full animate-spin mx-auto`} />
          </div>
          <p className={`mt-4 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            Loading foundation data...
          </p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center justify-center mb-4">
              <Building2 className={`w-8 h-8 mr-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span 
                className={`text-lg font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Imfuyo Foundation Inc.
              </span>
            </div>
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Invest in <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Transformation</span>
            </h1>
            <p 
              className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Join us in revolutionizing African agriculture through strategic investment. 
              Your funding enables better products, enhanced services, and data-driven solutions for millions of farmers.
            </p>
          </div>
        </section>

        {/* Foundation KPIs */}
        <section
          ref={(el) => (sectionRefs.current['stats'] = el)}
          className="max-w-7xl mx-auto mb-20"
        >
          <div 
            className="text-center mb-12"
            style={{
              animation: inView['stats'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Proven Impact Metrics
            </h2>
            <p 
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Demonstrated success and scalable model ready for strategic investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.stats.map((stat, idx) => {
              const colorClasses = getColorClasses(stat.color, isDark);
              const Icon = getIconComponent(stat.icon);
              
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

        {/* Complete Growth Journey */}
        <section
          ref={(el) => (sectionRefs.current['journey'] = el)}
          className="max-w-6xl mx-auto mb-20"
        >
          <div 
            className="text-center mb-12"
            style={{
              animation: inView['journey'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <div className="flex items-center justify-center mb-4">
              <Calendar className={`w-8 h-8 mr-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h2 
                className={`text-4xl sm:text-5xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Our Growth Journey
              </h2>
            </div>
            <p 
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              From foundation to market leadership - A proven track record of growth and impact
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
              {pageData.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`relative ${
                    idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                  style={{
                    animation: inView['journey'] 
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
                          className={`text-sm mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {milestone.description}
                        </p>
                        <div className={`text-xs font-semibold ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                          Impact: {milestone.impact}
                        </div>
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

        {/* Investment Opportunities */}
        <section
          ref={(el) => (sectionRefs.current['opportunities'] = el)}
          className="max-w-7xl mx-auto mb-20"
        >
          <div 
            className="text-center mb-12"
            style={{
              animation: inView['opportunities'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <h2 
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Strategic Investment Areas
            </h2>
            <p 
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Targeted funding opportunities with measurable impact and returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.opportunities.map((opportunity, idx) => (
              <div
                key={idx}
                className={`relative group ${
                  inView['opportunities'] ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animation: inView['opportunities'] 
                    ? `fadeInBounce 1s ease-out ${idx * 0.2}s backwards` 
                    : 'none'
                }}
              >
                <div 
                  className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/50' 
                      : 'bg-white/70 border-gray-200/50 hover:border-emerald-400/50'
                  } backdrop-blur-sm`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 
                      className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {opportunity.area}
                    </h3>
                    <span 
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        isDark 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {opportunity.amount}
                    </span>
                  </div>
                  <p 
                    className={`text-lg mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {opportunity.impact}
                  </p>
                  <div className="flex justify-between items-center">
                    <span 
                      className={`text-sm font-semibold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      Projected Return: {opportunity.return}
                    </span>
                    <ArrowRight className={`w-5 h-5 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Predictions */}
        <section
          ref={(el) => (sectionRefs.current['future'] = el)}
          className="max-w-4xl mx-auto mb-20"
        >
          <div 
            className="text-center mb-12"
            style={{
              animation: inView['future'] ? 'fadeInBounce 1s ease-out' : 'none'
            }}
          >
            <div className="flex items-center justify-center mb-4">
              <Rocket className={`w-8 h-8 mr-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h2 
                className={`text-4xl sm:text-5xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Future Growth Roadmap
              </h2>
            </div>
            <p 
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Strategic expansion plans enabled by investor funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.predictions.map((prediction, idx) => (
              <div
                key={idx}
                className={`relative group ${
                  inView['future'] ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animation: inView['future'] 
                    ? `fadeInBounce 1s ease-out ${idx * 0.2}s backwards` 
                    : 'none'
                }}
              >
                <div 
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700/50 hover:border-green-500/50' 
                      : 'bg-white/70 border-gray-200/50 hover:border-green-400/50'
                  } backdrop-blur-sm`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isDark 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {prediction.year}
                    </span>
                    <span 
                      className={`text-sm font-bold ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      {prediction.impact}
                    </span>
                  </div>
                  <h3 
                    className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {prediction.title}
                  </h3>
                  <p 
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {prediction.description}
                  </p>
                </div>
              </div>
            ))}
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
              Join Our Mission
            </h2>
            <p 
              className={`text-lg mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Invest in sustainable agricultural transformation and achieve meaningful returns while creating lasting impact
            </p>
            <button 
              onClick={handleGetInvolved}
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

      {/* Global Styles with Green Scrollbar */}
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

        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f3f4f6'};
        }

        ::-webkit-scrollbar-thumb {
          background: #40916c;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2d6a4f;
        }
      `}</style>
    </div>
  );
};

export default ImfuyoFoundationInc;