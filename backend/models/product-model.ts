import mongoose from "mongoose";
import { ReviewType, ReviewSchema } from "./review-model";

export type ProductType = {
  user: string;
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

const ProductSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true },
    reviews: [ReviewSchema],
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// collection name is explicitly specified as "products"
const ProductModel = mongoose.model("Product", ProductSchema, "products");
export { ProductModel, ProductSchema };
