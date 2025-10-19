// ==========================================
// src/pages/About/aboutComps/AboutNavbar.jsx
// ==========================================
import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';

const navItems = [
  { name: 'Who We Are', index: 0 },
  { name: 'Mission & Vision', index: 1 },
  { name: 'Team', index: 2 },
  { name: 'Awards', index: 3 },
  { name: 'Partners', index: 4 },
  { name: 'Testimonials', index: 5 }
];

export default function AboutNavbar({ isDark, setIsDark, mobileMenuOpen, setMobileMenuOpen, activeSection, setActiveSection, onBack }) {
  return (
    <nav className="w-full relative z-50 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer" onClick={onBack}>
            <img 
              src="https://res.cloudinary.com/dpymwa41m/image/upload/v1760774001/Facebook1_jjvwsz.jpg" 
              alt="Imfuyo Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 transform group-hover:scale-110 transition-transform duration-300" 
            />
            <span 
              className="text-xl sm:text-2xl font-bold tracking-tight" 
              style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}
            >
              Imfuyo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveSection(item.index)} 
                className={`relative px-4 py-2 font-medium rounded-2xl transition-all duration-300 ${
                  isDark 
                    ? 'text-gray-200 hover:bg-white/10' 
                    : 'text-gray-900 hover:bg-gray-100'
                } ${
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

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isDark 
                  ? 'text-gray-200 hover:bg-white/10' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}