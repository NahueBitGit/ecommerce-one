import { createContext, useState, useEffect, useContext } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadFromStorage('cart_items', []));

  useEffect(() => {
    saveToStorage('cart_items', cart);
  }, [cart]);

  const findItemIndex = (id) => cart.findIndex(it => it.id === id);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, quantity: qty }];
      } else {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
  };

  const clearCart = () => setCart([]);

  const cartQuantity = cart.reduce((acc, it) => acc + (it.quantity || 0), 0);
  const cartTotal = cart.reduce((acc, it) => acc + (it.price * it.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartQuantity,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
