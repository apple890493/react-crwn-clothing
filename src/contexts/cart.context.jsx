import { createContext, useState, useEffect } from 'react';


const addCartItem = (cartItems, productToAdd) => {
  //find items in cartItems
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  //if exisitng just update this quantity
  if (existingItem) {
    //map() return a new array
    return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : { ...item });
  }

  //Otherwise return [orignal object, new object and quantity is 1];
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};


const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find(item => item.id === productToRemove.id);

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter(item => item.id !== existingItem.id);
  }

  return cartItems.map(item => item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : { ...item });
};

const clearCartItem = (cartItems, productToClear) => cartItems.filter(item => item.id !== productToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setCartIsOpen: () => { }, // 外部 component 可以控制 isOpen 的值
  cartItems: [], // 商品
  addItemToCart: () => { }, //可以自己定義程式要判斷的事情
  removeItemfromCart: () => { },
  clearItemfromCart: () => { },
  cartCount: 0,
  cartTotal: 0
});

/*
  product {
    id
    name
    price
    imageUrl
  }

  cart Item {
    id
    name
    price
    imageUrl
    quantity // s
  }
*/

export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, curr) => total + curr.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]); //在這邊因為需要[]中的cartItems有更新資料才需要更新總數量，使用useEffect會比useState更方便適合

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, curr) => total + curr.quantity * curr.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemfromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemfromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = { isCartOpen, setCartIsOpen, addItemToCart, cartItems, cartCount, removeItemfromCart, clearItemfromCart, cartTotal };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};

