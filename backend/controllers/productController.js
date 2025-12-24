import { sql } from "../config/db.js";
import seedProducts from "../seeds/products.js";

// Lấy danh sách tất cả sản phẩm
export const getProducts = async (_req, res) => {
  try {
    // Lấy danh sách sản phẩm sắp xếp theo thời gian tạo mới nhất
    const products = await sql`
      select *
      from public.products
      order by created_at desc
    `;

    // Trả về mã trạng thái 200 OK kèm theo mảng dữ liệu sản phẩm
    res.status(200).json(products);
  } catch (error) {
    // Xử lý lỗi và trả về mã 500 Internal Server Error
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server khi lấy danh sách sản phẩm" });
  }
};

// Lấy thông tin một sản phẩm theo ID
export const getProduct = async (req, res) => {
  try {
    // Lấy id từ đường dẫn URL
    const { id } = req.params;

    // Truy vấn sản phẩm theo ID
    const products = await sql`
      select *
      from public.products
      where id = ${id}
    `;

    // Kiểm tra xem sản phẩm có tồn tại không
    if (products.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    // Trả về dữ liệu sản phẩm
    res.status(200).json(products[0]);
  } catch (error) {
    // Xử lý lỗi và trả về mã 500 Internal Server Error
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server khi lấy thông tin sản phẩm" });
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    // Nhận dữ liệu từ req.body
    const { name, price, image } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !price || !image) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
    }

    // Thực thi SQL để tạo sản phẩm mới và lấy lại thông tin vừa tạo
    const newProduct = await sql`
      insert into public.products (name, price, image)
      values (${name}, ${price}, ${image})
      returning *
    `;

    // Trả về mã 201 Created cùng dữ liệu sản phẩm mới
    res.status(201).json(newProduct[0]);
  } catch (error) {
    // Xử lý lỗi và trả về mã 500 Internal Server Error
    console.error("Lỗi khi tạo sản phẩm mới:", error);
    res.status(500).json({ error: "Lỗi server khi tạo sản phẩm mới" });
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (req, res) => {
  try {
    // Lấy id từ URL và các trường cần cập nhật từ body
    const { id } = req.params;
    const { name, price, image } = req.body;

    // Thực thi SQL để cập nhật sản phẩm và lấy lại thông tin sau khi cập nhật
    const updatedProducts = await sql`
      update public.products
      set name = ${name}, price = ${price}, image = ${image}
      where id = ${id}
      returning *
    `;

    // Kiểm tra xem sản phẩm có tồn tại để cập nhật không
    if (updatedProducts.length === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy sản phẩm để cập nhật" });
    }

    // Trả về sản phẩm sau khi đã được cập nhật kèm mã 200 OK
    res.status(200).json(updatedProducts[0]);
  } catch (error) {
    // Xử lý lỗi và trả về mã 500 Internal Server Error
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server khi cập nhật sản phẩm" });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    // Lấy id từ URL
    const { id } = req.params;

    // Thực thi SQL để xóa sản phẩm và lấy lại thông tin sản phẩm đã bị xóa
    const deletedProducts = await sql`
      delete from public.products
      where id = ${id}
      returning *
    `;

    // Kiểm tra xem sản phẩm có tồn tại để xóa không
    if (deletedProducts.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm để xóa" });
    }

    // Trả về thông báo xóa thành công và thông tin sản phẩm đã bị xóa
    res.status(200).json({
      message: "Xóa sản phẩm thành công",
      product: deletedProducts[0],
    });
  } catch (error) {
    // Xử lý lỗi và trả về mã 500 Internal Server Error
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ error: "Lỗi server khi xóa sản phẩm" });
  }
};

// Seed lại dữ liệu mẫu vào bảng products
export const seedProductsData = async (_req, res) => {
  try {
    console.log("API: Bắt đầu seed dữ liệu sản phẩm...");
    await seedProducts();

    // Lấy lại danh sách sản phẩm sau khi seed
    const products = await sql`
      select *
      from public.products
      order by created_at desc
    `;

    res.status(200).json({
      message: "Seed dữ liệu thành công",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error);
    res.status(500).json({ error: "Lỗi server khi seed dữ liệu" });
  }
};
