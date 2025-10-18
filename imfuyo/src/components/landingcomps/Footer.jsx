import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = ({ isActive, transformClass, setActiveSection }) => {
  const navItems = [
    { name: 'Home', index: 0 },
    { name: 'About', index: 1 },
    { name: 'Services', index: 2 },
    { name: 'Contact', index: 3 }
  ];

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out filter ${transformClass}`}>
      <section className="relative w-full h-screen flex flex-col bg-[#1b4332]">
        {/* Footer Content */}
        <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Top Section */}
            <div className={`transition-all duration-1000 ${
              isActive
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
                {/* Brand Column */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src="https://res.cloudinary.com/dpymwa41m/image/upload/v1760774001/Facebook1_jjvwsz.jpg" 
                      alt="Imfuyo Logo" 
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    <span className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>
                      Imfuyo
                    </span>
                  </div>
                  <p className="text-[#d8f3dc] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Transforming African agriculture through innovative fintech solutions.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    {navItems.map((item, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => setActiveSection && setActiveSection(item.index)}
                          className="text-[#d8f3dc] hover:text-[#95d5b2] transition-colors text-sm"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Services
                  </h3>
                  <ul className="space-y-2 text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <li>Agricultural Loans</li>
                    <li>Data Analytics</li>
                    <li>Market Access</li>
                    <li>Financial Advisory</li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Contact
                  </h3>
                  <ul className="space-y-3 text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <li className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>info@imfuyo.com</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+254 700 000 000</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Nairobi, Kenya</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`border-t border-[#d8f3dc]/20 mb-8 transition-all duration-1000 ${
              isActive
                ? 'opacity-100' 
                : 'opacity-0'
            }`} style={{ transitionDelay: isActive ? '0.2s' : '0s' }}></div>

            {/* Bottom Section */}
            <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-all duration-1000 ${
              isActive
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: isActive ? '0.4s' : '0s' }}>
              {/* Copyright */}
              <p className="text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                © 2025 Imfuyo. All rights reserved.
              </p>

              {/* Social Media */}
              <div className="flex items-center space-x-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Instagram, href: '#' }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
                  >
                    <social.icon className="w-5 h-5 text-[#d8f3dc]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;