// ==========================================
// src/pages/About/aboutComps/AboutTestimonials.jsx
// ==========================================
import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function AboutTestimonials({ isActive, isDark }) {
  const testimonials = [
    {
      name: 'John Kamau',
      role: 'Dairy Farmer, Nakuru',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      text: 'Imfuyo has transformed my farming business. With their agricultural loans, I expanded my dairy farm and doubled my production. The process was simple and fast!',
      rating: 5
    },
    {
      name: 'Mary Wanjiru',
      role: 'Poultry Farmer, Kiambu',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary',
      text: 'The livestock insurance gave me peace of mind. When disease affected my chickens, Imfuyo supported me through the claim process. Highly recommend!',
      rating: 5
    },
    {
      name: 'Peter Otieno',
      role: 'Mixed Farmer, Kisumu',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter',
      text: 'The financial education programs opened my eyes to better farm management. Now I make data-driven decisions that have increased my profits significantly.',
      rating: 5
    }
  ];

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] to-[#f0fdf4]'}`}>
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <Quote className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>What Farmers Say</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={`p-6 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'} shadow-xl hover:scale-105 transition-transform duration-300`}>
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full bg-[#40916c]/10 mr-3" />
                  <div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{testimonial.name}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
