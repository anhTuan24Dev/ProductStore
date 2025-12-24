import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({ message: "Xin chào" });
});

// Gắn prefix /api/products cho tất cả các route liên quan đến sản phẩm
app.use("/api/products", productRoutes);

// Hàm khởi tạo database - tạo bảng products nếu chưa tồn tại
async function initDB() {
  try {
    await sql`
      create table if not exists public.products (
        id serial primary key,
        name varchar(255) not null,
        image varchar(255) not null,
        price decimal(10, 2) not null,
        created_at timestamp default current_timestamp
      );
    `;

    // Thêm comment mô tả cho bảng
    await sql`
      comment on table public.products is 'Bảng lưu trữ thông tin các sản phẩm trong cửa hàng';
    `;

    console.log("Bảng products đã được khởi tạo thành công");
  } catch (error) {
    console.error("Lỗi khi khởi tạo bảng products:", error);
    throw error;
  }
}

const PORT = process.env.PORT || 3000;

// Khởi tạo database trước khi server bắt đầu lắng nghe request
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại cổng ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Không thể khởi động server:", error);
    process.exit(1);
  });
