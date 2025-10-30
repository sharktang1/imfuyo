import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Facebook, Linkedin, Instagram, Phone, Mail, Send, MapPin, X, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../../Libs/firebase-config.mjs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact({ isDark }) {
  const [inView, setInView] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const socialLinks = [
    { 
      icon: Facebook, 
      label: 'Facebook', 
      href: 'https://facebook.com/imfuyo',
      color: '#1877F2'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/company/imfuyo',
      color: '#0A66C2'
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: 'https://instagram.com/imfuyo',
      color: '#E4405F'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 700 000 000',
      href: 'tel:+254700000000'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@imfuyo.com',
      href: 'mailto:info@imfuyo.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya',
      href: '#'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Add message to Firestore
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'unread' // You can use this to track read/unread messages
      });

      // Show success message
      setSubmitStatus('success');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={contactRef}
      className={`relative w-full min-h-screen flex flex-col transition-colors duration-700 overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]'
      }`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-green-600' : 'bg-green-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-300'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-teal-600' : 'bg-teal-300'
        }`}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex-1 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto flex items-center py-20">
        {/* Unified Card Container */}
        <div className={`w-full transform transition-all duration-1000 delay-200 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div 
            className={`relative rounded-3xl backdrop-blur-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white/70 border border-white/50'
            } shadow-2xl overflow-hidden`}
          >
            {/* Gradient Overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#40916c]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Side - Contact Information */}
              <div className="p-8 lg:p-10 flex flex-col justify-center relative z-30">
                <div className="space-y-6">
                  {/* Contact Info Items */}
                  <div className="space-y-3">
                    {contactInfo.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                          isDark 
                            ? 'hover:bg-white/10' 
                            : 'hover:bg-white/80'
                        }`}
                      >
                        <div className={`p-3 rounded-lg transition-all duration-300 ${
                          isDark 
                            ? 'bg-[#40916c]/20 group-hover:bg-[#40916c]/30' 
                            : 'bg-[#40916c]/10 group-hover:bg-[#40916c]/20'
                        }`}>
                          <item.icon className="w-5 h-5 text-[#40916c]" strokeWidth={2} />
                        </div>
                        <div>
                          <p 
                            className={`text-xs font-medium ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {item.label}
                          </p>
                          <p 
                            className={`text-base font-semibold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className={`h-px ${
                    isDark ? 'bg-white/10' : 'bg-gray-300/50'
                  }`}></div>

                  {/* Social Media Links */}
                  <div>
                    <p 
                      className={`text-sm font-medium mb-3 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Follow us on social media
                    </p>
                    <div className="flex items-center space-x-3">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setHoveredSocial(index)}
                          onMouseLeave={() => setHoveredSocial(null)}
                          style={{
                            transform: hoveredSocial === index ? 'scale(1.15) translateY(-6px)' : 'scale(1)',
                            backgroundColor: hoveredSocial === index ? social.color : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'),
                            color: hoveredSocial === index ? 'white' : (isDark ? '#d1d5db' : '#374151'),
                            padding: '12px',
                            borderRadius: '12px',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            boxShadow: hoveredSocial === index ? `0 12px 24px ${social.color}40` : '0 4px 6px rgba(0,0,0,0.1)'
                          }}
                        >
                          <social.icon className="w-5 h-5" strokeWidth={2} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => setShowContactForm(true)}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: buttonHovered ? '#2d6a4f' : 'linear-gradient(to right, #40916c, #2d6a4f)',
                      color: 'white',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: "'Outfit', sans-serif",
                      marginTop: '24px',
                      border: 'none',
                      cursor: 'pointer',
                      transform: buttonHovered ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: buttonHovered ? '0 20px 25px rgba(0,0,0,0.3)' : '0 10px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    type="button"
                  >
                    <span>Send us a Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Side - Lottie Animation */}
              <div className={`relative p-8 lg:p-10 flex items-center justify-center ${
                isDark ? 'bg-white/5' : 'bg-gradient-to-br from-[#40916c]/5 to-transparent'
              }`}>
                <div className="relative w-full">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-30 ${
                    isDark ? 'bg-green-600' : 'bg-green-400'
                  }`}></div>
                  
                  {/* Lottie Animation */}
                  <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center">
                    <DotLottieReact
                      src="https://lottie.host/5c202015-939f-4df6-a4da-ab8a7ac399b1/MMbxyCEv4R.lottie"
                      loop
                      autoplay
                      className="w-full h-full"
                    />
                  </div>

                  {/* Floating Elements */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-40 animate-pulse ${
                    isDark ? 'bg-emerald-600' : 'bg-emerald-400'
                  }`}></div>
                  <div className={`absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-xl opacity-40 animate-pulse ${
                    isDark ? 'bg-teal-600' : 'bg-teal-400'
                  }`} style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => !isSubmitting && setShowContactForm(false)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className={`relative w-full max-w-2xl rounded-3xl p-8 shadow-2xl ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={() => !isSubmitting && setShowContactForm(false)}
              disabled={isSubmitting}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success/Error Message */}
            {submitStatus && (
              <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
                submitStatus === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Failed to send message. Please try again.
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Form Header */}
            <div className="mb-6">
              <h3 
                className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Send us a Message
              </h3>
              <p 
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Fill out the form below and we'll get back to you soon
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#40916c] focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="John Doe"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              <div>
                <label 
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#40916c] focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="john@example.com"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              <div>
                <label 
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#40916c] focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="How can we help you?"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              <div>
                <label 
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#40916c] focus:border-transparent resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Tell us more about your inquiry..."
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: isSubmitting ? '#9ca3af' : 'linear-gradient(to right, #40916c, #2d6a4f)',
                  color: 'white',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: "'Outfit', sans-serif",
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}