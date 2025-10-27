import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Clock, Calendar, Tag, Loader, AlertCircle, BookOpen, TrendingUp, Newspaper, ArrowRight } from 'lucide-react';

const CommunityBlogs = ({ isDark, onBack }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract image from content
  const extractImage = (content, description) => {
    const text = content || description || '';
    const imgMatch = text.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
    return null;
  };

  // Categorize content based on keywords
  const categorizeContent = (title, content) => {
    const text = `${title} ${content}`.toLowerCase();
    
    if (text.match(/agri|farm|crop|soil|harvest|livestock/i)) return 'Agriculture';
    if (text.match(/data|analytic|ai|machine learning|algorithm/i)) return 'Data Analytics';
    if (text.match(/fintech|finance|payment|loan|credit|banking/i)) return 'Finance';
    if (text.match(/sustain|climate|environment|green|eco/i)) return 'Sustainability';
    if (text.match(/tech|digital|innovation|blockchain|iot/i)) return 'Technology';
    if (text.match(/business|market|trade|entrepreneur/i)) return 'Business';
    
    return 'General';
  };

  // Extract tags from content
  const extractTags = (title, content) => {
    const text = `${title} ${content}`.toLowerCase();
    const tags = [];
    
    const tagPatterns = {
      'Agriculture': /agri|farm|crop/i,
      'Technology': /tech|digital|innovation/i,
      'Data': /data|analytic|ai/i,
      'Finance': /fintech|finance|payment/i,
      'Sustainability': /sustain|climate|green/i,
      'IoT': /iot|sensor|device/i,
      'Blockchain': /blockchain|crypto/i,
      'AI': /\bai\b|artificial intelligence|machine learning/i
    };
    
    Object.entries(tagPatterns).forEach(([tag, pattern]) => {
      if (pattern.test(text)) tags.push(tag);
    });
    
    return tags.slice(0, 3);
  };

  // Estimate read time
  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  };

  // Fetch blogs from Medium
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const mediumResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bernardnjathi`
        );
        
        if (!mediumResponse.ok) {
          throw new Error('Failed to fetch articles');
        }

        const mediumData = await mediumResponse.json();
        
        if (mediumData.status !== 'ok' || !mediumData.items) {
          throw new Error('Invalid response from server');
        }

        const mediumBlogs = mediumData.items.map(item => ({
          id: `medium-${item.guid}`,
          title: item.title,
          excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
          content: item.content || item.description || '',
          category: categorizeContent(item.title, item.content || item.description || ''),
          source: 'Medium',
          sourceUrl: item.link,
          readTime: estimateReadTime(item.content || item.description || ''),
          date: new Date(item.pubDate).toISOString().split('T')[0],
          tags: extractTags(item.title, item.content || item.description || ''),
          author: item.author || 'Bernard Njathi',
          image: extractImage(item.content, item.description)
        }));

        mediumBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        setBlogs(mediumBlogs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Unable to load articles at the moment. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const featuredPost = blogs[0];
  const recentPosts = blogs.slice(1);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`} style={{ overflowY: 'auto', height: '100vh', paddingTop: '80px' }}>
      
      {/* Fixed Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 border-b-4 transition-colors duration-300 ${
        isDark ? 'bg-gray-900/95 border-green-500' : 'bg-white/95 border-green-600'
      }`} style={{ backdropFilter: 'blur(12px)', marginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-1">
                <Newspaper className={`w-7 h-7 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <h1 
                  className={`text-3xl md:text-4xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Imfuyo Times
                </h1>
              </div>
              <p 
                className={`text-xs italic ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                AgriTech Insights & Innovation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ marginTop: '180px' }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className={`w-12 h-12 animate-spin mb-4 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`} />
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`} 
               style={{ fontFamily: "'Outfit', sans-serif" }}>
              Loading latest articles...
            </p>
          </div>
        ) : error ? (
          <div className={`flex flex-col items-center justify-center py-20 px-4 rounded-2xl ${
            isDark ? 'bg-red-500/10' : 'bg-red-50'
          }`}>
            <AlertCircle className={`w-12 h-12 mb-4 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`} />
            <p className={`text-lg text-center ${isDark ? 'text-red-400' : 'text-red-600'}`} 
               style={{ fontFamily: "'Outfit', sans-serif" }}>
              {error}
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen className={`w-12 h-12 mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`} 
               style={{ fontFamily: "'Outfit', sans-serif" }}>
              No articles available at the moment
            </p>
          </div>
        ) : (
          <>
            {/* Featured Article - Hero Section */}
            {featuredPost && (
              <div className="mb-16">
                <div className="flex items-center space-x-2 mb-6">
                  <div className={`h-1 w-12 ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></div>
                  <h2 
                    className={`text-sm font-bold uppercase tracking-widest ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Featured Story
                  </h2>
                </div>
                
                <article className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                  isDark 
                    ? 'bg-gray-800' 
                    : 'bg-white shadow-lg'
                }`}>
                  {/* Image Section */}
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                    {featuredPost.image ? (
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
                        <BookOpen className="w-32 h-32 text-white opacity-40" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark 
                        ? 'from-gray-900 via-gray-900/60 to-transparent' 
                        : 'from-black/80 via-black/40 to-transparent'
                    }`}></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg">
                          {featuredPost.category}
                        </span>
                        <div className="flex items-center space-x-2 text-white/80 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span style={{ fontFamily: "'Outfit', sans-serif" }}>{formatDate(featuredPost.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/80 text-sm">
                          <Clock className="w-4 h-4" />
                          <span style={{ fontFamily: "'Outfit', sans-serif" }}>{featuredPost.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" 
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                        {featuredPost.title}
                      </h3>

                      <p className="text-lg text-white/90 mb-6 leading-relaxed max-w-3xl" 
                         style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {featuredPost.excerpt}
                      </p>

                      <a
                        href={featuredPost.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105 shadow-xl"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Recent Articles Grid */}
            {recentPosts.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-8">
                  <div className={`h-1 w-12 ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></div>
                  <h2 
                    className={`text-sm font-bold uppercase tracking-widest ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Latest Articles
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        isDark 
                          ? 'bg-gray-800' 
                          : 'bg-white shadow-md'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        {post.image ? (
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                            <BookOpen className="w-16 h-16 text-white opacity-50" />
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`flex items-center space-x-1.5 text-xs ${
                            isDark ? 'text-gray-500' : 'text-gray-500'
                          }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <span className={`text-gray-400`}>•</span>
                          <div className={`flex items-center space-x-1.5 text-xs ${
                            isDark ? 'text-gray-500' : 'text-gray-500'
                          }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className={`text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`} style={{ fontFamily: "'Playfair Display', serif" }}>
                          {post.title}
                        </h3>

                        <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                              >
                                <Tag className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        <a
                          href={post.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 text-sm font-bold transition-all group-hover:translate-x-1 ${
                            isDark 
                              ? 'text-green-400 hover:text-green-300' 
                              : 'text-green-600 hover:text-green-700'
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CommunityBlogs;