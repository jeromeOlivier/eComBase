import AuthType from "./AuthType.ts";
// import { UserType } from "./UserType.ts";
import { CartStateType } from "./CartStateType.ts";

// The RootStateType is the type of the entire Redux store
type RootStateType = {
  auth: AuthType;
  // userInfo: UserType;
  cart: CartStateType;
};

export default RootStateType;
