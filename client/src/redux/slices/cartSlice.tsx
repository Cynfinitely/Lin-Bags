import { createSlice} from "@reduxjs/toolkit";
import { CartState } from "types";

const initialCartState: CartState = {
  cartProducts: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.name === action.payload.name
      );
      if (productIndex >= 0) {
        state.cartProducts[productIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartProducts.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartProducts));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    cartProducts: () => {
      console.log("CART WORKING!");
    },
  },
  extraReducers: (builder) => {},
});

export const { cartProducts, addToCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
