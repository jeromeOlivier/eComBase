import { CartStateType } from "../types/CartStateType.ts";
import { CartItemType } from "../types/CartItemType.ts";

const roundToTwoDecimals = (num: number) =>
  Number((Math.round(num * 100) / 100).toFixed(2));

export const updateCart = (state: CartStateType) => {
  const calculateSubtotal = (cartItems: CartItemType[]) =>
    roundToTwoDecimals(
      cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  const calculateShipping = (subTotal: number) =>
    roundToTwoDecimals(subTotal > 100 ? 0 : 100);

  const calculateTax = (subTotal: number) =>
    roundToTwoDecimals(Number((0.15 * subTotal).toFixed(2)));

  const calculateTotal = (
    subTotal: number,
    shippingPrice: number,
    taxPrice: number
  ) => roundToTwoDecimals(subTotal + shippingPrice + taxPrice);

  // Update the cart totals
  state.subTotal = calculateSubtotal(state.cartItems);
  state.shippingPrice = calculateShipping(state.subTotal);
  state.taxPrice = calculateTax(state.subTotal);
  state.totalPrice = calculateTotal(
    state.subTotal,
    state.shippingPrice,
    state.taxPrice
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
