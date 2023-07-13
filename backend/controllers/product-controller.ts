import { ProductType } from "../../frontend/src/types/ProductType";
import ProductSchema from "../models/Product";
import { Response, Request } from "express";
import asyncHandler from "../middleware/async-handler";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = (await ProductSchema.find({})) as ProductType[];
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  // check if MongoDB ObjectId is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    handleInvalidObjectIdError(res);
    return;
  }
  const product = await ProductSchema.findById(req.params.id);
  product ? res.json(product) : handleProductNotFoundError(res);
});

// Helper functions for error handling
function handleProductNotFoundError(res: Response) {
  res.status(404).json({ error: "Resource not found" });
}

function handleInvalidObjectIdError(res: Response) {
  res.status(400).json({ error: "Invalid ObjectId" });
}

export { getProducts, getProductById };
