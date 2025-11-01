import React from 'react';
import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const navItems = [
    { name: 'About', page: 'about' },
    { name: 'What We Do', page: 'whatwedo' },
    { name: 'Imfuyo Foundation', page: 'impact' },
    { name: 'Shop', page: 'shop' }
  ];

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Fallback to sessionStorage method
      sessionStorage.setItem('targetPage', page);
      window.location.reload();
    }
  };

  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('landing');
    } else {
      sessionStorage.setItem('targetPage', 'landing');
      window.location.reload();
    }
  };

  return (
    <section className="relative w-full bg-[#1b4332]">
      <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <button 
                onClick={handleHomeClick}
                className="flex items-center space-x-3 mb-4 group cursor-pointer"
              >
                <img 
                  src="https://res.cloudinary.com/dpymwa41m/image/upload/v1761939036/Gemini_Generated_Image_b62mhwb62mhwb62m_s1dmj2.png" 
                  alt="Imfuyo Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold text-white group-hover:text-[#95d5b2] transition-colors duration-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Imfuyo
                </span>
              </button>
              <p className="text-[#d8f3dc] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Transforming African agriculture through innovative fintech solutions.
              </p>
            </div>

            {/* Quick Links - Matches Navbar */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navItems.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavClick(item.page)}
                      className="text-[#d8f3dc] hover:text-[#95d5b2] transition-all duration-300 text-sm inline-block hover:translate-x-1 transform text-left w-full text-start"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Contact
              </h3>
              <ul className="space-y-3 text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <li className="flex items-center space-x-2 hover:text-[#95d5b2] transition-colors duration-300">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:info@imfuyo.com" className="hover:underline">info@imfuyo.com</a>
                </li>
                <li className="flex items-center space-x-2 hover:text-[#95d5b2] transition-colors duration-300">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+254700000000" className="hover:underline">+254 700 000 000</a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>

            {/* Social Media - Now in its own column */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {[
                  { icon: Facebook, href: 'https://facebook.com/imfuyo', label: 'Facebook' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/imfuyo', label: 'LinkedIn' },
                  { icon: Instagram, href: 'https://instagram.com/imfuyo', label: 'Instagram' }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 transform cursor-pointer"
                  >
                    <social.icon className="w-5 h-5 text-[#d8f3dc]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#d8f3dc]/20 mb-8"></div>

          {/* Bottom Section - Centered Social Icons */}
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media Icons - Centered */}
            <div className="flex items-center justify-center space-x-6">
              {[
                { icon: Facebook, href: 'https://facebook.com/imfuyo', label: 'Facebook' },
                { icon: Linkedin, href: 'https://linkedin.com/company/imfuyo', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://instagram.com/imfuyo', label: 'Instagram' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 transform cursor-pointer"
                >
                  <social.icon className="w-6 h-6 text-[#d8f3dc]" />
                </a>
              ))}
            </div>

            {/* Copyright - Centered */}
            <p className="text-[#d8f3dc] text-sm text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
              © 2025 Imfuyo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}