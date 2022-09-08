import { createContext, useState, useEffect } from 'react';
// import PRODUCTS from '../shop-data.json' instead of 
// import SHOP_DATA from "../shop-data.js";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
  categoriesMap: {}, //product們的陣列
}); //外部可以訪問的接口

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap }; //Provider 使用的值

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap)
    }
    getCategoriesMap();
  }, [])

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}; //擁有訪問ProductsContext的範圍


