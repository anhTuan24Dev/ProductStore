import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import aj from "./lib/arcjet.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Middleware kiểm tra và bảo vệ request bằng Arcjet
app.use(async (req, res, next) => {
  try {
    // Gọi aj.protect để kiểm tra request hiện tại
    const decision = await aj.protect(req);

    // Kiểm tra nếu request bị từ chối
    if (decision.isDenied()) {
      // Kiểm tra nếu bị từ chối do Rate Limit
      // Sử dụng isRateLimited() nếu có, nếu không kiểm tra qua results
      const isRateLimited =
        typeof decision.isRateLimited === "function"
          ? decision.isRateLimited()
          : decision.results?.some(
              (result) =>
                result.rule === "TOKEN_BUCKET" &&
                (typeof result.isDenied === "function"
                  ? result.isDenied()
                  : result.isDenied === true),
            );

      if (isRateLimited) {
        return res.status(429).json({
          error: "Too Many Requests",
          message:
            "Bạn đã vượt quá giới hạn số lượng request. Vui lòng thử lại sau.",
        });
      }

      // Kiểm tra nếu bị từ chối do Bot hoặc Shield
      const results = decision.results || [];
      const botResult = results.find(
        (result) =>
          (result.rule === "BOT_DETECTION" || result.rule === "DETECT_BOT") &&
          (typeof result.isDenied === "function"
            ? result.isDenied()
            : result.isDenied === true),
      );
      const shieldResult = results.find(
        (result) =>
          result.rule === "SHIELD" &&
          (typeof result.isDenied === "function"
            ? result.isDenied()
            : result.isDenied === true),
      );

      if (botResult || shieldResult) {
        return res.status(403).json({
          error: "Forbidden",
          message:
            "Request của bạn đã bị từ chối do vi phạm chính sách bảo mật.",
        });
      }

      // Nếu có lý do từ chối khác, trả về 403 mặc định
      return res.status(403).json({
        error: "Forbidden",
        message: "Request của bạn đã bị từ chối.",
      });
    }

    // Nếu request hợp lệ, cho phép tiếp tục đi vào các controller
    next();
  } catch (error) {
    // Xử lý lỗi nếu có vấn đề khi gọi Arcjet
    console.error("Lỗi khi kiểm tra Arcjet:", error);
    // Cho phép request tiếp tục nếu có lỗi với Arcjet (fail-open)
    next();
  }
});

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
