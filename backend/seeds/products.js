import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { sql } from "../config/db.js";

// Tải các biến môi trường từ file .env
dotenv.config();

// Kiểm tra xem file có được chạy trực tiếp không
const __filename = fileURLToPath(import.meta.url);
const isMainModule =
	process.argv[1] && path.resolve(process.argv[1]) === __filename;

// Mảng dữ liệu mẫu các sản phẩm để seed vào database
const sampleProducts = [
	{
		image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
		name: "iPhone 15 Pro Max",
		price: 29990000,
	},
	{
		image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
		name: "Samsung Galaxy S24 Ultra",
		price: 24990000,
	},
	{
		image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
		name: "MacBook Pro M3",
		price: 45990000,
	},
	{
		image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
		name: "iPad Air 2024",
		price: 15990000,
	},
	{
		image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500",
		name: "AirPods Pro 2",
		price: 5990000,
	},
	{
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
		name: "Sony WH-1000XM5",
		price: 8990000,
	},
	{
		image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
		name: "Apple Watch Series 9",
		price: 10990000,
	},
	{
		image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
		name: "Dell XPS 15",
		price: 38990000,
	},
	{
		image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
		name: "Logitech MX Master 3S",
		price: 2490000,
	},
	{
		image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
		name: "Keychron K8 Pro",
		price: 3290000,
	},
	{
		image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
		name: "Sony A7 IV",
		price: 59990000,
	},
	{
		image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
		name: "DJI Mini 4 Pro",
		price: 18990000,
	},
];

// Hàm seed dữ liệu vào bảng products
async function seedProducts() {
	try {
		console.log("Bắt đầu seed dữ liệu sản phẩm...");

		// Xóa toàn bộ dữ liệu cũ và reset ID về 1
		// RESTART IDENTITY đảm bảo ID bắt đầu lại từ 1 sau khi truncate
		await sql`truncate table public.products restart identity`;

		console.log("Đã xóa dữ liệu cũ, bắt đầu insert dữ liệu mới...");

		// Insert hàng loạt các sản phẩm vào database
		// Sử dụng Promise.all để insert song song nhiều sản phẩm (nhanh hơn for loop tuần tự)
		const insertPromises = sampleProducts.map(
			(product) =>
				sql`
        insert into public.products (name, price, image)
        values (${product.name}, ${product.price}, ${product.image})
        returning id, name
      `,
		);

		const results = await Promise.all(insertPromises);

		console.log(`✅ Đã seed thành công ${results.length} sản phẩm:`);
		results.forEach((result, index) => {
			console.log(`  ${index + 1}. ${result[0].name} (ID: ${result[0].id})`);
		});

		console.log("\n🎉 Hoàn tất seed dữ liệu!");
	} catch (error) {
		console.error("❌ Lỗi khi seed dữ liệu:", error);
		throw error;
	}
}

// Chạy hàm seed khi file được gọi trực tiếp (không phải import)
if (isMainModule) {
	seedProducts()
		.then(() => {
			console.log("Script seed đã hoàn thành.");
			process.exit(0);
		})
		.catch((error) => {
			console.error("Script seed thất bại:", error);
			process.exit(1);
		});
}

export default seedProducts;
