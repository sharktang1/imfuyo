import React from 'react';
import { X, ArrowRight, Moon, Sun, Menu } from 'lucide-react';

const Navbar = ({ 
  isHero = false, 
  isDark, 
  setIsDark, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  activeSection, 
  setActiveSection 
}) => {
  const navItems = [
    { name: 'Home', index: 0 },
    { name: 'About', index: 1 },
    { name: 'Services', index: 2 },
    { name: 'Contact', index: 3 }
  ];

  const getNavStyle = () => {
    if (isHero) {
      return {
        text: 'text-[#f8f9fa]',
        hoverBg: 'hover:bg-white/15'
      };
    }
    return {
      text: isDark ? 'text-gray-200' : 'text-gray-900',
      hoverBg: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
    };
  };

  const navStyle = getNavStyle();

  return (
    <nav className="w-full relative z-50 pointer-events-auto" style={{ userSelect: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer">
            <img 
              src="https://res.cloudinary.com/dpymwa41m/image/upload/v1760774001/Facebook1_jjvwsz.jpg" 
              alt="Imfuyo Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>
              Imfuyo
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection && setActiveSection(item.index)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 font-medium rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-pointer ${navStyle.text} ${navStyle.hoverBg} ${
                  activeSection === item.index 
                    ? 'bg-[#40916c]/20' 
                    : ''
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item.name}
                {activeSection === item.index && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#40916c] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={() => setIsDark && setIsDark(!isDark)}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isHero
                  ? 'bg-white/15 hover:bg-white/25 text-white'
                  : isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <button className="flex items-center space-x-2 bg-[#40916c] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-[#2d6a4f] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform text-sm sm:text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors relative z-50 ${navStyle.text} ${navStyle.hoverBg}`}
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
  );
};

export default Navbar;