import { ProductModel, ProductType } from "../models/product-model";
import { ExtendedResponse, ExtendedRequest } from "../types/global";
import asyncUserHandler from "../middleware/async-handler";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncUserHandler(
  async (_req: ExtendedRequest, res: ExtendedResponse) => {
    const products = (await ProductModel.find({})) as ProductType[];
    console.log(products);
    res.json(products);
  }
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncUserHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    // check if MongoDB ObjectId is valid
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      handleInvalidObjectIdError(res);
      return;
    }
    console.log(req.params.id);
    const product = await ProductModel.findById(req.params.id);
    product ? res.json(product) : handleProductNotFoundError(res);
  }
);

// Helper functions for error handling
function handleProductNotFoundError(res: ExtendedResponse) {
  res.status(404).json({ error: "Resource not found" });
}

function handleInvalidObjectIdError(res: ExtendedResponse) {
  res.status(400).json({ error: "Invalid ObjectId" });
}

export { getProducts, getProductById };
