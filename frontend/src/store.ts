import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./slices/productsApiSlice.ts";
import { apiSlice } from "./slices/apiSlice.ts";
import cartSliceReducer from "./slices/cartSlice";
import { Cart } from "./types/Cart.ts";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // TODO: disable in production
});

export type Store = {
  [productsApiSlice.reducerPath]: ReturnType<typeof productsApiSlice.reducer>;
  cart: Cart;
};
export default store;
