import AuthType from "./AuthType";
import { CartStateType } from "./CartStateType";
import { AddressType } from "./AddressType";

// The RootStateType is the type for the entire Redux store
type RootStateType = {
  auth?: AuthType; // auth includes user info and token
  cart?: CartStateType;
  shippingAddress?: AddressType;
  paymentMethod?: string;
};

export default RootStateType;
