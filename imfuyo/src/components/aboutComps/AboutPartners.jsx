// ==========================================
// src/pages/About/aboutComps/AboutPartners.jsx
// ==========================================
import React from 'react';
import { Handshake } from 'lucide-react';

export default function AboutPartners({ isActive, isDark }) {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]'}`}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Handshake className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Our Partners</h1>
          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            We collaborate with leading financial institutions, technology providers, and agricultural organizations to deliver comprehensive solutions. Our strategic partnerships enable us to expand our reach and provide farmers with the best tools and services available in the market.
          </p>
        </div>
      </div>
    </div>
  );
}
