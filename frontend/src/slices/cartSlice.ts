import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { updateCart } from "../utilities/cartUtils";
import { Cart } from "../types/Cart.ts";
import { ProductType } from "../types/ProductType.ts";

const initialState: Cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice: Slice<Cart> = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: Cart,
      action: PayloadAction<{ product: ProductType; quantity: number }>
    ) => {
      const newItem = action.payload;
      // 1. Check if item already exists in cart
      const itemAlreadyInCart = state.cartItems.find(
        (item) => item.product._id === newItem.product._id
      );
      // 2. If it does, update that item with the new item
      if (itemAlreadyInCart) {
        state.cartItems = state.cartItems.map((item) =>
          item.product._id === newItem.product._id ? newItem : item
        );
      } else {
        // 3. If it doesn't, add that new item to the cart
        state.cartItems.push(newItem);
      }
      // 4. Update the cart
      return updateCart(state);
    },
    removeFromCart: (
      state: Cart,
      action: PayloadAction<{ productId: string }>
    ) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload.productId
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
