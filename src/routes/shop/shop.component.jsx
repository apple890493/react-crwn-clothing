import { useContext, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";

// import { CategoriesContext } from "../../contexts/categories.context";
// import CategoryPreview from "../../components/category-preview/category-preview.component";
import './shop.styles.scss';
import CategoriesPreview from "../categoreis-preview/categoreis-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  // const { categoriesMap } = useContext(CategoriesContext);'
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      // console.log(categoriesArray)
      dispatch(setCategories(categoriesArray));
    }
    getCategories();
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} ></Route>
      <Route path=":category" element={<Category />} ></Route>
    </Routes>
  )
};

export default Shop;