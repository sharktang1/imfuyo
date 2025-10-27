import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartDrawer = ({ showCart, setShowCart, cart, updateQuantity, removeFromCart, isDark }) => {
  if (!showCart) return null;

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={() => setShowCart(false)}>
      <div 
        className={`${isDark ? 'bg-gray-900' : 'bg-white'} w-full max-w-md h-full shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'} flex justify-between items-center`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Shopping Cart
          </h3>
          <button
            onClick={() => setShowCart(false)}
            className={`p-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              <ShoppingCart className="w-24 h-24 mb-4" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.itemType}-${item.id}`} className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-4`}>
                  <div className="flex gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {item.name}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        {item.unit || item.itemType}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.itemType, -1)}
                            className={`w-8 h-8 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} rounded-lg flex items-center justify-center transition-colors`}
                          >
                            <Minus className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                          </button>
                          <span className={`w-8 text-center font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.itemType, 1)}
                            className={`w-8 h-8 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} rounded-lg flex items-center justify-center transition-colors`}
                          >
                            <Plus className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.itemType)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                    <span className="text-lg font-bold text-green-500">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className={`p-6 border-t ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Total
              </span>
              <span className="text-2xl font-bold text-green-500">
                KSh {getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition-colors shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;