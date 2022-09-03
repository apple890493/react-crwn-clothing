import './checkout.styles.scss';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {
          ['Product', 'Description', 'Quantity', 'Price', 'Remove'].map((item, index) => (
            <div className="header-block" key={index}>
              <span>{item}</span>
            </div>
          ))
        }
      </div>
      {
        cartItems.map(item => {
          return (
            <CheckoutItem key={item.id} cartItem={item} />
          )
        })
      }
      <span className="total">Total: ${cartTotal}</span>
    </div >
  )
};

export default Checkout;