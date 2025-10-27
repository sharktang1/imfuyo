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
    const existing = cart.find(cartItem => cartItem.id === item.id && cartItem.itemType === (item.category ? 'livestock' : 'product'));
    if (existing) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id && cartItem.itemType === existing.itemType
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, itemType: item.category ? 'livestock' : 'product' }]);
    }
  };

  const updateQuantity = (itemId, itemType, delta) => {
    setCart(cart.map(item => 
      item.id === itemId && item.itemType === itemType
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId, itemType) => {
    setCart(cart.filter(item => !(item.id === itemId && item.itemType === itemType)));
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
            {cart.length}
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
    </div>
  );
};

export default Shop;