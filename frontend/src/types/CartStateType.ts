import { AddressType } from "./AddressType.ts";
import { CartItemType } from "./CartItemType.ts";

export type CartStateType = {
  cartItems: CartItemType[];
  subTotal?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  shippingAddress?: AddressType;
  paymentMethod?: string;
};
