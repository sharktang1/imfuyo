import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { db } from '../../Libs/firebase-config.mjs';
import { collection, getDocs } from 'firebase/firestore';

const Livestock = ({ isDark, addToCart }) => {
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [livestockFilter, setLivestockFilter] = useState('all');
  const [livestock, setLivestock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use ref to prevent double fetching
  const hasFetched = useRef(false);

  // Fetch livestock data from Firestore
  const fetchLivestockData = async () => {
    // Prevent double fetching
    if (hasFetched.current) {
      console.log('🔄 Livestock fetch already in progress or completed, skipping...');
      return;
    }
    
    hasFetched.current = true;
    
    try {
      console.log('🚀 Fetching livestock from Firestore...');
      setIsLoading(true);
      
      const livestockRef = collection(db, 'shop', 'categories', 'livestock');
      const livestockSnapshot = await getDocs(livestockRef);
      
      console.log(`✅ Found ${livestockSnapshot.size} livestock items`);
      
      let livestockData = [];

      if (!livestockSnapshot.empty) {
        livestockData = livestockSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`📄 Livestock document ${doc.id}:`, data);
          return { 
            id: doc.id, 
            ...data,
            // Ensure specifications object exists with default values
            specifications: data.specifications || {}
          };
        });
      } else {
        console.warn('⚠️ No livestock found in Firestore');
      }

      setLivestock(livestockData);
      
    } catch (error) {
      console.error('❌ Error fetching livestock:', error.message);
      console.error('🔍 Error details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    // Only fetch if we haven't already and if livestock array is empty
    if (!hasFetched.current && livestock.length === 0) {
      fetchLivestockData();
    }
    
    // Cleanup function to reset the flag when component unmounts
    return () => {
      hasFetched.current = false;
    };
  }, [livestock.length]);

  const filteredLivestock = livestockFilter === 'all'
    ? livestock
    : livestock.filter(l => l.category === livestockFilter);

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(livestock.map(item => item.category).filter(Boolean))];

  const nextImage = () => {
    if (selectedLivestock) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedLivestock.images.length);
    }
  };

  const prevImage = () => {
    if (selectedLivestock) {
      setCurrentImageIndex((prev) => prev === 0 ? selectedLivestock.images.length - 1 : prev - 1);
    }
  };

  const LivestockModal = () => {
    if (!selectedLivestock) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
          <div className={`sticky top-0 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border-b p-6 flex justify-between items-center z-10`}>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedLivestock.name}
            </h3>
            <button
              onClick={() => {
                setSelectedLivestock(null);
                setCurrentImageIndex(0);
              }}
              className={`p-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-colors`}
            >
              <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className={`relative rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'} aspect-square`}>
                  <img
                    src={selectedLivestock.images?.[currentImageIndex] || 'https://via.placeholder.com/400'}
                    alt={selectedLivestock.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedLivestock.images?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} p-3 rounded-full shadow-lg transition-colors`}
                      >
                        <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                      </button>
                      <button
                        onClick={nextImage}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} p-3 rounded-full shadow-lg transition-colors`}
                      >
                        <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                      </button>
                    </>
                  )}
                </div>
                
                {selectedLivestock.images?.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {selectedLivestock.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex 
                            ? 'border-green-500 scale-105' 
                            : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex-1">
                  <div className="flex gap-2 mb-4">
                    {selectedLivestock.type && (
                      <span className={`px-3 py-1 ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-700'} text-xs font-semibold rounded-full capitalize`}>
                        {selectedLivestock.type}
                      </span>
                    )}
                    {selectedLivestock.category && (
                      <span className={`px-3 py-1 ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'} text-xs font-semibold rounded-full capitalize`}>
                        {selectedLivestock.category}
                      </span>
                    )}
                  </div>

                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                    {selectedLivestock.description}
                  </p>

                  {selectedLivestock.specifications && Object.keys(selectedLivestock.specifications).length > 0 && (
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6 mb-6`}>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                        Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedLivestock.specifications).map(([key, value]) => (
                          <div key={key}>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1 capitalize`}>
                              {key}
                            </p>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <div className={`flex items-center justify-between py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Price</span>
                      <span className="text-2xl font-bold text-green-500">
                        KSh {selectedLivestock.price?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between py-3 border-t border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Available</span>
                      <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                        {selectedLivestock.stock || 0} in stock
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedLivestock);
                    setSelectedLivestock(null);
                    setCurrentImageIndex(0);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading livestock...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setLivestockFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              livestockFilter === category
                ? 'bg-green-500 text-white shadow-lg'
                : isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Livestock' : 
             category === 'ruminants' ? 'Goats & Sheep' : 
             category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLivestock.length > 0 ? (
          filteredLivestock.map((animal) => (
            <div
              key={animal.id}
              className={`group ${isDark ? 'bg-gray-900 border-gray-800 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'} rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer relative`}
              onClick={() => setSelectedLivestock(animal)}
            >
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Eye className="w-3 h-3" />
                View Details
              </div>

              <div className="h-64 overflow-hidden relative">
                <img
                  src={animal.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={animal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {animal.type && (
                    <span className={`px-3 py-1 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm text-xs font-semibold rounded-full capitalize`}>
                      {animal.type}
                    </span>
                  )}
                  <span className={`px-3 py-1 ${isDark ? 'bg-gray-900/90 text-green-400' : 'bg-green-50/90 text-green-700'} backdrop-blur-sm text-xs font-semibold rounded-full`}>
                    {animal.stock || 0} available
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {animal.name}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                  {animal.description}
                </p>

                {animal.specifications && (
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-3 mb-4`}>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {animal.specifications.breed && (
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Breed</p>
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                            {animal.specifications.breed}
                          </p>
                        </div>
                      )}
                      {animal.specifications.age && (
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Age</p>
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                            {animal.specifications.age}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-500">
                      KSh {animal.price?.toLocaleString() || '0'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      per animal
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(animal);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {livestock.length === 0 
                ? 'No livestock found in the database.' 
                : `No ${livestockFilter === 'all' ? 'livestock' : livestockFilter} found.`}
            </p>
          </div>
        )}
      </div>

      <LivestockModal />
    </div>
  );
};

export default Livestock;