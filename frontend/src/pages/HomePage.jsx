import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import AddProductModal from "../components/AddProductModal";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";

// Trang chủ quản lý sản phẩm (phiên bản tiếng Việt)
function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
          type="button"
        >
          <PlusCircleIcon className="mr-2 size-5" />
          Thêm sản phẩm
        </button>
        <button
          className="btn btn-ghost btn-circle"
          onClick={fetchProducts}
          type="button"
        >
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      {error && <div className="mb-8 alert alert-error">{error}</div>}

      {(products?.length === 0 || !products) && !loading && (
        <div className="flex flex-col justify-center items-center space-y-4 h-96">
          <div className="bg-base-100 p-6 rounded-full">
            <PackageIcon className="size-12" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-2xl">Không có sản phẩm nào</h3>
            <p className="max-w-sm text-gray-500">
              Hãy bắt đầu bằng cách thêm sản phẩm đầu tiên vào kho hàng của bạn
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(products ?? []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
export default HomePage;
