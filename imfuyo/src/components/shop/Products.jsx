import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Eye, ChevronLeft, ChevronRight, X, Check, Plus, Minus } from 'lucide-react';
import { db } from '../../Libs/firebase-config.mjs';
import { collection, getDocs } from 'firebase/firestore';

const Products = ({ isDark, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use ref to prevent double fetching
  const hasFetched = useRef(false);

  // Default products as fallback
  const defaultProducts = [
    {
      id: 1,
      name: 'Livestock Ear Tags',
      basePrice: 1500,
      description: 'Durable and weather-resistant ear tags for cattle and goats. Easy to read numbering system for efficient livestock management.',
      category: 'identification',
      images: [
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179294/618pnOgykFL._UF894_1000_QL80__nxdwqw.jpg',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179314/Uacdc2dd04db84889b4bb776913359173M_f6vsxy.avif',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179396/s-l1600_dsnwye.webp',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179449/Ear-Tags-for-Goats-1-500x500_j7eaih.jpg'
      ],
      stock: 500,
      unit: 'per 100 tags',
      hasOptions: true,
      options: [
        {
          id: 'cows',
          name: 'Cows',
          price: 1800,
          description: 'Large, durable ear tags designed for cattle. Extra-strong material for long-lasting identification.'
        },
        {
          id: 'ruminants',
          name: 'Ruminants (Sheep & Goats)',
          price: 1500,
          description: 'Medium-sized ear tags perfect for sheep and goats. Lightweight yet durable construction.'
        },
        {
          id: 'pigs',
          name: 'Pigs',
          price: 1650,
          description: 'Specialized ear tags for swine with reinforced edges for active animals.'
        }
      ]
    }
  ];

  // Fetch products data from Firestore - OPTIMIZED
  const fetchProductsData = async () => {
    // Prevent double fetching
    if (hasFetched.current) {
      console.log('🔄 Fetch already in progress or completed, skipping...');
      return;
    }
    
    hasFetched.current = true;
    
    try {
      console.log('🚀 Fetching products from Firestore...');
      setIsLoading(true);
      
      const productsRef = collection(db, 'shop', 'categories', 'products');
      const productsSnapshot = await getDocs(productsRef);
      
      console.log(`✅ Found ${productsSnapshot.size} products`);
      
      let productsData = [];

      if (!productsSnapshot.empty) {
        productsData = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          return { 
            id: doc.id, 
            ...data,
            price: data.price || data.basePrice || 0,
            basePrice: data.basePrice || data.price || 0
          };
        });
      } else {
        console.warn('⚠️ No products found, using default data');
        productsData = defaultProducts;
      }

      setProducts(productsData);
      
    } catch (error) {
      console.error('❌ Error fetching products:', error.message);
      setProducts(defaultProducts);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts - OPTIMIZED
  useEffect(() => {
    // Only fetch if we haven't already and if products array is empty
    if (!hasFetched.current && products.length === 0) {
      fetchProductsData();
    }
    
    // Cleanup function to reset the flag when component unmounts
    return () => {
      hasFetched.current = false;
    };
  }, [products.length]); // Add products.length as dependency

  // Rest of your existing functions remain the same
  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => prev === 0 ? selectedProduct.images.length - 1 : prev - 1);
    }
  };

  const handleQuantityChange = (optionId, change) => {
    setSelectedAnimalTypes(prev => {
      const currentQty = prev[optionId] || 0;
      const newQty = Math.max(0, currentQty + change);
      
      if (newQty === 0) {
        const { [optionId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [optionId]: newQty
      };
    });
  };

  const getTotalPrice = () => {
    if (!selectedProduct || !selectedProduct.hasOptions) return 0;
    
    return Object.entries(selectedAnimalTypes).reduce((total, [optionId, quantity]) => {
      const option = selectedProduct.options.find(opt => opt.id === optionId);
      return total + (option.price * quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(selectedAnimalTypes).reduce((sum, qty) => sum + qty, 0);
  };

  const handleAddToCart = () => {
    if (selectedProduct.hasOptions) {
      if (Object.keys(selectedAnimalTypes).length === 0) {
        return;
      }

      Object.entries(selectedAnimalTypes).forEach(([optionId, quantity]) => {
        const selectedOption = selectedProduct.options.find(opt => opt.id === optionId);
        const productToAdd = {
          ...selectedProduct,
          price: selectedOption.price,
          animalType: selectedOption.name,
          optionId: selectedOption.id,
          quantity: quantity
        };
        
        for (let i = 0; i < quantity; i++) {
          addToCart(productToAdd);
        }
      });
    } else {
      addToCart(selectedProduct);
    }

    setSelectedProduct(null);
    setCurrentImageIndex(0);
    setSelectedAnimalTypes({});
  };

  const ProductModal = () => {
    if (!selectedProduct) return null;

    const totalPrice = selectedProduct.hasOptions ? getTotalPrice() : selectedProduct.price;
    const totalItems = getTotalItems();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
          <div className={`sticky top-0 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border-b p-6 flex justify-between items-center z-10`}>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedProduct.name}
            </h3>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setCurrentImageIndex(0);
                setSelectedAnimalTypes({});
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
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                  {selectedProduct.images.length > 1 && (
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
                
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, idx) => (
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
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                    {selectedProduct.description}
                  </p>

                  {selectedProduct.hasOptions && (
                    <div className="mb-6">
                      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                        Select Animal Types & Quantities:
                      </h4>
                      <div className="space-y-3">
                        {selectedProduct.options.map((option) => {
                          const quantity = selectedAnimalTypes[option.id] || 0;
                          const isSelected = quantity > 0;

                          return (
                            <div
                              key={option.id}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? 'border-green-500 bg-green-500 bg-opacity-10'
                                  : isDark 
                                    ? 'border-gray-700 bg-gray-800' 
                                    : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-semibold ${
                                      isSelected 
                                        ? 'text-green-600' 
                                        : isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                      {option.name}
                                    </span>
                                    {isSelected && (
                                      <Check className="w-5 h-5 text-green-500" />
                                    )}
                                  </div>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                    {option.description}
                                  </p>
                                  <p className="text-lg font-bold text-green-500">
                                    KSh {option.price.toLocaleString()} <span className="text-sm font-normal">{selectedProduct.unit}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Quantity:
                                </span>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => handleQuantityChange(option.id, -1)}
                                    disabled={quantity === 0}
                                    className={`p-2 rounded-lg transition-colors ${
                                      quantity === 0
                                        ? isDark ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400'
                                        : isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                    }`}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className={`w-12 text-center font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => handleQuantityChange(option.id, 1)}
                                    className={`p-2 rounded-lg transition-colors ${
                                      isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                                    } text-white`}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {quantity > 0 && (
                                <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Subtotal:
                                  </span>
                                  <span className="font-bold text-green-500">
                                    KSh {(option.price * quantity).toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    {selectedProduct.hasOptions && totalItems > 0 && (
                      <div className={`flex items-center justify-between py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Items</span>
                        <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {totalItems}
                        </span>
                      </div>
                    )}
                    <div className={`flex items-center justify-between py-3 ${selectedProduct.hasOptions ? 'border-t' : 'border-t'} ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {selectedProduct.hasOptions && totalItems > 0 ? 'Total Price' : 'Price'}
                      </span>
                      <span className="text-2xl font-bold text-green-500">
                        KSh {totalPrice.toLocaleString()}
                      </span>
                    </div>
                    {!selectedProduct.hasOptions && (
                      <>
                        <div className={`flex items-center justify-between py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Unit</span>
                          <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                            {selectedProduct.unit}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between py-3 border-t border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Stock</span>
                          <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                            {selectedProduct.stock} available
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.hasOptions && Object.keys(selectedAnimalTypes).length === 0}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    selectedProduct.hasOptions && Object.keys(selectedAnimalTypes).length === 0
                      ? isDark 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {selectedProduct.hasOptions && Object.keys(selectedAnimalTypes).length === 0
                    ? 'Select at least one animal type' 
                    : selectedProduct.hasOptions && totalItems > 0
                    ? `Add ${totalItems} ${totalItems === 1 ? 'item' : 'items'} to Cart`
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    
    if (product.hasOptions) {
      setSelectedProduct(product);
    } else {
      addToCart(product);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading products...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Our Products
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className={`group ${isDark ? 'bg-gray-900 border-gray-800 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'} rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer relative`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Eye className="w-3 h-3" />
                View Details
              </div>

              <div className={`aspect-square ${isDark ? 'bg-gray-800' : 'bg-gray-50'} overflow-hidden`}>
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {product.name}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-500">
                      {product.hasOptions ? 'From ' : ''}KSh {(product.price || product.basePrice || 0).toLocaleString()}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {product.unit || 'per item'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
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
              No products found. Please check the Firestore configuration.
            </p>
          </div>
        )}
      </div>

      <ProductModal />
    </div>
  );
};

export default Products;