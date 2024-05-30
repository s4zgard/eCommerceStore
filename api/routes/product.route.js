import express from "express";
import { getProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);

export default router;
