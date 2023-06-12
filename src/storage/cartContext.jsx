import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guarda el carrito en localStorage cuando haya cambios
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItem = () => {
    return cart.reduce((total, item) => total + item.amount, 0);
  };

  const getTotalPriceInCart = () => {
    return cart.reduce((total, item) => total + item.amount * item.price, 0);
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const addItem = (item, amount) => {
    if (isInCart(item.id)) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            amount: cartItem.amount + amount,
            stock: cartItem.stock - amount,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      const newItem = {
        ...item,
        amount,
        stock: item.stock - amount,
      };
      setCart([...cart, newItem]);
    }
  };

  const cartContextValues = {
    cart,
    addItem,
    removeItem,
    clearCart,
    getTotalItem,
    getTotalPriceInCart,
  };

  return (
    <CartContext.Provider value={cartContextValues}>
      {children}
    </CartContext.Provider>
  );
};
