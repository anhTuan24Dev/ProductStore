import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", getProducts);

// Lấy thông tin một sản phẩm theo ID
router.get("/:id", getProduct);

// Tạo sản phẩm mới
router.post("/", createProduct);

// Cập nhật thông tin sản phẩm
router.put("/:id", updateProduct);

// Xóa sản phẩm
router.delete("/:id", deleteProduct);

export default router;
