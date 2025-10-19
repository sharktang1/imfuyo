// ==========================================
// src/pages/About/aboutComps/AboutFooter.jsx
// ==========================================
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const navItems = [
  { name: 'Who We Are', index: 0 },
  { name: 'Mission & Vision', index: 1 },
  { name: 'Team', index: 2 },
  { name: 'Awards', index: 3 },
  { name: 'Partners', index: 4 },
  { name: 'Testimonials', index: 5 }
];

export default function AboutFooter({ isActive, isDark, setActiveSection }) {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <section className="relative w-full h-screen flex flex-col bg-[#1b4332]">
        <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img src="https://res.cloudinary.com/dpymwa41m/image/upload/v1760774001/Facebook1_jjvwsz.jpg" alt="Imfuyo Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>Imfuyo</span>
                </div>
                <p className="text-[#d8f3dc] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Transforming African agriculture through innovative fintech solutions.
                </p>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Quick Links</h3>
                <ul className="space-y-2">
                  {navItems.map((item, idx) => (
                    <li key={idx}>
                      <button onClick={() => setActiveSection(item.index)} className="text-[#d8f3dc] hover:text-[#95d5b2] transition-colors text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Services</h3>
                <ul className="space-y-2 text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <li>Agricultural Loans</li>
                  <li>Data Analytics</li>
                  <li>Market Access</li>
                  <li>Financial Advisory</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact</h3>
                <ul className="space-y-3 text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <li className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>info@imfuyo.com</span></li>
                  <li className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+254 700 000 000</span></li>
                  <li className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>Nairobi, Kenya</span></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[#d8f3dc]/20 mb-8"></div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-[#d8f3dc] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>© 2025 Imfuyo. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
                    <Icon className="w-5 h-5 text-[#d8f3dc]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}