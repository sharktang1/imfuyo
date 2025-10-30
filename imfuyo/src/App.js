import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import CommunityBlogs from './components/CommunityBlogs';
import WhatWeDo from './components/WhatWeDo';
import OurImpact from './components/OurImpact';
import Shop from './components/Shop';
import AIConsulting from './components/AIConsulting';
import Members from './components/Members';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Floating WhatsApp Button Component
const FloatingWhatsAppButton = ({ isDark, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setHasShownInitial(true);
      
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 pointer-events-auto">
      {/* Tooltip Message */}
      <div 
        className={`absolute bottom-20 right-0 transition-all duration-500 transform ${
          showTooltip 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{
          maxWidth: '280px',
          minWidth: '240px'
        }}
      >
        <div 
          className={`relative rounded-2xl p-4 shadow-2xl ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
          style={{
            animation: showTooltip ? 'bounce-in 0.5s ease-out' : 'none'
          }}
        >
          <button
            onClick={() => setShowTooltip(false)}
            className={`absolute -top-2 -right-2 p-1.5 rounded-full transition-all duration-200 ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <X className="w-3 h-3" />
          </button>

          <p 
            className={`text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            💬 Reach out to us on WhatsApp!
          </p>
          
          <div 
            className={`absolute -bottom-2 right-8 w-4 h-4 transform rotate-45 ${
              isDark ? 'bg-gray-800 border-r border-b border-gray-700' : 'bg-white border-r border-b border-gray-200'
            }`}
          />
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => hasShownInitial && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)'
        }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-75 bg-green-400"
          style={{ animationDuration: '2s' }}
        />
        
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>

        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </button>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    return savedPage || 'landing';
  });
  
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = sessionStorage.getItem('isDark');
    return savedTheme === 'true';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [targetSection, setTargetSection] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  // Save currentPage to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Save dark mode preference to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('isDark', isDark);
  }, [isDark]);

  // Initial load effect
  useEffect(() => {
    const loadEverything = async () => {
      try {
        const lottiePromise = new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://lottie.host/68638530-e1e4-49f9-952a-1c3efcd7aeac/2hywu50vnf.lottie');
          xhr.onload = () => resolve(true);
          xhr.onerror = () => resolve(true);
          xhr.send();
        });

        await lottiePromise;
        
        setLottieLoaded(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

      } catch (error) {
        console.error('Loading error:', error);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    loadEverything();
  }, []);

  // Navigation handler
  const handleNavigation = (page, section = null) => {
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // If navigating to the same page, just change section
    if (page === currentPage && section) {
      setTargetSection(section);
      return;
    }

    // If navigating to a different page
    if (page !== currentPage) {
      setIsTransitioning(true);
      setLottieLoaded(false);
      
      // Reset active section when changing pages
      setActiveSection(0);
      
      setTimeout(() => {
        setLottieLoaded(true);
      }, 500);

      setTimeout(() => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        
        // If there's a section to navigate to, set it after page load
        if (section) {
          setTimeout(() => {
            setTargetSection(section);
          }, 300);
        }
        
        setIsTransitioning(false);
      }, 2000);
    }
  };

  // Navigate to About page
  const navigateToAbout = () => {
    handleNavigation('about');
  };

  // Navigate to Home/Landing page
  const navigateToHome = () => {
    handleNavigation('landing');
  };

  // Navigate to Community & Blogs page
  const navigateToCommunity = () => {
    handleNavigation('community');
  };

  // Navigate to AI Consulting page
  const navigateToAIConsulting = () => {
    handleNavigation('aiconsulting');
  };

  // Navigate to Members page
  const navigateToMembers = () => {
    handleNavigation('members');
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254700000000?text=Hello%20Imfuyo!%20I%20have%20a%20question', '_blank');
  };

  // Determine if we're on hero section for navbar styling
  // For landing page: hero is section 0
  // For other pages: all sections use dark text in light mode
  const isHero = currentPage === 'landing' && activeSection === 0;

  // Show loading screen for initial load or transitions
  if (isLoading || isTransitioning) {
    return <Loading lottieLoaded={lottieLoaded} />;
  }

  return (
    <div className="App">
      {/* Unified Navbar - Always visible on all pages */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigation}
          isDark={isDark}
          setIsDark={setIsDark}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isHero={isHero}
          activeSection={activeSection}
        />
      </div>

      {/* Page Content */}
      <div className="min-h-screen">
        {currentPage === 'landing' && (
          <LandingPage 
            isDark={isDark} 
            setIsDark={setIsDark}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCommunity={navigateToCommunity}
            onNavigateToAIConsulting={navigateToAIConsulting}
            targetSection={targetSection}
            setTargetSection={setTargetSection}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
        
        {currentPage === 'about' && (
          <AboutPage 
            isDark={isDark}
            setIsDark={setIsDark}
            onBack={navigateToHome}
            targetSection={targetSection}
            setTargetSection={setTargetSection}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}

        {currentPage === 'community' && (
          <CommunityBlogs 
            isDark={isDark}
            onBack={navigateToHome}
            onNavigate={handleNavigation}
          />
        )}

        {currentPage === 'whatwedo' && (
          <WhatWeDo 
            isDark={isDark}
            onBack={navigateToHome}
            onNavigate={handleNavigation}
          />
        )}

        {currentPage === 'impact' && (
          <OurImpact 
            isDark={isDark}
            onBack={navigateToHome}
            onNavigate={handleNavigation}
          />
        )}

        {currentPage === 'shop' && (
          <Shop 
            isDark={isDark}
            onBack={navigateToHome}
            onNavigate={handleNavigation}
          />
        )}

        {currentPage === 'aiconsulting' && (
          <AIConsulting 
            isDark={isDark}
            onBack={navigateToHome}
            onNavigate={handleNavigation}
          />
        )}

        {currentPage === 'members' && (
          <Members 
            isDark={isDark}
            onBack={navigateToHome}
          />
        )}
      </div>

      {/* Footer - Added to all pages */}
      <Footer onNavigate={handleNavigation} />

      {/* Floating WhatsApp Button - Available on all pages */}
      <FloatingWhatsAppButton 
        isDark={isDark}
        onClick={handleWhatsAppClick}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default App;