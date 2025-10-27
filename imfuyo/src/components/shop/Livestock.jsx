import React, { useState } from 'react';
import { ShoppingCart, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Livestock = ({ isDark, addToCart }) => {
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [livestockFilter, setLivestockFilter] = useState('all');

  const livestock = [
    // Dairy Cattle
    {
      id: 1,
      name: 'Holstein Friesian Heifer',
      type: 'dairy',
      category: 'cattle',
      price: 85000,
      description: 'High-yielding dairy heifer with excellent genetics. Average milk production of 25-30 liters per day. Vaccinated and dewormed.',
      images: [
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'
      ],
      specifications: {
        age: '18-24 months',
        weight: '350-400 kg',
        breed: 'Holstein Friesian',
        production: '25-30L/day'
      },
      stock: 12
    },
    {
      id: 2,
      name: 'Jersey Dairy Cow',
      type: 'dairy',
      category: 'cattle',
      price: 95000,
      description: 'Premium Jersey cow known for high butterfat content in milk. Ideal for small-scale and commercial dairy farms.',
      images: [
        'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800',
        'https://images.unsplash.com/photo-1546482490-67f318c28a36?w=800'
      ],
      specifications: {
        age: '2-3 years',
        weight: '400-450 kg',
        breed: 'Jersey',
        production: '20-25L/day'
      },
      stock: 8
    },
    {
      id: 3,
      name: 'Ayrshire Heifer',
      type: 'dairy',
      category: 'cattle',
      price: 78000,
      description: 'Hardy and adaptable Ayrshire heifer. Excellent forager with good milk production and disease resistance.',
      images: [
        'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800'
      ],
      specifications: {
        age: '18 months',
        weight: '320-360 kg',
        breed: 'Ayrshire',
        production: '20-24L/day'
      },
      stock: 10
    },
    // Meat Cattle
    {
      id: 4,
      name: 'Boran Bull',
      type: 'meat',
      category: 'cattle',
      price: 120000,
      description: 'Indigenous Boran bull, excellent for meat production and crossbreeding. Heat-tolerant and disease-resistant.',
      images: [
        'https://images.unsplash.com/photo-1587927729123-37c8f095c156?w=800'
      ],
      specifications: {
        age: '2-3 years',
        weight: '500-600 kg',
        breed: 'Boran',
        purpose: 'Meat/Breeding'
      },
      stock: 6
    },
    {
      id: 5,
      name: 'Angus Steer',
      type: 'meat',
      category: 'cattle',
      price: 95000,
      description: 'Premium Angus steer for high-quality beef production. Excellent meat marbling and fast weight gain.',
      images: [
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800'
      ],
      specifications: {
        age: '18 months',
        weight: '450-500 kg',
        breed: 'Angus',
        purpose: 'Meat Production'
      },
      stock: 5
    },
    // Goats
    {
      id: 6,
      name: 'Alpine Dairy Goat',
      type: 'dairy',
      category: 'ruminants',
      price: 25000,
      description: 'High-producing Alpine dairy goat. Excellent temperament and adaptability. Average 3-4 liters per day.',
      images: [
        'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800'
      ],
      specifications: {
        age: '12-18 months',
        weight: '55-65 kg',
        breed: 'Alpine',
        production: '3-4L/day'
      },
      stock: 25
    },
    {
      id: 7,
      name: 'Toggenburg Dairy Goat',
      type: 'dairy',
      category: 'ruminants',
      price: 22000,
      description: 'Hardy Toggenburg goat with consistent milk production. Ideal for various climatic conditions.',
      images: [
        'https://images.unsplash.com/photo-1594629705875-9770843c6414?w=800'
      ],
      specifications: {
        age: '1-2 years',
        weight: '50-60 kg',
        breed: 'Toggenburg',
        production: '2.5-3.5L/day'
      },
      stock: 20
    },
    {
      id: 8,
      name: 'Boer Goat',
      type: 'meat',
      category: 'ruminants',
      price: 18000,
      description: 'Premium Boer goat for meat production. Fast growth rate and excellent meat quality.',
      images: [
        'https://images.unsplash.com/photo-1546445317-68c89c7253dd?w=800'
      ],
      specifications: {
        age: '8-12 months',
        weight: '40-50 kg',
        breed: 'Boer',
        purpose: 'Meat Production'
      },
      stock: 30
    },
    // Sheep
    {
      id: 9,
      name: 'Dorper Sheep',
      type: 'meat',
      category: 'ruminants',
      price: 15000,
      description: 'Hardy Dorper sheep, excellent for meat production. No shearing required, adapts well to various climates.',
      images: [
        'https://images.unsplash.com/photo-1583237804408-170b8f6716d1?w=800'
      ],
      specifications: {
        age: '8-12 months',
        weight: '35-45 kg',
        breed: 'Dorper',
        purpose: 'Meat Production'
      },
      stock: 18
    },
    {
      id: 10,
      name: 'Merino Sheep',
      type: 'wool',
      category: 'ruminants',
      price: 20000,
      description: 'Premium Merino sheep for high-quality wool production. Also produces good meat.',
      images: [
        'https://images.unsplash.com/photo-1528864156655-09f5652c2a54?w=800'
      ],
      specifications: {
        age: '1-2 years',
        weight: '50-65 kg',
        breed: 'Merino',
        purpose: 'Wool/Meat'
      },
      stock: 12
    },
    // Pigs
    {
      id: 11,
      name: 'Large White Pig',
      type: 'breeding',
      category: 'pigs',
      price: 35000,
      description: 'Premium Large White breeding pig. Excellent mothering abilities and high litter size.',
      images: [
        'https://images.unsplash.com/photo-1530836176281-7b994726e189?w=800'
      ],
      specifications: {
        age: '8-12 months',
        weight: '100-120 kg',
        breed: 'Large White',
        purpose: 'Breeding'
      },
      stock: 8
    },
    {
      id: 12,
      name: 'Landrace Pig',
      type: 'breeding',
      category: 'pigs',
      price: 33000,
      description: 'Landrace pig known for excellent bacon production and breeding qualities.',
      images: [
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'
      ],
      specifications: {
        age: '8-10 months',
        weight: '90-110 kg',
        breed: 'Landrace',
        purpose: 'Breeding/Meat'
      },
      stock: 10
    },
    {
      id: 13,
      name: 'Duroc Feeder Pig',
      type: 'meat',
      category: 'pigs',
      price: 12000,
      description: 'Fast-growing Duroc pig for meat production. Excellent feed conversion ratio.',
      images: [
        'https://images.unsplash.com/photo-1598974357801-cbce8c6e42ea?w=800'
      ],
      specifications: {
        age: '3-4 months',
        weight: '30-40 kg',
        breed: 'Duroc',
        purpose: 'Meat Production'
      },
      stock: 15
    }
  ];

  const filteredLivestock = livestockFilter === 'all'
    ? livestock
    : livestock.filter(l => l.category === livestockFilter);

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
                    src={selectedLivestock.images[currentImageIndex]}
                    alt={selectedLivestock.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedLivestock.images.length > 1 && (
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
                
                {selectedLivestock.images.length > 1 && (
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
                    <span className={`px-3 py-1 ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-700'} text-xs font-semibold rounded-full capitalize`}>
                      {selectedLivestock.type}
                    </span>
                    <span className={`px-3 py-1 ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'} text-xs font-semibold rounded-full capitalize`}>
                      {selectedLivestock.category}
                    </span>
                  </div>

                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                    {selectedLivestock.description}
                  </p>

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

                  <div className="space-y-4 mb-6">
                    <div className={`flex items-center justify-between py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Price</span>
                      <span className="text-2xl font-bold text-green-500">
                        KSh {selectedLivestock.price.toLocaleString()}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between py-3 border-t border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Available</span>
                      <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                        {selectedLivestock.stock} in stock
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setLivestockFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            livestockFilter === 'all'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Livestock
        </button>
        <button
          onClick={() => setLivestockFilter('cattle')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            livestockFilter === 'cattle'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cattle
        </button>
        <button
          onClick={() => setLivestockFilter('ruminants')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            livestockFilter === 'ruminants'
              ? 'bg-green-500 text-white shadow-lg'
              : isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Goats & Sheep
        </button>
        <button
          onClick={() => setLivestockFilter('pigs')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${livestockFilter === 'pigs'
            ? 'bg-green-500 text-white shadow-lg'
            : isDark 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Pigs
      </button>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredLivestock.map((animal) => (
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
              src={animal.images[0]}
              alt={animal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm text-xs font-semibold rounded-full capitalize`}>
                {animal.type}
              </span>
              <span className={`px-3 py-1 ${isDark ? 'bg-gray-900/90 text-green-400' : 'bg-green-50/90 text-green-700'} backdrop-blur-sm text-xs font-semibold rounded-full`}>
                {animal.stock} available
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

            <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-3 mb-4`}>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Breed</p>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                    {animal.specifications.breed}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Age</p>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                    {animal.specifications.age}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-500">
                  KSh {animal.price.toLocaleString()}
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
      ))}
    </div>

    <LivestockModal />
  </div>
  );
};

export default Livestock;