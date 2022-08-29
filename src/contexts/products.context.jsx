import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
  products: [], //product們的陣列
}); //外部可以訪問的接口

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products }; //Provider 使用的值

  return <ProductsContext.Provider value={value}>{children} d</ProductsContext.Provider>
}; //擁有訪問ProductsContext的範圍

