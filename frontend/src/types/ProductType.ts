import { ReviewType } from "../../../backend/models/review-model.ts";

// Hungarian notation used to avoid conflict with `Product` component.
export type ProductType = {
  _id: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  reviews: ReviewType[];
  numReviews: number;
};
