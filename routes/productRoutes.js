import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/admin/products", authMiddleware, adminMiddleware, createProduct);
router.put(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.delete(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;
