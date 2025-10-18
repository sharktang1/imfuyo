import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Moon, Sun, Menu, Leaf, Users, Target, Award, Handshake, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Star, Quote } from 'lucide-react';

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, isDark, setIsDark, activeSection, setActiveSection }) => {
  const navItems = [
    { name: 'Who We Are', index: 0 },
    { name: 'Mission & Vision', index: 1 },
    { name: 'Team', index: 2 },
    { name: 'Awards', index: 3 },
    { name: 'Partners', index: 4 },
    { name: 'Testimonials', index: 5 }
  ];

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
};

// Navbar Component
const Navbar = ({ isDark, setIsDark, mobileMenuOpen, setMobileMenuOpen, activeSection, setActiveSection, onBack }) => {
  const navItems = [
    { name: 'Who We Are', index: 0 },
    { name: 'Mission & Vision', index: 1 },
    { name: 'Team', index: 2 },
    { name: 'Awards', index: 3 },
    { name: 'Partners', index: 4 },
    { name: 'Testimonials', index: 5 }
  ];

  return (
    <nav className="w-full relative z-50 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer" onClick={onBack}>
            <img src="https://res.cloudinary.com/dpymwa41m/image/upload/v1760774001/Facebook1_jjvwsz.jpg" alt="Imfuyo Logo" className="w-16 h-16 sm:w-20 sm:h-20 transform group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", color: '#6E260E' }}>Imfuyo</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <button key={idx} onClick={() => setActiveSection(item.index)} className={`relative px-4 py-2 font-medium rounded-2xl backdrop-blur-sm transition-all duration-300 ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'} ${activeSection === item.index ? 'bg-[#40916c]/20' : ''}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {item.name}
                {activeSection === item.index && <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#40916c] rounded-full"></span>}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-xl transition-colors ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Who We Are Section
const WhoWeAre = ({ isActive, isDark, parallaxOffset }) => {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${isDark ? 'bg-[#52b788]' : 'bg-[#74c69d]'}`} style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}></div>
          <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse ${isDark ? 'bg-[#40916c]' : 'bg-[#95d5b2]'}`} style={{ animationDelay: '2s', transform: `translate(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px)` }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Users className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Who We Are</h1>
          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            Imfuyo is a pioneering AgriFintech company dedicated to transforming African agriculture through innovative financial solutions and data-driven technologies. We bridge the gap between traditional farming practices and modern financial tools, empowering farmers with access to credit, insurance, and market intelligence.
          </p>
        </div>
      </div>
    </div>
  );
};

// Mission & Vision Section
const MissionVision = ({ isActive, isDark, parallaxOffset }) => {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] to-[#f0fdf4]'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${isDark ? 'bg-emerald-600' : 'bg-emerald-300'}`} style={{ transform: `translate(${parallaxOffset.x * 0.3}px, ${parallaxOffset.y * 0.3}px)` }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Target className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Mission & Vision</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl backdrop-blur-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'} shadow-xl`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Our Mission</h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                To revolutionize agricultural financing by providing accessible, technology-driven financial services that empower African farmers to scale their operations, manage risks, and achieve sustainable prosperity.
              </p>
            </div>

            <div className={`p-8 rounded-3xl backdrop-blur-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'} shadow-xl`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Our Vision</h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                To become Africa's leading AgriFintech platform, creating a thriving agricultural ecosystem where every farmer has access to the financial resources and insights needed to succeed in the modern economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Section
const Team = ({ isActive, isDark }) => {
  const teamMembers = [
    { name: 'Sarah Mwangi', role: 'CEO & Founder', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'James Ochieng', role: 'CTO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { name: 'Grace Njeri', role: 'Head of Operations', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' },
    { name: 'David Kimani', role: 'Lead Data Scientist', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' }
  ];

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-lg'}`}>
      <div className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]'}`}>
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <Users className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-[#74c69d]' : 'text-[#40916c]'}`} strokeWidth={1.5} />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>Our Team</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className={`p-6 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/70 border border-white/50'} shadow-xl hover:scale-105 transition-transform duration-300`}>
                <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4 bg-[#40916c]/10" />
                <h3 className={`text-lg font-bold text-center mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{member.name}</h3>
                <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Awards Section
const Awards = ({ isActive, isDark }) => {
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
};

// Partners Section
const Partners = ({ isActive, isDark }) => {
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
};

// Testimonials Section
const Testimonials = ({ isActive, isDark }) => {
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
};

// Footer Component
const Footer = ({ isActive, isDark, setActiveSection }) => {
  const navItems = [
    { name: 'Who We Are', index: 0 },
    { name: 'Mission & Vision', index: 1 },
    { name: 'Team', index: 2 },
    { name: 'Awards', index: 3 },
    { name: 'Partners', index: 4 },
    { name: 'Testimonials', index: 5 }
  ];

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
};

// Main About Page Component
export default function AboutPage({ isDark, setIsDark, onBack }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const lastScrollRef = useRef(0);

  const sections = ['who-we-are', 'mission-vision', 'team', 'awards', 'partners', 'testimonials', 'footer'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollRef.current < 900) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      let newSection = activeSection + direction;
      newSection = Math.max(0, Math.min(newSection, sections.length - 1));

      if (newSection !== activeSection) {
        setActiveSection(newSection);
        lastScrollRef.current = now;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeSection, sections.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-gray-900' : ''}`} style={{ height: '100vh', userSelect: 'none' }}>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isDark={isDark} setIsDark={setIsDark} activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection !== 6 && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
          <Navbar isDark={isDark} setIsDark={setIsDark} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} activeSection={activeSection} setActiveSection={setActiveSection} onBack={onBack} />
        </div>
      )}

      <div className="relative w-full h-full overflow-hidden">
        <WhoWeAre isActive={activeSection === 0} isDark={isDark} parallaxOffset={parallaxOffset} />
        <MissionVision isActive={activeSection === 1} isDark={isDark} parallaxOffset={parallaxOffset} />
        <Team isActive={activeSection === 2} isDark={isDark} />
        <Awards isActive={activeSection === 3} isDark={isDark} />
        <Partners isActive={activeSection === 4} isDark={isDark} />
        <Testimonials isActive={activeSection === 5} isDark={isDark} />
        <Footer isActive={activeSection === 6} isDark={isDark} setActiveSection={setActiveSection} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow: hidden;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}