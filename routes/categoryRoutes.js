import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post(
  "/admin/categories",
  authMiddleware,
  adminMiddleware,
  createCategory
);
router.put(
  "/admin/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory
);
router.delete(
  "/admin/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

export default router;
