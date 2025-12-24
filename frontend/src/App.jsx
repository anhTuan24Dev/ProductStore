import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="bg-base-200 min-h-screen transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProductPage />} path="/product/:id" />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
