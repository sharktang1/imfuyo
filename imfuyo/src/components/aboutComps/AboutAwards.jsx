// ==========================================
// src/pages/About/aboutComps/AboutAwards.jsx
// ==========================================
import React from 'react';
import { Award } from 'lucide-react';

export default function AboutAwards({ isActive, isDark }) {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] to-[#f0fdf4]'}`}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Award className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Awards & Recognition</h1>
          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            Recognized as one of East Africa's most innovative AgriFintech startups, Imfuyo has received multiple awards for technology innovation, financial inclusion, and impact on agricultural development. Our commitment to excellence continues to drive meaningful change across the continent.
          </p>
        </div>
      </div>
    </div>
  );
}