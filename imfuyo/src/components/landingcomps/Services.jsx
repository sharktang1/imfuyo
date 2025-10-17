import React from 'react';
import { CreditCard, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

const Services = ({ isActive, transformClass, parallaxOffset, isDark, setActiveSection, mobileMenuOpen, setMobileMenuOpen, activeSection, setIsDark }) => {
  const services = [
    { 
      icon: CreditCard, 
      title: 'Agricultural Loans', 
      description: 'Access flexible financing options tailored for farming needs with competitive rates and easy application processes.'
    },
    { 
      icon: BarChart3, 
      title: 'Data Analytics', 
      description: 'Leverage real-time insights and predictive analytics to make informed decisions about crop management and market trends.'
    },
    { 
      icon: TrendingUp, 
      title: 'Market Access', 
      description: 'Connect directly with buyers and suppliers, ensuring fair prices and reducing intermediaries in the supply chain.'
    }
  ];

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-out filter ${transformClass}`}>
      <section 
        className={`relative w-full h-screen flex flex-col transition-colors duration-700 ${
          isDark ? 'bg-gray-900' : 'bg-[#f5f1ed]'
        }`}
      >
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2340916c" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            transform: `translate(${parallaxOffset.x * 0.2}px, ${parallaxOffset.y * 0.2}px)`
          }}
        ></div>

        {/* Navbar integrated in services */}
        <div className="relative z-10">
          <Navbar 
            isDark={isDark}
            setIsDark={setIsDark}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Services Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              isActive
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Our <span style={{ color: '#6E260E' }}>Services & Solutions</span>
              </h2>
              <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto transition-colors duration-500 px-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Empowering farmers with cutting-edge financial solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {services.map((service, idx) => (
                <div 
                  key={idx}
                  className={`group p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-700 border transform ${
                    isActive
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-20 opacity-0 scale-90'
                  } ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
                      : 'bg-white border-gray-200 hover:shadow-2xl'
                  } hover:scale-105`}
                  style={{ transitionDelay: isActive ? `${idx * 150}ms` : '0s' }}
                >
                  <div className="mb-4 sm:mb-6">
                    <div className={`inline-flex p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
                      isDark ? 'bg-[#40916c]/20' : 'bg-[#40916c]/10'
                    } group-hover:bg-[#40916c] group-hover:scale-110`}>
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#40916c] group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;