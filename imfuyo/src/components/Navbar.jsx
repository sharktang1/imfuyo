import React from 'react';
import { Moon, Sun, Menu, X, Heart, Store, Leaf, Home } from 'lucide-react';

const Navbar = ({ 
  currentPage,
  onNavigate,
  isDark, 
  setIsDark, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  isHero = false,
  activeSection
}) => {
  const navItems = [
    { name: 'Home', page: 'landing', icon: 'Home' },
    { name: 'About', page: 'about' },
    { name: 'What We Do', page: 'whatwedo' },
    { name: 'Imfuyo Foundation Inc', page: 'impact' },
    { name: 'Market Place', page: 'shop', icon: 'Store' }
  ];

  const handleNavClick = (item) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    if (item.page === 'contact') {
      onNavigate('landing', 'contact');
    } else {
      onNavigate(item.page);
    }
  };

  const getNavStyle = () => {
    if (isDark) {
      return {
        navBg: 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800',
        text: 'text-white',
        iconColor: 'text-white',
        hoverBg: 'hover:bg-white/10',
        themeBg: 'bg-white/10 hover:bg-white/20 text-white'
      };
    }
    
    return {
      navBg: 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100',
      text: 'text-gray-900',
      iconColor: 'text-gray-900',
      hoverBg: 'hover:bg-gray-100',
      themeBg: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
    };
  };

  const navStyle = getNavStyle();

  const isActive = (item) => {
    if (item.page === 'contact') {
      return false;
    }
    return currentPage === item.page;
  };

  const isFooterSection = () => {
    if (currentPage === 'landing' && activeSection === 4) return true;
    if (currentPage === 'about' && activeSection === 6) return true;
    return false;
  };

  if (isFooterSection()) {
    return null;
  }

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navStyle.navBg}`} style={{ userSelect: 'auto' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div 
              className="flex items-center group cursor-pointer"
              onClick={() => onNavigate('landing')}
            >
              <img 
                src="https://res.cloudinary.com/dpymwa41m/image/upload/v1761938559/Gemini_Generated_Image_b62mhwb62mhwb62m-removebg-preview_dhwqj1.png" 
                alt="Imfuyo Logo" 
                className="w-16 h-16 sm:w-18 sm:h-18 transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 font-medium rounded-2xl transition-all duration-300 cursor-pointer flex items-center space-x-2 ${navStyle.text} ${navStyle.hoverBg} ${
                    isActive(item) 
                      ? 'bg-[#40916c]/20' 
                      : ''
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.icon === 'Store' && <Store className="w-4 h-4" />}
                  {item.icon === 'Home' && <Home className="w-4 h-4" />}
                  <span>{item.name}</span>
                  {isActive(item) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#40916c] rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => setIsDark && setIsDark(!isDark)}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${navStyle.themeBg}`}
              >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <button 
                onClick={() => handleNavClick({ page: 'contact' })}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm sm:text-base" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Heart className="w-4 h-4 sm:w-4 sm:h-4 fill-current" />
                <span>Make A Donation</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button 
                onClick={() => setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors relative z-[60] ${navStyle.iconColor} ${navStyle.hoverBg}`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-[#2d6a4f]/95 backdrop-blur-2xl transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Close Button - Top Right */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute top-6 right-6 z-[60] p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content Container */}
        <div className={`relative h-full flex items-center justify-center transition-all duration-500 transform ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center space-y-6 px-4 w-full max-w-sm">
            {/* Logo Header */}
            <div 
              className="flex items-center justify-center mb-8 cursor-pointer group"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('landing');
              }}
            >
              <img 
                src="https://res.cloudinary.com/dpymwa41m/image/upload/v1761938559/Gemini_Generated_Image_b62mhwb62mhwb62m-removebg-preview_dhwqj1.png" 
                alt="Imfuyo Logo" 
                className="w-25 h-25 transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Navigation Items */}
            <div className="space-y-3">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className="block group w-full"
                >
                  <span 
                    className={`relative flex items-center justify-center space-x-2 text-xl font-semibold px-6 py-3 transition-all duration-300 rounded-2xl ${
                      isActive(item)
                        ? 'text-[#95d5b2] bg-white/20'
                        : 'text-[#f8f9fa] hover:text-[#95d5b2] hover:bg-white/10'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.icon === 'Store' && <Store className="w-5 h-5" />}
                    {item.icon === 'Home' && <Home className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  setIsDark && setIsDark(!isDark);
                }}
                className="w-full flex items-center justify-center space-x-3 bg-white/15 text-white px-6 py-4 rounded-full font-semibold hover:bg-white/25 transition-all duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {isDark ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Make A Donation Button */}
            <div className="pt-2">
              <button 
                onClick={() => handleNavClick({ page: 'contact' })}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 text-base"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Make A Donation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </>
  );
};

export default Navbar;