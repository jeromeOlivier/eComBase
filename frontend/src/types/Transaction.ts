import AuthType from "./AuthType";
import { CartStateType } from "./CartStateType";
import { AddressType } from "./AddressType";

// The Transaction is the type for the entire Redux store
type Transaction = {
  auth?: AuthType; // auth includes user info and token
  cart?: CartStateType;
  shippingAddress?: AddressType;
  paymentMethod?: string;
};

export default Transaction;
