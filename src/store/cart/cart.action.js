import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : { ...item });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};


const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find(item => item.id === productToRemove.id);

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter(item => item.id !== existingItem.id);
  }

  return cartItems.map(item => item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : { ...item });
};

const clearCartItem = (cartItems, productToClear) => cartItems.filter(item => item.id !== productToClear.id);


export const setCartIsOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemfromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemfromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};