import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions";

const initialState = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log("PAYLOAD::", action.payload);
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cart.find(
        (prod) => prod.id === action.payload.id
      );

      if (existingProduct) {
        console.log("updfating quantity for product: ", action.payload.id);
        const updatedCart = state.cart.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
        console.log("Updated Cart:: ", updatedCart);

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod, index) => prod.id != action.payload), //Keep only the items where the product iD does not match the action.payload.
      };

    case CALCULATE_TOTAL:
      return {
        ...state,
        total: state.cart.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
