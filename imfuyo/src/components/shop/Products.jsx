import React, { useState } from 'react';
import { ShoppingCart, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Products = ({ isDark, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Livestock Ear Tags',
      price: 1500,
      description: 'Durable and weather-resistant ear tags for cattle and goats. Easy to read numbering system for efficient livestock management.',
      category: 'identification',
      images: [
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179294/618pnOgykFL._UF894_1000_QL80__nxdwqw.jpg',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179314/Uacdc2dd04db84889b4bb776913359173M_f6vsxy.avif',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179396/s-l1600_dsnwye.webp',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179449/Ear-Tags-for-Goats-1-500x500_j7eaih.jpg'
      ],
      stock: 500,
      unit: 'per 100 tags'
    },
    {
      id: 2,
      name: 'Tag Applicators',
      price: 2500,
      description: 'Professional-grade applicator for quick and painless ear tag installation. Ergonomic design for comfortable use.',
      category: 'tools',
      images: [
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179505/h73ba8e6c9d7540a1b05c395596600ff7m-500x500_dsepbo.webp',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179540/41a1Ilm_ecL._AC_UF1000_1000_QL80__pepjam.jpg',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179582/download_xafs5d.jpg'
      ],
      stock: 150,
      unit: 'per piece'
    },
    {
      id: 3,
      name: 'Ruminal Magnetic Boluses',
      price: 800,
      description: 'Premium magnetic boluses designed to prevent hardware disease in cattle. Smooth-edged for safe administration.',
      category: 'health',
      images: [
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179658/Rumen-Magnet3_de7xwt.webp',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179708/Whole-Sales-Plastic-Calf-Magnet-Cage-Cattle-Rumen-Stomach-Cow-Magnet-Bolus_yv3ghe.avif',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179718/Whole-Sales-Plastic-Calf-Magnet-Cage-Cattle-Rumen-Stomach-Cow-Magnet-Bolus_fwmzne.avif',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179768/Rumen-Magnet-2-scaled_yeoiwb.jpg',
        'https://res.cloudinary.com/dpymwa41m/image/upload/v1761179823/Ruminal-Cow-Magnets_xkz6cs.jpg'
      ],
      stock: 300,
      unit: 'per unit'
    }
  ];

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

  const ProductModal = () => {
    if (!selectedProduct) return null;

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

                  <div className="space-y-4 mb-6">
                    <div className={`flex items-center justify-between py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Price</span>
                      <span className="text-2xl font-bold text-green-500">
                        KSh {selectedProduct.price.toLocaleString()}
                      </span>
                    </div>
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
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
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
                src={product.images[0]}
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
                    KSh {product.price.toLocaleString()}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {product.unit}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
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

      <ProductModal />
    </div>
  );
};

export default Products;