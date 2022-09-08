// import { useContext } from 'react';
import { Route, Routes } from "react-router-dom";


// import { CategoriesContext } from "../../contexts/categories.context";
// import CategoryPreview from "../../components/category-preview/category-preview.component";
import './shop.styles.scss';
import CategoriesPreview from "../categoreis-preview/categoreis-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} ></Route>
      <Route path=":category" element={<Category />} ></Route>
    </Routes>
  )
};

export default Shop;