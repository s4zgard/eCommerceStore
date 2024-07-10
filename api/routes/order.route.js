import express from "express";
import {
  create,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/order.controller.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);
router.get("/my", protect, getMyOrders);
router.get("/all", protect, admin, getOrders);
router.get("/:orderId", protect, admin, getOrderById);
router.put("/paid/:orderId", protect, updateOrderToPaid);
router.put("/deliver/:orderId", protect, admin, updateOrderToDelivered);

export default router;
