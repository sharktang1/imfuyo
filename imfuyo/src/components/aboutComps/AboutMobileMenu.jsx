// ==========================================
// src/pages/About/aboutComps/AboutMobileMenu.jsx
// ==========================================
import React from 'react';
import { X, Moon, Sun, Leaf } from 'lucide-react';

const navItems = [
  { name: 'Who We Are', index: 0 },
  { name: 'Mission & Vision', index: 1 },
  { name: 'Team', index: 2 },
  { name: 'Awards', index: 3 },
  { name: 'Partners', index: 4 },
  { name: 'Testimonials', index: 5 }
];

export default function AboutMobileMenu({ isOpen, onClose, isDark, setIsDark, activeSection, setActiveSection }) {
  return (
    <div className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-[#2d6a4f]/95 backdrop-blur-2xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`relative h-full flex items-center justify-center transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center space-y-6 px-4 w-full max-w-sm">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-gradient-to-br from-[#74c69d] to-[#95d5b2] p-3 rounded-3xl">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>Imfuyo</span>
          </div>
          
          <div className="space-y-3">
            {navItems.map((item, idx) => (
              <button key={idx} onClick={() => { setActiveSection(item.index); onClose(); }} className="block group w-full">
                <span className="relative block text-xl font-semibold text-[#f8f9fa] px-6 py-3 transition-all duration-300 group-hover:text-[#95d5b2] group-hover:bg-white/10 rounded-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="pt-2">
            <button onClick={() => setIsDark(!isDark)} className="w-full flex items-center justify-center space-x-3 bg-white/15 text-white px-6 py-4 rounded-full font-semibold hover:bg-white/25 transition-all duration-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {isDark ? <><Sun className="w-5 h-5" /><span>Light Mode</span></> : <><Moon className="w-5 h-5" /><span>Dark Mode</span></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
