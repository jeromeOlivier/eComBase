import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routers/product-routes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/error-handler";

connectDB(); // Connect to MongoDB

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// ROUTES
app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/products", productRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
