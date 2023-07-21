import { ReviewType } from "../../../backend/models/review-model.ts";

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
