import { ProductModel, ProductType } from "../models/product-model";
import { Response, Request } from "express";
import asyncHandler from "../middleware/async-handler";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = (await ProductModel.find({})) as ProductType[];
  console.log(products);
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
  console.log(req.params.id);
  const product = await ProductModel.findById(req.params.id);
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
