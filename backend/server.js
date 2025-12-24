import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import seedProducts from "./seeds/products.js";

dotenv.config();

const app = express();

// Lấy đường dẫn thư mục hiện tại (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình helmet với CSP cho phép load hình ảnh từ các domain bên ngoài
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"], // Cho phép load hình ảnh từ HTTPS
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Cho phép inline styles cho Tailwind
      },
    },
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Gắn prefix /api/products cho tất cả các route liên quan đến sản phẩm
app.use("/api/products", productRoutes);

// Cấu hình serve static files cho môi trường production
if (process.env.NODE_ENV === "production") {
  // Đường dẫn đến thư mục build của frontend
  const frontendDistPath = path.join(__dirname, "../frontend/dist");

  // Serve các file tĩnh (CSS, JS, images, etc.)
  app.use(express.static(frontendDistPath));

  // Catch-all route: Trả về index.html cho mọi route không phải API
  // Giúp React Router hoạt động chính xác trên server
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  // Route mặc định cho development
  app.get("/", (_req, res) => {
    res.json({ message: "Xin chào" });
  });
}

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

    // Kiểm tra xem bảng có dữ liệu không, nếu trống thì tự động seed
    const productCount = await sql`
      select count(*)::int as count from public.products
    `;

    // Chuyển đổi count sang số để so sánh chính xác (PostgreSQL có thể trả về string)
    const count = Number(productCount[0]?.count || 0);

    if (count === 0) {
      console.log("Bảng products đang trống, bắt đầu seed dữ liệu mẫu...");
      try {
        await seedProducts();
        console.log("✅ Đã seed dữ liệu mẫu thành công!");
      } catch (seedError) {
        // Log lỗi nhưng không crash server nếu seed thất bại
        console.error("⚠️ Cảnh báo: Không thể seed dữ liệu mẫu:", seedError);
        console.log("Server vẫn sẽ khởi động, nhưng bảng products sẽ trống.");
      }
    } else {
      console.log(
        `Bảng products đã có ${count} sản phẩm, bỏ qua seed.`,
      );
    }
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
