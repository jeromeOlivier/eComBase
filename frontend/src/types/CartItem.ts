import { ProductType } from "./ProductType.ts";

export type CartItem = {
  product: ProductType;
  quantity: number;
};
