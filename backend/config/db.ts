import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) throw new Error("MongoDB URI is not defined");

  try {
    const conn: Mongoose = await mongoose.connect(URI);
    console.log(`MongoDB Successfully Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`MongoDB Error: ${error.message}`);
    }
    throw error;
  }
};

export default connectDB;
