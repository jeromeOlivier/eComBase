import mongoose from "mongoose";

type ReviewType = {
  name: string;
  rating: number;
  comment: string;
  user: string;
};

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// collection name is explicitly specified as "reviews"
const ReviewModel = mongoose.model("Reviews", ReviewSchema, "reviews");
export { ReviewModel, ReviewType, ReviewSchema };
