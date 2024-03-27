"use client";

import StoreInfo from "../storeInfo";
import { Products } from "../products";
import SearchBar from "../search";
import { Product } from "~/models/product";
import { useEffect, useState } from "react";

interface CategorizedProducts {
  [category: string]: Product[];
}

export type { CategorizedProducts };

function categorizeProducts(products: Product[]): CategorizedProducts {
  const categories: CategorizedProducts = {};

  for (const product of products) {
    if (categories[product.category]) {
      categories[product.category]?.push(product);
    } else {
      categories[product.category] = [product];
    }
  }

  return categories;
}

export default function StorePage({ params }: { params: { id: number } }) {
  var storeId = params.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categorizedProducts, setCategorizedProducts] =
    useState<CategorizedProducts>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Product.fetchByStore(storeId);

        setProducts(response);
        setCategorizedProducts(categorizeProducts(response));
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching products.");
        setLoading(false);
      }
    };

    fetchProducts();
    categorizeProducts(products);
  }, []);

  return (
    <div>
      <div className="sticky top-0 bg-primary px-3 py-1">
        <SearchBar products={products} />
      </div>

      <StoreInfo storeId={storeId} />
      <Products categorizedProducts={categorizedProducts} />
    </div>
  );
}
