import { createStore } from "redux";
import cartReducer from "./cartReducer";
import { addToCart, removeFromCart, calculateTotal } from "./actions";

// Subscribe to Store
const store = createStore(
  cartReducer, //The reducer to manage the cart state.
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  //   console.log(store.getState());
  updateCart();
});

// Product List
const products = [
  { id: 1, name: "Product A", price: 10 },

  { id: 2, name: "Product B", price: 20 },

  { id: 3, name: "Product C", price: 15 },
];

// Product List from html file
const productList = document.querySelector("#productList");
const cartItemsList = document.querySelector("#cartItemsList");
const cartTotal = document.querySelector("#cartTotal");

// Render products in html
// addproducts to the cart
window.handleAddToCart = (prodId) => {
  const product = products.find((prod) => prod.id === prodId);
  console.log("Dispatching addToCart::", addToCart(product));
  store.dispatch(addToCart(product));
  store.dispatch(calculateTotal());
};
productList.innerHTML = "";
productList.innerHTML = products
  .map(
    (prod) =>
      `<li key=${prod.id}>
        <strong>Name: </strong>  ${prod.name} |
        <strong>Price: </strong> ${prod.price} | 
        <button onClick="handleAddToCart(${prod.id})" >Add to Cart</button>
    </li>`
  )
  .join("");

window.handleRemoveFromCart = (index) => {
  console.log("INDEX:: ", index);
  store.dispatch(removeFromCart(index));
  store.dispatch(calculateTotal());
};

// Update Cart Items
const updateCart = () => {
  console.log("STATE:: ", store.getState());
  cartItemsList.innerHTML = "";
  cartItemsList.innerHTML = store
    .getState()
    .cart.map(
      (cart, index) => `
      <li> <strong>ID: </strong> ${cart.id} | <strong>Name: </strong> ${cart.name} | <strong>Price: </strong> ${cart.price} | <strong>INDEX: </strong> ${index} | <button onClick="handleRemoveFromCart(${index})" >DELETE</button> </li> 
      `
    )
    .join("");
  cartTotal.innerHTML = store.getState().total;
};
updateCart();
