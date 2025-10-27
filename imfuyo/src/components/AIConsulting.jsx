import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, MessageCircle, Bot, User, RefreshCw, ChevronDown, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { IMFUYO_CONTEXT, FAQ_QUESTIONS } from './context';

const AIConsulting = ({ isDark, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top of messages
  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isStreaming || (messages.length > 1 && messages[messages.length - 1].role === 'assistant')) {
      scrollToBottom();
    }
  }, [messages, streamingText, isStreaming]);

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 50);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Initialize with welcome message and scroll to top
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hello! 👋 I'm Imfuyo's AI assistant. I'm here to help you learn about our agricultural financing and insurance services.\n\nFeel free to ask me anything about:\n• Loan products and requirements\n• Livestock insurance coverage\n• Application processes\n• Eligibility criteria\n• Or click the FAQs button to explore common questions!",
        timestamp: new Date()
      }]);
      
      // Ensure we scroll to top after a brief delay to let the message render
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  }, []);

  // Simulate streaming effect
  const streamResponse = async (fullText) => {
    setIsStreaming(true);
    setStreamingText('');
    
    const words = fullText.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      setStreamingText(currentText);
      
      // Random delay between 30-80ms for more natural feel
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 30));
    }
    
    setIsStreaming(false);
    return fullText;
  };

  // Build prompt with enhanced personality
  const buildPrompt = (userQuestion) => {
    const conversationHistory = messages
      .slice(-6) // Keep last 6 messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    return `You are a helpful and friendly AI assistant for Imfuyo Usajili, an agricultural fintech company in Kenya. Your personality should be:
- Warm, approachable, and conversational
- Professional but not overly formal
- Encouraging and supportive of farmers
- Patient and thorough in explanations
- Use occasional emojis to be friendly (but not excessive)

IMPORTANT RULES:
1. ONLY answer questions related to Imfuyo Usajili services, products, and operations
2. If a question is NOT related to Imfuyo/agriculture/fintech, politely redirect with a friendly tone
3. If you don't have specific information from the context, be honest and suggest:
   "I don't have that specific information in my knowledge base. For the most accurate and up-to-date details, I'd recommend contacting our support team at +254 700 000 000 or info@imfuyo.com. They'll be happy to help! 😊"
4. Use the conversation history to provide contextual responses
5. Break down complex information into digestible points
6. Ask follow-up questions when appropriate to better assist
7. Format responses with:
   - Clear paragraphs for readability
   - Bullet points for lists
   - Bold key terms (using **text**)
   - Line breaks for better structure

COMPANY INFORMATION:
${IMFUYO_CONTEXT}

CONVERSATION HISTORY:
${conversationHistory}

USER QUESTION: ${userQuestion}

Provide a helpful, conversational response:`;
  };

  // Generate AI response
  const generateResponse = async (userQuestion) => {
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

  // Handle sending a message
  const handleSendMessage = async (message = inputValue.trim()) => {
    if (!message || isLoading) return;

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
    
    // Stream the response
    const streamedResponse = await streamResponse(aiResponse);
    
    const assistantMessage = {
      role: 'assistant',
      content: streamedResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setStreamingText('');
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
      content: "Hello! 👋 I'm Imfuyo's AI assistant. I'm here to help you learn about our agricultural financing and insurance services.\n\nFeel free to ask me anything about:\n• Loan products and requirements\n• Livestock insurance coverage\n• Application processes\n• Eligibility criteria\n• Or click the FAQs button to explore common questions!",
      timestamp: new Date()
    }]);
    setConversationStarted(false);
    setInputValue('');
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message content with markdown-like styling
  const formatMessageContent = (content) => {
    // Convert **bold** to actual bold
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    formatted = formatted.replace(/^• /gm, '• ');
    
    return formatted;
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
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
      <div className="relative z-10 min-h-screen flex flex-col">
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

        {/* Chat Area */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          <div className="flex-1 mb-6 overflow-hidden relative">
            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="h-full overflow-y-auto pr-2 scroll-smooth"
              style={{ maxHeight: 'calc(100vh - 280px)' }}
            >
              <div className="space-y-6 pb-4">
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
                          className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Streaming Message */}
                {isStreaming && (
                  <div className="flex items-start space-x-3 animate-fadeIn">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                      isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <Bot className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div className="flex-1 max-w-2xl">
                      <div
                        className={`rounded-2xl px-5 py-4 shadow-md ${
                          isDark 
                            ? 'bg-gray-800/80 text-gray-100 border border-gray-700/50 backdrop-blur-sm' 
                            : 'bg-white/80 text-gray-900 border border-gray-200/50 backdrop-blur-sm'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <div 
                          className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMessageContent(streamingText) }}
                        />
                        <span className="inline-block w-1 h-4 bg-emerald-500 ml-1 animate-blink"></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoading && !isStreaming && (
                  <div className="flex items-start space-x-3 animate-fadeIn">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                      isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <Bot className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div className={`rounded-2xl px-5 py-4 shadow-md ${
                      isDark ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'
                    }`}>
                      <div className="flex space-x-2">
                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                          isDark ? 'bg-emerald-500' : 'bg-emerald-600'
                        }`}></div>
                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                          isDark ? 'bg-emerald-500' : 'bg-emerald-600'
                        }`} style={{ animationDelay: '0.1s' }}></div>
                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                          isDark ? 'bg-emerald-500' : 'bg-emerald-600'
                        }`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && messages.length > 3 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none animate-bounce">
                <div className={`p-2 rounded-full backdrop-blur-md shadow-lg ${
                  isDark ? 'bg-gray-800/80' : 'bg-white/80'
                }`}>
                  <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Island Style */}
          <div className={`sticky bottom-4 rounded-3xl p-4 backdrop-blur-xl shadow-2xl border-2 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/95 border-gray-700/50' 
              : 'bg-white/95 border-gray-200/50'
          } ${inputValue.trim() ? 'border-emerald-500/50' : ''}`}>
            <div className="flex items-end space-x-3">
              {/* FAQs Button - Bottom Left */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setShowFAQModal(true)}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-md ${
                    isDark 
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FAQ_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(question)}
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
                      <span className="text-sm sm:text-base font-medium leading-relaxed">{question}</span>
                    </div>
                  </button>
                ))}
              </div>
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

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(243, 244, 246, 0.3)'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.6)'};
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.8)'};
        }

        /* Smooth scroll */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Textarea auto-resize */
        textarea {
          transition: all 0.3s ease;
          overflow-y: auto;
        }

        textarea:focus {
          box-shadow: 0 0 0 3px ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.2)'};
        }

        /* Message formatting */
        strong {
          font-weight: 600;
          color: ${isDark ? 'rgb(16, 185, 129)' : 'rgb(5, 150, 105)'};
        }
      `}</style>
    </div>
  );
};

export default AIConsulting;