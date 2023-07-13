import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/ProductType";
import { AddressType } from "../types/AddressType";

interface CartItem {
  product: ProductType;
  quantity: number;
}

interface State {
  cartItems: CartItem[];
  subTotal?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  shippingAddress?: AddressType;
  paymentMethod?: string;
}

const initialState: State = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] };

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: State, action: PayloadAction<CartItem>) => {
      const newItem: CartItem = action.payload;
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
        state.cartItems = [...state.cartItems, newItem];
      }

      state.subTotal = calculateSubtotal(state.cartItems);
      state.shippingPrice = calculateShipping(state.subTotal);
      state.taxPrice = calculateTax(state.subTotal);
      state.totalPrice = calculateTotal(
        state.subTotal,
        state.shippingPrice,
        state.taxPrice
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

// Helper functions
function roundToTwoDecimals(num: number) {
  return Number((Math.round(num * 100) / 100).toFixed(2));
}
function calculateSubtotal(cartItems: CartItem[]) {
  return roundToTwoDecimals(
    cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );
}
function calculateShipping(subTotal: number) {
  return roundToTwoDecimals(subTotal > 100 ? 0 : 100);
}
function calculateTax(subTotal: number) {
  return roundToTwoDecimals(Number((0.15 * subTotal).toFixed(2)));
}
function calculateTotal(
  subTotal: number,
  shippingPrice: number,
  taxPrice: number
) {
  return roundToTwoDecimals(subTotal + shippingPrice + taxPrice);
}
