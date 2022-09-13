import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { selectCartIsOpen, selectCartCount } from "../../store/cart/cart.selector";
import { setCartIsOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  // const { isCartOpen, setCartIsOpen, cartCount } = useContext(CartContext);
  // const toggleIsCartOpen = () => setCartIsOpen(!isCartOpen);
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectCartIsOpen);
  const toggleIsCartOpen = () => dispatch(setCartIsOpen(!isCartOpen))

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon " />
      <span className="item-count">{cartCount}</span>
    </div>
  )

};

export default CartIcon;