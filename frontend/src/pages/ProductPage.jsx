import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

// Trang chi tiết/chỉnh sửa sản phẩm (Tiếng Việt)
function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl container">
      <button
        className="mb-8 btn btn-ghost"
        onClick={() => navigate("/")}
        type="button"
      >
        <ArrowLeftIcon className="mr-2 size-4" />
        Quay lại danh sách sản phẩm
      </button>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* Hình ảnh sản phẩm */}
        <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden">
          <img
            alt={currentProduct?.name}
            className="size-full object-cover"
            src={currentProduct?.image}
          />
        </div>

        {/* Form chỉnh sửa sản phẩm */}
        <div className="bg-base-100 shadow-lg card">
          <div className="card-body">
            <h2 className="mb-6 text-2xl card-title">Chỉnh sửa sản phẩm</h2>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
            >
              {/* Tên sản phẩm */}
              <div className="form-control">
                <label className="label" htmlFor="product-name-edit">
                  <span className="font-medium text-base label-text">
                    Tên sản phẩm
                  </span>
                </label>
                <input
                  className="w-full input input-bordered"
                  id="product-name-edit"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nhập tên sản phẩm"
                  type="text"
                  value={formData.name}
                />
              </div>

              {/* Giá sản phẩm */}
              <div className="form-control">
                <label className="label" htmlFor="product-price-edit">
                  <span className="font-medium text-base label-text">
                    Giá (VNĐ)
                  </span>
                </label>
                <input
                  className="w-full input input-bordered"
                  id="product-price-edit"
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

              {/* Đường dẫn hình ảnh sản phẩm */}
              <div className="form-control">
                <label className="label" htmlFor="product-image-edit">
                  <span className="font-medium text-base label-text">
                    Link hình ảnh
                  </span>
                </label>
                <input
                  className="w-full input input-bordered"
                  id="product-image-edit"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  type="text"
                  value={formData.image}
                />
              </div>

              {/* Nút hành động */}
              <div className="flex justify-between mt-8">
                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                  type="button"
                >
                  <Trash2Icon className="mr-2 size-4" />
                  Xoá sản phẩm
                </button>

                <button
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                  type="submit"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="mr-2 size-4" />
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
