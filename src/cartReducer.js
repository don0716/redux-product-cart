import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions";

const initialState = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log("PAYLOAD::", action.payload);
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((val, index) => index != action.payload), //Keep only the items where the index does not match the action.payload.
      };

    case CALCULATE_TOTAL:
      return {
        ...state,
        total: state.cart.reduce((acc, curr) => acc + curr.price, 0),
      };
    default:
      return state;
  }
};

export default cartReducer;
