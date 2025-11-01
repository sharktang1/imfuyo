import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Products from './shop/Products';
import Services from './shop/Services';
import Livestock from './shop/Livestock';
import CartDrawer from './shop/CartDrawer';

const Shop = ({ isDark, onBack }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    const itemType = item.category ? 'livestock' : 'product';
    
    // For items with animal type options (ear tags)
    if (item.optionId) {
      const existing = cart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.itemType === itemType && 
        cartItem.optionId === item.optionId
      );
      
      if (existing) {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id && 
          cartItem.itemType === itemType && 
          cartItem.optionId === item.optionId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity: 1, itemType }]);
      }
    } else {
      // For regular items without options
      const existing = cart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.itemType === itemType
      );
      
      if (existing) {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id && cartItem.itemType === itemType
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity: 1, itemType }]);
      }
    }
  };

  const updateQuantity = (itemId, itemType, delta, optionId = null) => {
    setCart(cart.map(item => {
      // Match by id, itemType, and optionId (if provided)
      const isMatch = optionId 
        ? item.id === itemId && item.itemType === itemType && item.optionId === optionId
        : item.id === itemId && item.itemType === itemType;
      
      return isMatch
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId, itemType, optionId = null) => {
    setCart(cart.filter(item => {
      // Match by id, itemType, and optionId (if provided)
      if (optionId) {
        return !(item.id === itemId && item.itemType === itemType && item.optionId === optionId);
      }
      return !(item.id === itemId && item.itemType === itemType);
    }));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-white'} pt-20`}>
      {/* Navigation Tabs */}
      <div className={`sticky top-16 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'} border-b z-40`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 transition-colors font-medium ${
                activeTab === 'products'
                  ? 'border-green-500 text-green-500'
                  : isDark 
                    ? 'border-transparent text-gray-400 hover:text-gray-200' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-2 border-b-2 transition-colors font-medium ${
                activeTab === 'services'
                  ? 'border-green-500 text-green-500'
                  : isDark 
                    ? 'border-transparent text-gray-400 hover:text-gray-200' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('livestock')}
              className={`py-4 px-2 border-b-2 transition-colors font-medium ${
                activeTab === 'livestock'
                  ? 'border-green-500 text-green-500'
                  : isDark 
                    ? 'border-transparent text-gray-400 hover:text-gray-200' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Livestock
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'products' && <Products isDark={isDark} addToCart={addToCart} />}
      {activeTab === 'services' && <Services isDark={isDark} />}
      {activeTab === 'livestock' && <Livestock isDark={isDark} addToCart={addToCart} />}

      {/* Cart Button - Bottom Left */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer 
        showCart={showCart} 
        setShowCart={setShowCart} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        isDark={isDark} 
      />

      {/* Green Scrollbar Styles */}
      <style>{`
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f3f4f6'};
        }

        ::-webkit-scrollbar-thumb {
          background: #40916c;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2d6a4f;
        }
      `}</style>
    </div>
  );
};

export default Shop;