import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Link, useResolvedPath } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

// Component Navbar hiển thị thanh điều hướng với logo và giỏ hàng
function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { products } = useProductStore();

  return (
    <div className="top-0 z-50 sticky bg-base-100/80 backdrop-blur-lg border-base-content/10 border-b">
      <div className="mx-auto max-w-7xl">
        <div className="justify-between px-4 min-h-[4rem] navbar">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link className="hover:opacity-80 transition-opacity" to="/">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary font-mono font-semibold text-transparent text-2xl tracking-widest">
                  POSGRESTORE
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {isHomePage && (
              <div className="indicator">
                <div className="hover:bg-base-200 p-2 rounded-full transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    {products?.length ?? 0}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
