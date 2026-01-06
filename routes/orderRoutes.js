import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/orders", auth, createOrder);
router.get("/orders", auth, getUserOrders);
router.get("/admin/orders", auth, admin, getAllOrders);
router.put("/admin/orders/:orderId/status", auth, admin, updateOrderStatus);

export default router;
