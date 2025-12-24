import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

// Component hiển thị thông tin sản phẩm dưới dạng card
function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();

  const handleDelete = async () => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" không?`,
      )
    ) {
      await deleteProduct(product.id);
    }
  };

  return (
    <div className="bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 card">
      {/* Hình ảnh sản phẩm */}
      <figure className="relative pt-[56.25%]">
        <img
          alt={product.name}
          className="top-0 left-0 absolute w-full h-full object-cover"
          src={product.image}
        />
      </figure>

      <div className="card-body">
        {/* Thông tin sản phẩm */}
        <h2 className="font-semibold text-lg card-title">{product.name}</h2>
        <p className="font-bold text-primary text-2xl">
          {Number(product.price).toLocaleString("vi-VN")} ₫
        </p>

        {/* Các hành động trên card */}
        <div className="justify-end mt-4 card-actions">
          <Link
            className="btn-outline btn btn-sm btn-info"
            to={`/product/${product.id}`}
          >
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn-outline btn btn-sm btn-error"
            onClick={handleDelete}
            type="button"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
