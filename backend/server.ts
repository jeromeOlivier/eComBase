import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/product-routes";
import userRoutes from "./routes/user-routes";
import orderRoutes from "./routes/order-routes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/error-handler";

// CONNECT TO DB
connectDB().then((r) => r);

// INIT APP
const port = process.env.PORT || 5000;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler as express.ErrorRequestHandler);

// START SERVER
app.listen(port, () => console.log(`Server running on port: ${port}`));
