import Product from "../models/product.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
