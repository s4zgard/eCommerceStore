import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:productId")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route("/reviews/:productId").post(protect, createReview);

export default router;
