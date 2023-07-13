import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", user);

export default User;
