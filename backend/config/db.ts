import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) throw new Error("MongoDB URI is not defined");

  try {
    await mongoose.connect(URI);
    console.log(`MongoDB Successfully Connected`);
    console.log("Mongo HOSTNAME:", mongoose.connection.host);
    console.log("Mongo DATABASE:", mongoose.connection.name);
    console.log("Mongo PORT:", mongoose.connection.port);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`MongoDB Error: ${error.message}`);
    }
    throw error;
  }
};

export default connectDB;
