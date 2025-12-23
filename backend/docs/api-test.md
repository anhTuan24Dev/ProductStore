# API Testing Documentation - Product Store

### 📌 Thông tin chung
- **Base URL:** `http://localhost:3000/api/products`
- **Headers:** `Content-Type: application/json`

---

### 1. Lấy danh sách sản phẩm
- **Method:** `GET`
- **URL:** `{{Base URL}}`
- **Mô tả:** Trả về toàn bộ danh sách sản phẩm.

### 2. Lấy chi tiết một sản phẩm
- **Method:** `GET`
- **URL:** `{{Base URL}}/:id`
- **Mô tả:** Lấy thông tin chi tiết của một sản phẩm theo ID.
- **Ví dụ:** `http://localhost:3000/api/products/1`

### 3. Thêm sản phẩm mới
- **Method:** `POST`
- **URL:** `{{Base URL}}`
- **Body (JSON):**
```json
{
  "name": "Bàn phím cơ AKKO",
  "price": 1500000,
  "image": "https://akko.vn/wp-content/uploads/2025/12/Ban-phim-co-MonsGeek-M2-V5-VIA-Black-Piano-Themed-8.png"
}
```

### 4. Cập nhật sản phẩm
- **Method:** `PUT`
- **URL:** `{{Base URL}}/:id`
- **Body (JSON):**
```json
{
  "name": "Bàn phím cơ AKKO (Updated)",
  "price": 1400000,
  "image": "https://akko.vn/wp-content/uploads/2025/12/Ban-phim-co-MonsGeek-M2-V5-VIA-Black-Piano-Themed-8.png"
}
```

### 5. Xóa sản phẩm
- **Method:** `DELETE`
- **URL:** `{{Base URL}}/:id`
- **Mô tả:** Xóa vĩnh viễn sản phẩm khỏi hệ thống.

---

### 💡 Lưu ý khi test:
1. Đảm bảo server đã chạy (`npm run dev` hoặc `node server.js`).
2. Nếu database chưa có dữ liệu, hãy chạy API **POST** trước để tạo sản phẩm mẫu.
3. Các trường `name`, `price`, `image` là bắt buộc khi tạo mới.
