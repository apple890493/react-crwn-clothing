import './category.styles.scss';
import ProductCard from "../../components/product-card/product-card.component";

import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
  const { category } = useParams(); //擷取url path 的參數 shop/{:category};
  // const { categoriesMap } = useContext(CategoriesContext); //取得產品資料
  const categoriesMap = useSelector(selectCategoriesMap);
  // const products = categoriesMap[category];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          products && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </Fragment>
  )
}

export default Category;