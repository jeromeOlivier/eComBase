import { Auth } from "./Auth.ts";
import { Cart } from "./Cart.ts";
import { Address } from "./Address.ts";

// The Transaction is the type for the entire Redux store
export type Transaction = {
  auth?: Auth; // auth includes user info and token
  cart?: Cart;
  shippingAddress?: Address;
  paymentMethod?: string;
};
