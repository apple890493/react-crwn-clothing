import { createContext, useState } from 'react';

export const CartContext = createContext({
  // 是否打開
  isCartOpen: false,
  setCartIsOpen: () => { } //外部component可以控制isOpen的值
  //products: []// 商品數量
});

export const CartProvider = ({ children }) => {
  console.log('children', children)
  const [isCartOpen, setCartIsOpen] = useState(false);
  const value = { isCartOpen, setCartIsOpen };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};

