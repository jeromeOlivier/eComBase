import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { updateCart } from "../utilities/cartUtils";
import {
  CartStateType,
  CartStateType as State,
} from "../types/CartStateType.ts";
import { ProductType } from "../types/ProductType.ts";

const initialState: State = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] };

// Slice
const cartSlice: Slice<CartStateType> = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: State,
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
      updateCart(state);
    },
    removeFromCart: (
      state: State,
      action: PayloadAction<{ productId: string }>
    ) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload.productId
      );
      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
