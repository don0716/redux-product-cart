export const ADD_TO_CART = "cart/added";
export const REMOVE_FROM_CART = "cart/removed";
export const CALCULATE_TOTAL = "cart/calculateTotal";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (prodId) => ({
  type: REMOVE_FROM_CART,
  payload: prodId,
});

export const calculateTotal = () => ({
  type: CALCULATE_TOTAL,
});
