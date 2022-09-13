import './checkout-item.styles.scss';

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../../contexts/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import { clearItemfromCart, addItemToCart, removeItemfromCart } from "../../store/cart/cart.action";


const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  //const { clearItemfromCart, addItemToCart, removeItemfromCart } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const clearItemHandler = () => dispatch(clearItemfromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemfromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        <div className="value">{quantity}</div>
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
    </div>
  )
};


export default CheckoutItem;