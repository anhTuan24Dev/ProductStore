# 🛒 Product Store - Fullstack PERN Application

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?logo=tailwindcss)

Một ứng dụng quản lý kho hàng (Product Management System) toàn diện được xây dựng trên nền tảng **PERN Stack** hiện đại. Dự án tập trung vào trải nghiệm người dùng mượt mà, tốc độ phản hồi nhanh và kiến trúc code sạch sẽ, dễ bảo trì.

---

## 📖 Mục lục
1. [Tính năng nổi bật](#-tính-năng-nổi-bật)
2. [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
3. [Công nghệ chi tiết](#-công-nghệ-chi-tiết)
4. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
5. [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
6. [Tài liệu API](#-tài-liệu-api)
7. [Cơ sở dữ liệu](#-cơ-sở-dữ-liệu)
8. [Hướng dẫn đóng góp](#-hướng-dẫn-đóng-góp)

---

## ✨ Tính năng nổi bật

### 🌐 Phía người dùng (Frontend)
- **Giao diện hiện đại**: Sử dụng DaisyUI với hệ thống theme thông minh, hỗ trợ Dark/Light mode tự động.
- **Quản lý State tập trung**: Toàn bộ logic dữ liệu được xử lý qua **Zustand**, giúp giảm prop-drilling và tối ưu hiệu suất render.
- **Thông báo thời gian thực**: Sử dụng `react-hot-toast` để cung cấp phản hồi ngay lập tức cho các thao tác Thêm/Sửa/Xóa.
- **Responsive Design**: Tương thích hoàn hảo trên Mobile, Tablet và Desktop.
- **Xử lý Error & Loading**: Trạng thái tải dữ liệu và thông báo lỗi được thiết kế chỉn chu, tăng trải nghiệm người dùng.

### ⚙️ Phía máy chủ (Backend)
- **RESTful API chuẩn hóa**: Hệ thống route rõ ràng, dễ mở rộng.
- **Hệ thống tự động hóa**: Tự động kiểm tra và khởi tạo bảng trong PostgreSQL ngay khi server chạy lần đầu (`Auto-migration`).
- **An toàn & Bảo mật**: Tích hợp `Helmet` để bảo vệ các header HTTP và `CORS` để quản lý truy cập từ frontend.
- **Logger chuyên nghiệp**: Sử dụng `Morgan` để giám sát các luồng request trong quá trình phát triển.

---

## 🏗 Kiến trúc hệ thống

Ứng dụng hoạt động theo mô hình **Client-Server**:
1. **Frontend (React)**: Gửi các yêu cầu HTTP (GET, POST, PUT, DELETE) thông qua thư viện **Axios**.
2. **Backend (Express)**: Tiếp nhận request, xác thực dữ liệu và tương tác với Database.
3. **Database (PostgreSQL)**: Lưu trữ dữ liệu sản phẩm bền vững.
4. **Logic Flow**:
    - Người dùng thao tác trên UI -> Gọi hàm trong Zustand Store -> Axios gửi request tới Express -> Express dùng `postgres.js` truy vấn DB -> Trả kết quả về Store -> UI cập nhật.

---

## 🛠 Công nghệ chi tiết

### Frontend
- **React 19**: Phiên bản mới nhất với các cải tiến về hiệu năng.
- **Vite**: Công cụ build siêu nhanh.
- **Tailwind CSS 4**: Framework CSS utility-first mới nhất.
- **DaisyUI 5**: Bộ thư viện component dựa trên Tailwind.
- **Zustand**: Quản lý state nhẹ nhàng nhưng mạnh mẽ.
- **Lucide React**: Thư viện icon dạng vector.

### Backend
- **Node.js**: Runtime môi trường thực thi Javascript.
- **Express 5**: Framework web tối giản cho Node.js.
- **Postgres.js**: Client PostgreSQL nhanh nhất cho Node.js hiện nay.
- **Dotenv**: Bảo mật thông tin nhạy cảm.
- **Biome**: Công cụ thay thế cho ESLint và Prettier với tốc độ xử lý cực nhanh.

---

## 📂 Cấu trúc thư mục

```text
ProductStore/
├── backend/
│   ├── config/             # Cấu hình kết nối DB (db.js)
│   ├── controllers/        # Logic xử lý chính cho từng API
│   ├── routes/             # Khai báo các đường dẫn API
│   ├── seeds/              # Dữ liệu mẫu ban đầu
│   ├── .env                # Biến môi trường server
│   ├── biome.json          # Cấu hình linter/formatter
│   └── server.js           # Điểm vào ứng dụng (Entry point)
├── frontend/
│   ├── public/             # Tài sản tĩnh (logo, favicon)
│   ├── src/
│   │   ├── components/     # UI components (Navbar, ProductCard...)
│   │   ├── pages/          # Các trang chính (HomePage, ProductPage)
│   │   ├── store/          # Zustand store quản lý logic
│   │   ├── App.jsx         # Cấu hình Routing
│   │   └── main.jsx        # Khởi tạo React app
│   ├── .env                # Biến môi trường client
│   └── tailwind.config.js  # Tùy chỉnh giao diện
└── package.json            # Cấu hình chung của dự án
```

---

## � Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- **Node.js**: >= 18.x
- **NPM/Yarn**: >= 8.x
- **PostgreSQL**: Cài đặt cục bộ hoặc sử dụng dịch vụ Cloud (như Neon.tech, Supabase).

### 2. Thiết lập Database
Tạo một cơ sở dữ liệu mới trên PostgreSQL. Bạn không cần tạo bảng thủ công, hệ thống sẽ tự động thực hiện việc này.

### 3. Cấu hình biến môi trường
**Backend (`/backend/.env`):**
```env
PORT=3000
DATABASE_URL=postgres://user:password@hostname:port/dbname?sslmode=require
NODE_ENV=development
```

**Frontend (`/frontend/.env`):**
```env
# URL của backend để frontend gọi API
VITE_API_URL=http://localhost:3000
```

### 4. Khởi chạy ứng dụng

**Bước 1: Cài đặt phụ thuộc**
```bash
# Tại thư mục gốc
cd backend && npm install
cd ../frontend && npm install
```

**Bước 2: Chạy chế độ phát triển (Development)**
- Chạy Backend: `cd backend && npm run dev`
- Chạy Frontend: `cd frontend && npm run dev`

---

## 📝 Tài liệu API

| Endpoint | Method | Body (JSON) | Mô tả |
| :--- | :--- | :--- | :--- |
| `/api/products` | `GET` | N/A | Lấy toàn bộ danh sách sản phẩm (mới nhất lên đầu) |
| `/api/products/:id` | `GET` | N/A | Lấy thông tin chi tiết một sản phẩm |
| `/api/products` | `POST` | `{name, price, image}` | Tạo sản phẩm mới |
| `/api/products/:id` | `PUT` | `{name, price, image}` | Chỉnh sửa sản phẩm theo ID |
| `/api/products/:id` | `DELETE`| N/A | Xóa vĩnh viễn sản phẩm |

---

## 💾 Cơ sở dữ liệu

Bảng `products` được định cấu hình như sau:
```sql
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---
*(Ghi chú: Đây là dự án mẫu tối ưu cho việc học tập và triển khai các ứng dụng Fullstack thực tế.)*
