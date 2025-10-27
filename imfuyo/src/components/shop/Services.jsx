import React, { useState } from 'react';
import { Check, Phone, Mail, MessageCircle, X } from 'lucide-react';

const Services = ({ isDark }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const services = [
    {
      id: 1,
      name: 'Imfuyo Farmers Academy Enrollment',
      category: 'education',
      description: 'Comprehensive training programs on modern livestock management practices, breeding techniques, and sustainable farming.',
      audience: ['Farmers', 'Farmer Groups', 'Farmer Associations'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      features: ['Hands-on Training', 'Expert Instructors', 'Certificate Program', 'Ongoing Support']
    },
    {
      id: 2,
      name: 'Dairy Goat Farm Tours',
      category: 'education',
      description: 'Guided tours of our model dairy goat farm showcasing best practices in goat husbandry and farm management.',
      audience: ['Farmers', 'Schools', 'Farmer Groups'],
      image: 'https://images.unsplash.com/photo-1583237804408-170b8f6716d1?w=800',
      features: ['Interactive Learning', 'Farm Demonstrations', 'Q&A Sessions', 'Practical Insights']
    },
    {
      id: 3,
      name: 'Imfuyo Internship Program',
      category: 'internship',
      description: 'Professional internship opportunities for university students interested in livestock management, veterinary science, and agricultural business. Gain hands-on experience in real farm operations.',
      audience: ['University Students', 'Agricultural Colleges', 'Veterinary Students'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      features: ['Real-world Experience', 'Mentorship Program', 'Certificate of Completion', 'Career Development']
    },
    {
      id: 4,
      name: 'Veterinary Consultancy Services',
      category: 'consulting',
      description: 'Professional veterinary advice and consultancy for livestock health management, disease prevention, and treatment protocols.',
      audience: ['Farmers', 'Dairy Cooperatives', 'Slaughter Houses'],
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
      features: ['Expert Consultation', 'Health Assessments', 'Treatment Plans', 'Emergency Support']
    },
    {
      id: 5,
      name: 'Livestock Insurance',
      category: 'financial',
      description: 'Comprehensive insurance solutions protecting your livestock investment against risks and uncertainties.',
      audience: ['Farmers', 'Insurance Companies', 'Farmer Groups'],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      features: ['Risk Coverage', 'Claims Support', 'Flexible Plans', 'Affordable Premiums']
    },
    {
      id: 6,
      name: 'Livestock Financing',
      category: 'financial',
      description: 'Financing solutions for cow or goat purchases, helping farmers expand their herds with flexible payment terms.',
      audience: ['Farmers', 'Financial Institutions', 'SACCOs', 'Microfinance'],
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
      features: ['Flexible Terms', 'Low Interest', 'Quick Approval', 'Asset Financing']
    },
    {
      id: 7,
      name: 'Fodder Financing',
      category: 'financial',
      description: 'Specialized financing for fodder production and feed management to ensure year-round livestock nutrition.',
      audience: ['Farmers', 'Dairy Cooperatives', 'Banks'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      features: ['Feed Security', 'Production Support', 'Seasonal Financing', 'Growth Plans']
    },
    {
      id: 8,
      name: 'Imfuyo Stocks - Livestock Investment',
      category: 'investment',
      description: 'Diversify your portfolio with livestock market investments. Access opportunities in dairy cattle, meat production, small ruminants, and pigs. Professional management and market insights included.',
      audience: ['Investors', 'Financial Institutions', 'Cooperatives', 'Entrepreneurs'],
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
      features: ['Portfolio Diversification', 'Market Analysis', 'Professional Management', 'Growth Potential']
    }
  ];

  const filteredServices = categoryFilter === 'all' 
    ? services 
    : services.filter(s => s.category === categoryFilter);

  const ServiceModal = () => {
    if (!selectedService) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
          <div className={`sticky top-0 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border-b p-6 flex justify-between items-center z-10`}>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedService.name}
            </h3>
            <button
              onClick={() => setSelectedService(null)}
              className={`p-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-colors`}
            >
              <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                
                <div className="mt-6">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                  {selectedService.description}
                </p>

                <div className="mb-8">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                    Target Audience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.audience.map((aud, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-700'} rounded-full text-sm font-medium`}
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-green-50 to-emerald-50'} p-6 rounded-2xl`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Get in Touch
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+254700000000"
                      className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-md'} rounded-xl transition-shadow`}
                    >
                      <div className={`w-10 h-10 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Call Us</p>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>+254 700 000 000</p>
                      </div>
                    </a>
                    <a
                      href="mailto:info@imfuyo.com"
                      className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-md'} rounded-xl transition-shadow`}
                    >
                      <div className={`w-10 h-10 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>info@imfuyo.com</p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/254700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-md'} rounded-xl transition-shadow`}
                    >
                      <div className={`w-10 h-10 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>WhatsApp</p>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>Chat with us</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'all'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Services
        </button>
        <button
          onClick={() => setCategoryFilter('education')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'education'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setCategoryFilter('internship')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'internship'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Internship
        </button>
        <button
          onClick={() => setCategoryFilter('consulting')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'consulting'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Consulting
        </button>
        <button
          onClick={() => setCategoryFilter('financial')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'financial'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Financial
        </button>
        <button
          onClick={() => setCategoryFilter('investment')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            categoryFilter === 'investment'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Investment
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`group ${isDark ? 'bg-gray-900 border-gray-800 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'} rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer`}
            onClick={() => setSelectedService(service)}
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-700'} text-xs font-semibold rounded-full capitalize`}>
                  {service.category}
                </span>
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                {service.name}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-3`}>
                {service.description}
              </p>
              <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>
                  For:
                </p>
                <div className="flex flex-wrap gap-1">
                  {service.audience.slice(0, 2).map((aud, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'} text-xs rounded-lg`}
                    >
                      {aud}
                    </span>
                  ))}
                  {service.audience.length > 2 && (
                    <span className={`px-2 py-1 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'} text-xs rounded-lg`}>
                      +{service.audience.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              <button className={`mt-4 w-full ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-green-400' : 'bg-green-50 hover:bg-green-100 text-green-700'} py-3 rounded-xl font-medium transition-colors`}>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal />
    </div>
  );
};

export default Services;