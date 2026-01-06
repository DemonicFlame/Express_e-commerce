import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/admin/products", auth, admin, createProduct);
router.put("/admin/products/:id", auth, admin, updateProduct);
router.delete("/admin/products/:id", auth, admin, deleteProduct);

export default router;
