import './product-card.styles.scss';
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button.component";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
        <Button buttonTitle="ADD TO CART" buttonType="inverted" onClick={addProductToCart} />
      </div>
    </div>
  )
};

export default ProductCard;