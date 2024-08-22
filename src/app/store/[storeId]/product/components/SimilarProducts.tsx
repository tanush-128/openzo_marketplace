import React, { useEffect, useState } from "react";
import VerticalProductCard from "~/components/product/verticalProduct";
import { Product } from "~/models/product";

interface SimilarProductsProps {
  product: Product;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const fetchedProducts = await Product.searchProducts(
          "576104",
          product.name,
        );

        setProducts(
          fetchedProducts.filter(
            (p) => p.id !== product.id && p.type !== "post",
          ),
        );
      } catch (error) {
        setError("An error occurred while searching for similar products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [product.name, product.id]);

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
      <h2 className="mb-4 text-xl font-semibold">Similar Products</h2>
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

export default SimilarProducts;
