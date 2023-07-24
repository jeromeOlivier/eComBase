import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./slices/productsApiSlice.ts";
import cartSliceReducer from "./slices/cartSlice";
import { CartStateType } from "./types/CartStateType";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
  devTools: true,
});

export type StoreState = {
  [productsApiSlice.reducerPath]: ReturnType<typeof productsApiSlice.reducer>;
  cart: CartStateType;
};
export default store;
