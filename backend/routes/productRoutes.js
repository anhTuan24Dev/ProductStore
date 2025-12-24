import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  seedProductsData,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", getProducts);

// Seed lại dữ liệu mẫu (phải đặt trước route /:id để tránh conflict)
router.post("/seed", seedProductsData);

// Lấy thông tin một sản phẩm theo ID
router.get("/:id", getProduct);

// Tạo sản phẩm mới
router.post("/", createProduct);

// Cập nhật thông tin sản phẩm
router.put("/:id", updateProduct);

// Xóa sản phẩm
router.delete("/:id", deleteProduct);

export default router;
