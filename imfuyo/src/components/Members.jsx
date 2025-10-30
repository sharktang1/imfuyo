import React, { useState } from 'react';
import { Users, TrendingUp, UserPlus, Building2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '../Libs/firebase-config.mjs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Members = ({ isDark, onBack }) => {
  const [step, setStep] = useState('select'); // 'select', 'form', 'success'
  const [memberType, setMemberType] = useState(null); // 'farmer', 'investor'
  const [registrationType, setRegistrationType] = useState('individual'); // 'individual', 'group'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    nationality: '',
    nationalId: '',
    county: '',
    city: '',
    town: '',
    phone: '',
    
    // Farmer specific
    livestockType: [],
    numberOfLivestock: '',
    
    // Investor specific
    investmentType: '',
    reasonForInvesting: '',
    
    // Group specific
    groupName: '',
    numberOfMembers: '',
    groupLeaderName: '',
    groupLeaderPhone: ''
  });

  const kenyaCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
    'Kitale', 'Garissa', 'Kakamega', 'Nyeri', 'Meru', 'Kiambu', 'Machakos',
    'Kajiado', 'Nandi', 'Kericho', 'Bomet', 'Narok', 'Laikipia', 'Samburu',
    'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'West Pokot', 'Turkana',
    'Baringo', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Kwale',
    'Makueni', 'Kitui', 'Embu', 'Tharaka Nithi', 'Marsabit', 'Isiolo',
    'Mandera', 'Wajir', 'Bungoma', 'Busia', 'Siaya', 'Kisii', 'Nyamira',
    'Vihiga', 'Homabay', 'Migori'
  ];

  const nationalityOptions = [
    { value: 'kenyan', label: 'Kenyan Citizen' },
    { value: 'east-african', label: 'East African Community Citizen' },
    { value: 'international', label: 'International/Immigrant' }
  ];

  const livestockTypes = ['Cattle', 'Goats', 'Sheep', 'Pigs'];
  
  const investmentTypes = [
    'Equity Investment',
    'Debt Financing',
    'Grant/Donation',
    'Impact Investment',
    'Venture Capital',
    'Angel Investment'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLivestockTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      livestockType: prev.livestockType.includes(type)
        ? prev.livestockType.filter(t => t !== type)
        : [...prev.livestockType, type]
    }));
  };

  const validateForm = () => {
    // Common validations
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.nationality) return 'Nationality is required';
    if (formData.nationality === 'kenyan' && !formData.nationalId.trim()) {
      return 'National ID is required for Kenyan citizens';
    }
    if (!formData.county) return 'County is required';
    if (!formData.city.trim()) return 'City is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.phone.startsWith('+')) return 'Phone number must start with country code (e.g., +254)';

    // Group validations
    if (registrationType === 'group') {
      if (!formData.groupName.trim()) return 'Group name is required';
      if (!formData.numberOfMembers || formData.numberOfMembers < 2) {
        return 'Number of members must be at least 2';
      }
      if (!formData.groupLeaderName.trim()) return 'Group leader name is required';
      if (!formData.groupLeaderPhone.trim()) return 'Group leader phone is required';
    }

    // Farmer validations
    if (memberType === 'farmer') {
      if (formData.livestockType.length === 0) return 'Please select at least one livestock type';
      if (!formData.numberOfLivestock || formData.numberOfLivestock < 1) {
        return 'Number of livestock must be at least 1';
      }
    }

    // Investor validations
    if (memberType === 'investor') {
      if (!formData.investmentType) return 'Investment type is required';
      if (!formData.reasonForInvesting.trim()) return 'Reason for investing is required';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const memberData = {
        memberType,
        registrationType,
        fullName: formData.fullName,
        nationality: formData.nationality,
        nationalId: formData.nationality === 'kenyan' ? formData.nationalId : null,
        location: {
          county: formData.county,
          city: formData.city,
          town: formData.town || null
        },
        phone: formData.phone,
        createdAt: serverTimestamp(),
        status: 'pending'
      };

      // Add group info if applicable
      if (registrationType === 'group') {
        memberData.groupInfo = {
          groupName: formData.groupName,
          numberOfMembers: parseInt(formData.numberOfMembers),
          groupLeaderName: formData.groupLeaderName,
          groupLeaderPhone: formData.groupLeaderPhone
        };
      }

      // Add farmer-specific data
      if (memberType === 'farmer') {
        memberData.farmerInfo = {
          livestockType: formData.livestockType,
          numberOfLivestock: parseInt(formData.numberOfLivestock)
        };
      }

      // Add investor-specific data
      if (memberType === 'investor') {
        memberData.investorInfo = {
          investmentType: formData.investmentType,
          reasonForInvesting: formData.reasonForInvesting
        };
      }

      await addDoc(collection(db, 'members'), memberData);
      
      setSuccessMessage(`Successfully registered as ${registrationType} ${memberType}!`);
      setStep('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('select');
    setMemberType(null);
    setRegistrationType('individual');
    setFormData({
      fullName: '',
      nationality: '',
      nationalId: '',
      county: '',
      city: '',
      town: '',
      phone: '',
      livestockType: [],
      numberOfLivestock: '',
      investmentType: '',
      reasonForInvesting: '',
      groupName: '',
      numberOfMembers: '',
      groupLeaderName: '',
      groupLeaderPhone: ''
    });
    setError('');
    setSuccessMessage('');
  };

  const selectMemberType = (type) => {
    setMemberType(type);
    setStep('form');
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Background */}
      <div className={`fixed inset-0 -z-10 transition-colors duration-700 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`} />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-emerald-600' : 'bg-emerald-300'
          }`} 
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        <div 
          className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-teal-600' : 'bg-teal-300'
          }`} 
          style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-3s' }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 
            className={`text-5xl sm:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Join <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Imfuyo</span>
          </h1>
          <p 
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Become part of our community and help transform African agriculture
          </p>
        </div>

        {/* Success Screen */}
        {step === 'success' && (
          <div className="max-w-2xl mx-auto">
            <div 
              className={`p-12 rounded-3xl border text-center ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/70 border-gray-200'
              } backdrop-blur-sm`}
              style={{ animation: 'fadeInBounce 0.6s ease-out' }}
            >
              <div className="mb-6">
                <CheckCircle2 className={`w-24 h-24 mx-auto ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
              </div>
              <h2 
                className={`text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Registration Successful!
              </h2>
              <p 
                className={`text-lg mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {successMessage}
              </p>
              <button
                onClick={resetForm}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Register Another Member
              </button>
            </div>
          </div>
        )}

        {/* Member Type Selection */}
        {step === 'select' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Farmer Card */}
              <div
                onClick={() => selectMemberType('farmer')}
                className={`group relative cursor-pointer p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/50' 
                    : 'bg-white/70 border-gray-200 hover:border-emerald-400/50'
                } backdrop-blur-sm`}
                style={{ animation: 'fadeInBounce 0.6s ease-out' }}
              >
                <div className="text-center">
                  <div className={`inline-block p-6 rounded-2xl mb-6 ${
                    isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <Users className={`w-16 h-16 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                  </div>
                  <h3 
                    className={`text-3xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Join as Farmer
                  </h3>
                  <p 
                    className={`text-lg ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Access financial services, resources, and support for your livestock farming business
                  </p>
                </div>
              </div>

              {/* Investor Card */}
              <div
                onClick={() => selectMemberType('investor')}
                className={`group relative cursor-pointer p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:border-teal-500/50' 
                    : 'bg-white/70 border-gray-200 hover:border-teal-400/50'
                } backdrop-blur-sm`}
                style={{ animation: 'fadeInBounce 0.6s ease-out 0.1s backwards' }}
              >
                <div className="text-center">
                  <div className={`inline-block p-6 rounded-2xl mb-6 ${
                    isDark ? 'bg-teal-500/10' : 'bg-teal-50'
                  }`}>
                    <TrendingUp className={`w-16 h-16 ${
                      isDark ? 'text-teal-400' : 'text-teal-600'
                    }`} />
                  </div>
                  <h3 
                    className={`text-3xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Join as Investor
                  </h3>
                  <p 
                    className={`text-lg ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Make impact investments in sustainable agriculture and support farmer communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {step === 'form' && (
          <div className="max-w-3xl mx-auto">
            <div 
              className={`p-8 rounded-3xl border ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/70 border-gray-200'
              } backdrop-blur-sm`}
              style={{ animation: 'fadeInBounce 0.6s ease-out' }}
            >
              {/* Registration Type Toggle */}
              <div className="mb-8">
                <label className={`block text-sm font-semibold mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Registration Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setRegistrationType('individual')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      registrationType === 'individual'
                        ? isDark 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-emerald-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <UserPlus className="w-5 h-5 inline mr-2" />
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegistrationType('group')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      registrationType === 'group'
                        ? isDark 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-emerald-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Building2 className="w-5 h-5 inline mr-2" />
                    Group
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Group Information (if group type) */}
                {registrationType === 'group' && (
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-700/30' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Group Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Group Name *
                        </label>
                        <input
                          type="text"
                          name="groupName"
                          value={formData.groupName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Number of Members *
                        </label>
                        <input
                          type="number"
                          name="numberOfMembers"
                          min="2"
                          value={formData.numberOfMembers}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Group Leader Name *
                        </label>
                        <input
                          type="text"
                          name="groupLeaderName"
                          value={formData.groupLeaderName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Group Leader Phone *
                        </label>
                        <input
                          type="tel"
                          name="groupLeaderPhone"
                          placeholder="+254..."
                          value={formData.groupLeaderPhone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Nationality *
                      </label>
                      <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Select Nationality</option>
                        {nationalityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* National ID Field (Conditional) */}
                    {formData.nationality === 'kenyan' && (
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          National ID *
                        </label>
                        <input
                          type="text"
                          name="nationalId"
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          placeholder="Enter your National ID"
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                    )}

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        County *
                      </label>
                      <select
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Select County</option>
                        {kenyaCounties.map(county => (
                          <option key={county} value={county}>{county}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Town (Optional)
                      </label>
                      <input
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+254..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Farmer Specific Fields */}
                {memberType === 'farmer' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Farming Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-3 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Livestock Type * (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {livestockTypes.map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleLivestockTypeChange(type)}
                              className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                formData.livestockType.includes(type)
                                  ? isDark 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-emerald-600 text-white'
                                  : isDark
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Number of Livestock *
                        </label>
                        <input
                          type="number"
                          name="numberOfLivestock"
                          min="1"
                          value={formData.numberOfLivestock}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Investor Specific Fields */}
                {memberType === 'investor' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Investment Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Investment Type *
                        </label>
                        <select
                          name="investmentType"
                          value={formData.investmentType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <option value="">Select Investment Type</option>
                          {investmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Reason for Investing *
                        </label>
                        <textarea
                          name="reasonForInvesting"
                          value={formData.reasonForInvesting}
                          onChange={handleInputChange}
                          rows="4"
                          placeholder="Tell us why you want to invest in agricultural communities..."
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white focus:border-emerald-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 ${
                    isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                  }`}>
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <p className={`text-sm font-medium ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {error}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                      isDark 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-700 disabled:text-gray-500' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300 disabled:text-gray-500'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px);
          }
          80% {
            transform: translateY(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Members;