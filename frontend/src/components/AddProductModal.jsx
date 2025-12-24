import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

// Component modal để thêm sản phẩm mới (Tiếng Việt)
function AddProductModal() {
  // Lấy state và các hàm từ store
  const { addProduct, formData, setFormData, loading, resetForm } =
    useProductStore();

  // Hàm xử lý đóng modal và reset form khi hủy
  const handleClose = () => {
    resetForm();
  };

  return (
    <dialog className="modal" id="add_product_modal">
      <div className="modal-box">
        {/* Nút đóng modal */}
        <form method="dialog">
          <button
            className="top-2 right-2 absolute btn btn-sm btn-circle btn-ghost"
            type="button"
          >
            X
          </button>
        </form>

        {/* Tiêu đề modal */}
        <h3 className="mb-8 font-bold text-xl">Thêm sản phẩm mới</h3>

        <form className="space-y-6" onSubmit={addProduct}>
          <div className="gap-6 grid">
            {/* Input tên sản phẩm */}
            <div className="form-control">
              <label className="label" htmlFor="product-name">
                <span className="font-medium text-base label-text">
                  Tên sản phẩm
                </span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 text-base-content/50 pointer-events-none">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  className="py-3 pl-10 w-full transition-colors duration-200 input input-bordered focus:input-primary"
                  id="product-name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nhập tên sản phẩm"
                  type="text"
                  value={formData.name}
                />
              </div>
            </div>

            {/* Input giá sản phẩm */}
            <div className="form-control">
              <label className="label" htmlFor="product-price">
                <span className="font-medium text-base label-text">Giá</span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 text-base-content/50 pointer-events-none">
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  className="py-3 pl-10 w-full transition-colors duration-200 input input-bordered focus:input-primary"
                  id="product-price"
                  min="0"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                  value={formData.price}
                />
              </div>
            </div>

            {/* Input URL hình ảnh */}
            <div className="form-control">
              <label className="label" htmlFor="product-image">
                <span className="font-medium text-base label-text">
                  URL hình ảnh
                </span>
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 text-base-content/50 pointer-events-none">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  className="py-3 pl-10 w-full transition-colors duration-200 input input-bordered focus:input-primary"
                  id="product-image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  type="text"
                  value={formData.image}
                />
              </div>
            </div>
          </div>

          {/* Các nút hành động */}
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => {
                handleClose();
                document.getElementById("add_product_modal").close();
              }}
              type="button"
            >
              Huỷ
            </button>
            <button
              className="min-w-[120px] btn btn-primary"
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="mr-2 size-5" />
                  Thêm sản phẩm
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop để đóng modal khi click ra ngoài */}
      <form className="modal-backdrop" method="dialog">
        <button onClick={handleClose} type="button">
          Đóng
        </button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
