import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// URL cơ sở sẽ thay đổi tùy theo môi trường (development hoặc production)
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Store quản lý state và các thao tác liên quan đến sản phẩm
export const useProductStore = create((set, get) => ({
  // Hàm thêm sản phẩm mới
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      // Gửi request POST để thêm sản phẩm mới
      await axios.post(`${BASE_URL}/api/products`, formData);
      // Lấy lại danh sách sản phẩm sau khi thêm thành công
      await get().fetchProducts();
      // Reset form về trạng thái ban đầu
      get().resetForm();
      toast.success("Thêm sản phẩm thành công");
      // Đóng modal thêm sản phẩm
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Lỗi trong hàm addProduct", error);
      toast.error("Đã xảy ra lỗi");
    } finally {
      set({ loading: false });
    }
  },

  // State lưu trữ sản phẩm hiện tại đang được xem/chỉnh sửa
  currentProduct: null,

  // Hàm xóa sản phẩm theo ID
  deleteProduct: async (id) => {
    console.log("Hàm deleteProduct được gọi với ID:", id);
    set({ loading: true });
    try {
      // Gửi request DELETE để xóa sản phẩm
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      // Cập nhật danh sách sản phẩm bằng cách loại bỏ sản phẩm đã xóa
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.log("Lỗi trong hàm deleteProduct", error);
      toast.error("Đã xảy ra lỗi");
    } finally {
      set({ loading: false });
    }
  },

  // State lưu trữ lỗi nếu có
  error: null,

  // Hàm lấy thông tin chi tiết của một sản phẩm theo ID
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data,
        error: null,
        // Điền sẵn dữ liệu vào form để chỉnh sửa
        formData: response.data,
      });
    } catch (error) {
      console.log("Lỗi trong hàm fetchProduct", error);
      set({ currentProduct: null, error: "Đã xảy ra lỗi" });
    } finally {
      set({ loading: false });
    }
  },

  // Hàm lấy danh sách tất cả sản phẩm
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ error: null, products: response.data });
    } catch (err) {
      // Xử lý lỗi rate limit (quá nhiều request)
      if (err.status === 429)
        set({ error: "Vượt quá giới hạn yêu cầu", products: [] });
      else set({ error: "Đã xảy ra lỗi", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  // State quản lý dữ liệu form (tên, giá, hình ảnh)
  formData: {
    image: "",
    name: "",
    price: "",
  },

  // State quản lý trạng thái loading
  loading: false,
  // State lưu trữ danh sách sản phẩm
  products: [],

  // Hàm reset form về trạng thái ban đầu
  resetForm: () => set({ formData: { image: "", name: "", price: "" } }),

  // Hàm cập nhật dữ liệu form
  setFormData: (formData) => set({ formData }),

  // Hàm cập nhật thông tin sản phẩm theo ID
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      // Gửi request PUT để cập nhật sản phẩm
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData,
      );
      set({ currentProduct: response.data });
      // Lấy lại danh sách sản phẩm sau khi cập nhật thành công
      await get().fetchProducts();
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
      console.log("Lỗi trong hàm updateProduct", error);
    } finally {
      set({ loading: false });
    }
  },
}));
