import { Address } from "./Address.ts";
import { CartItem } from "./CartItem.ts";

export type Cart = {
  cartItems: CartItem[];
  subTotal?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  shippingAddress?: Address;
  paymentMethod?: string;
};
