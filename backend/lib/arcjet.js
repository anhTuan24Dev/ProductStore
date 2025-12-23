import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

// Cấu hình và khởi tạo Arcjet với các quy tắc bảo mật
const aj = arcjet({
  // Lấy site key từ biến môi trường ARCJET_KEY
  // Đăng ký tại https://app.arcjet.com
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield bảo vệ ứng dụng khỏi các cuộc tấn công phổ biến như SQL injection
    shield({ mode: "LIVE" }),
    // Tạo quy tắc phát hiện bot
    detectBot({
      // Chặn tất cả bot trừ các loại sau
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Bỏ comment để cho phép các danh mục bot phổ biến khác
        // Xem danh sách đầy đủ tại https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Dịch vụ giám sát uptime
        //"CATEGORY:PREVIEW", // Link previews như Slack, Discord
      ],
      mode: "LIVE", // Chặn các request. Sử dụng "DRY_RUN" để chỉ ghi log
    }),
    // Tạo rate limit bằng token bucket. Hỗ trợ các thuật toán khác
    tokenBucket({
      capacity: 10, // Dung lượng bucket là 10 token
      interval: 10, // Bổ sung mỗi 10 giây
      mode: "LIVE",
      // Theo dõi theo địa chỉ IP mặc định, có thể tùy chỉnh
      // Xem thêm tại https://docs.arcjet.com/fingerprints
      //characteristics: ["ip.src"],
      refillRate: 5, // Bổ sung 5 token mỗi interval
    }),
  ],
});

export default aj;
