import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, MessageCircle, Bot, User, RefreshCw, ChevronDown, X, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../Libs/firebase-config.mjs';

const AIConsulting = ({ isDark, onBack, onNavigate }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [aiContext, setAiContext] = useState(null);
  const [loadingContext, setLoadingContext] = useState(true);
  
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY
  });

  // Fetch AI Context from Firestore
  const fetchAIContext = async () => {
    setLoadingContext(true);
    try {
      // Fetch general context
      const generalDoc = await getDoc(doc(db, 'AIContext', 'general'));
      const generalData = generalDoc.exists() ? generalDoc.data() : { content: '' };

      // Fetch social URLs
      const socialUrlsRef = collection(db, 'AIContext', 'general', 'socialUrls');
      const socialUrlsSnapshot = await getDocs(socialUrlsRef);
      const socialUrls = socialUrlsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch FAQs
      const faqsRef = collection(db, 'AIContext', 'general', 'faqs');
      const faqsSnapshot = await getDocs(faqsRef);
      const faqs = faqsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch special contexts
      const specialContextsRef = collection(db, 'specialContexts');
      const specialContextsSnapshot = await getDocs(specialContextsRef);
      const specialContexts = specialContextsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAiContext({
        general: generalData.content || '',
        socialUrls,
        faqs,
        specialContexts
      });

    } catch (error) {
      console.error('Error fetching AI context:', error);
      // Fallback to empty context
      setAiContext({
        general: '',
        socialUrls: [],
        faqs: [],
        specialContexts: []
      });
    } finally {
      setLoadingContext(false);
    }
  };

  useEffect(() => {
    fetchAIContext();
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 100);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && !loadingContext) {
      setMessages([{
        role: 'assistant',
        content: `Hello! 👋 I'm Imfuyo's AI assistant. I'm here to help you learn about our agricultural financing and insurance services.\n\nFeel free to ask me anything about:\n• Loan products and requirements\n• Livestock insurance coverage\n• Application processes\n• Eligibility criteria\n• Or click the FAQs button to explore common questions!`,
        timestamp: new Date()
      }]);
    }
  }, [loadingContext]);

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  // Build prompt with data from Firestore
  const buildPrompt = (userQuestion) => {
    if (!aiContext) {
      return `I'm currently unable to access company information. Please try again in a moment.`;
    }

    const conversationHistory = messages
      .slice(-6)
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Build social URLs context
    const socialUrlsContext = aiContext.socialUrls.length > 0 
      ? `SOCIAL MEDIA & WEBSITES:\n${aiContext.socialUrls.map(url => `• ${url.platform}: ${url.url}`).join('\n')}`
      : 'No social media links available.';

    // Build FAQs context
    const faqsContext = aiContext.faqs.length > 0
      ? `FREQUENTLY ASKED QUESTIONS:\n${aiContext.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}`
      : 'No FAQs available.';

    // Build special contexts
    const specialContextsText = aiContext.specialContexts.length > 0
      ? `ADDITIONAL INFORMATION:\n${aiContext.specialContexts.map(context => `## ${context.title}\n${context.content}`).join('\n\n')}`
      : 'No additional information available.';

    return `You are a helpful and friendly AI assistant for Imfuyo Usajili, an agricultural fintech company in Kenya. Your personality should be:
- Warm, approachable, and conversational
- Professional but not overly formal
- Encouraging and supportive of farmers
- Patient and thorough in explanations
- Use occasional emojis to be friendly (but not excessive)

IMPORTANT RULES:
1. ONLY answer questions related to Imfuyo Usajili services, products, and operations
2. If a question is NOT related to Imfuyo/agriculture/fintech, politely redirect with a friendly tone
3. Use ONLY the information provided in the context below. Do not make up information.
4. If you don't have specific information from the context, be honest and suggest:
   "I don't have that specific information in my knowledge base. For the most accurate and up-to-date details, I'd recommend contacting our support team at +254 700 000 000 or info@imfuyo.com. They'll be happy to help! 😊"
5. When referencing social media or websites, mention the platform and make the URL clickable in your response
6. Use the conversation history to provide contextual responses
7. Break down complex information into digestible points
8. Ask follow-up questions when appropriate to better assist
9. Format responses with:
   - Clear paragraphs for readability
   - Bullet points for lists
   - Bold key terms (using **text**)
   - Line breaks for better structure

COMPANY INFORMATION:
${aiContext.general}

${socialUrlsContext}

${faqsContext}

${specialContextsText}

CONVERSATION HISTORY:
${conversationHistory}

USER QUESTION: ${userQuestion}

Provide a helpful, conversational response based ONLY on the information above:`;
  };

  // Generate AI response
  const generateResponse = async (userQuestion) => {
    if (!aiContext) {
      return "I'm currently setting up my knowledge base. Please try again in a moment.";
    }

    try {
      const result = await genAI.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: buildPrompt(userQuestion)
      });
      
      return result.text || "I apologize, but I couldn't generate a response. Please try again or contact our support team.";
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble connecting right now. 😔 Please try again in a moment, or reach out to our support team at +254 700 000 000 or info@imfuyo.com for immediate assistance.";
    }
  };

  // Handle sending a message - NO STREAMING
  const handleSendMessage = async (message = inputValue.trim()) => {
    if (!message || isLoading || loadingContext) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setConversationStarted(true);

    // Generate AI response
    const aiResponse = await generateResponse(message);
    
    // Add AI response directly - NO STREAMING
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  // Handle FAQ selection
  const handleFAQClick = (question) => {
    setShowFAQModal(false);
    handleSendMessage(question);
  };

  // Reset conversation
  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: `Hello! 👋 I'm Imfuyo's AI assistant. I'm here to help you learn about our agricultural financing and insurance services.\n\nFeel free to ask me anything about:\n• Loan products and requirements\n• Livestock insurance coverage\n• Application processes\n• Eligibility criteria\n• Or click the FAQs button to explore common questions!`,
      timestamp: new Date()
    }]);
    setConversationStarted(false);
    setInputValue('');
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message content with markdown-like styling and external links
  const formatMessageContent = (content) => {
    if (!content) return '';
    
    // Convert URLs to clickable links
    let formatted = content.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-emerald-500 hover:text-emerald-400 underline inline-flex items-center space-x-1">$1<ExternalLink class="w-3 h-3 ml-1" /></a>'
    );
    
    // Convert **bold** to actual bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    
    // Convert bullet points
    formatted = formatted.replace(/^• /gm, '• ');
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br />');
    
    return formatted;
  };

  // Loading component
  if (loadingContext) {
    return (
      <div className={`min-h-screen transition-colors duration-700 flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
      }`}>
        <div className="text-center">
          <div className="relative">
            <Bot className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-full animate-pulse"></div>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Getting Ready for Your Questions
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Preparing AI assistant...
          </p>
          <div className="flex justify-center space-x-1">
            <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 flex flex-col ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-[#fafaf9] via-[#f8f9fa] to-[#f0fdf4]'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-32 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-300'
        }`} style={{ animation: 'float 8s ease-in-out infinite' }}></div>
        <div className={`absolute bottom-0 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          isDark ? 'bg-green-600' : 'bg-green-300'
        }`} style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-2s' }}></div>
        <div className={`absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-teal-600' : 'bg-teal-300'
        }`} style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '-4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className={`sticky top-0 z-20 backdrop-blur-xl ${
          isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-white/60'
        } border-b shadow-lg`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${
                    isDark ? 'bg-emerald-600/20' : 'bg-emerald-100'
                  }`}>
                    <Bot className={`w-7 h-7 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div>
                    <h1 
                      className={`text-xl sm:text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      AI Consultation
                    </h1>
                    <p 
                      className={`text-xs sm:text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Ask me anything about Imfuyo
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {conversationStarted && (
                  <button
                    onClick={handleReset}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area - Takes remaining space */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          <div className="flex-1 mb-6 overflow-hidden relative">
            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="h-full overflow-y-auto scroll-smooth custom-scrollbar"
              style={{ maxHeight: 'calc(100vh - 280px)' }}
            >
              <div className="space-y-6 pb-4 px-2">
                <div ref={messagesStartRef} />
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 animate-fadeIn ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-emerald-600 to-emerald-700'
                        : isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                      <div
                        className={`rounded-2xl px-5 py-4 shadow-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white'
                            : isDark 
                              ? 'bg-gray-800/80 text-gray-100 border border-gray-700/50 backdrop-blur-sm' 
                              : 'bg-white/80 text-gray-900 border border-gray-200/50 backdrop-blur-sm'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <div 
                          className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed message-content"
                          dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex items-start space-x-3 animate-fadeIn">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                      isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <Bot className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div className={`rounded-2xl px-5 py-4 shadow-md ${
                      isDark ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} style={{ animationDelay: '0.1s' }}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none animate-bounce">
                <div className={`p-2 rounded-full backdrop-blur-md shadow-lg ${
                  isDark ? 'bg-gray-800/80' : 'bg-white/80'
                }`}>
                  <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className={`rounded-3xl p-4 backdrop-blur-xl shadow-2xl border-2 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/95 border-gray-700/50' 
              : 'bg-white/95 border-gray-200/50'
          } ${inputValue.trim() ? 'border-emerald-500/50' : ''}`}>
            <div className="flex items-end space-x-3">
              {/* FAQs Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setShowFAQModal(true)}
                  disabled={isLoading}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-md ${
                    isLoading
                      ? 'opacity-50 cursor-not-allowed bg-gray-500'
                      : isDark 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  title="View FAQs"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Input Field */}
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Imfuyo..."
                  rows={1}
                  className={`w-full px-5 py-3.5 rounded-2xl resize-none focus:outline-none transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-700/80 text-white placeholder-gray-400 focus:bg-gray-700' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white'
                  }`}
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    maxHeight: '120px',
                    minHeight: '48px'
                  }}
                  disabled={isLoading}
                />
              </div>

              {/* Send Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    inputValue.trim() && !isLoading
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white hover:scale-110 shadow-lg hover:shadow-emerald-500/50'
                      : isDark
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Helper Text */}
            <p 
              className={`text-xs text-center mt-3 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Press Enter to send • Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      {showFAQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 backdrop-blur-md ${
              isDark ? 'bg-gray-900/80' : 'bg-gray-900/40'
            }`}
            onClick={() => setShowFAQModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl border-2 animate-slideIn ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 backdrop-blur-xl px-6 py-5 border-b ${
              isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${
                    isDark ? 'bg-emerald-600/20' : 'bg-emerald-100'
                  }`}>
                    <Sparkles className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <h2 
                      className={`text-xl sm:text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <p 
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Select a question to get started
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFAQModal(false)}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* FAQ Grid */}
            <div className="p-6">
              {aiContext?.faqs.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    No FAQs available yet. Please check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiContext?.faqs.map((faq, index) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFAQClick(faq.question)}
                      disabled={isLoading}
                      className={`group text-left p-5 rounded-2xl transition-all duration-300 hover:scale-102 hover:-translate-y-1 ${
                        isDark 
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-200 border border-gray-600/50 hover:border-emerald-600/50' 
                          : 'bg-gray-50 hover:bg-white text-gray-900 border border-gray-200 hover:border-emerald-500/50 shadow-sm hover:shadow-lg'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      <div className="flex items-start space-x-3">
                        <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform group-hover:rotate-12 ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span className="text-sm sm:text-base font-medium leading-relaxed">{faq.question}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(20px) translateX(-15px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Improved Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(243, 244, 246, 0.3)'};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.6)'};
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.8)'};
        }

        /* Message formatting */
        .message-content strong {
          font-weight: 600;
          color: ${isDark ? 'rgb(16, 185, 129)' : 'rgb(5, 150, 105)'};
        }

        /* External link styling */
        .message-content a {
          transition: color 0.2s ease;
          word-break: break-all;
        }

        .message-content a:hover {
          color: ${isDark ? 'rgb(110, 231, 183)' : 'rgb(16, 185, 129)'};
        }
      `}</style>
    </div>
  );
};

export default AIConsulting;