import React, { useEffect, useState } from "react";
import VerticalProductCard from "~/components/product/verticalProduct";
import { Product } from "~/models/product";
// import VerticalProductCard from "./VerticalProductCard"; // Adjust the import path as necessary
// import { fetchProductsByStore } from "~/utils/api"; // Adjust the import path as necessary

interface MoreBySameSellerProps {
  product: Product;
}

const MoreBySameSeller: React.FC<MoreBySameSellerProps> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Product.fetchMany(product.store_id);
        const filteredProducts = fetchedProducts.filter(
          (p) => p.id !== product.id && p.type !== "post",
        );
        setProducts(filteredProducts);
      } catch (error) {
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [product.store_id, product.id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold">More by Same Seller</h2>
      <div className="h-96 bg-gray-50">
        <div className="flex space-x-1 overflow-x-auto p-2">
          {products.map((p) => (
            <div key={p.id} className="bg-white">
              <VerticalProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreBySameSeller;
