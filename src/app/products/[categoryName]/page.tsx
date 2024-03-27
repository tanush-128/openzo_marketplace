"use client";
import React, { useState, useEffect } from "react";

import { StoreWithProduct } from "~/models/store_with_products";
import VerticalProductCard from "./verticalProductCard";
import Link from "next/link";

const ProductCategoryPage = ({
  params,
}: {
  params: {
    categoryName: string;
  };
}) => {
  const productCategoryName = decodeURIComponent(params.categoryName);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storeWithProducts, setStoreWithProducts] = useState<
    StoreWithProduct[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await StoreWithProduct.getStoresAndProductsByPincode(
          "123456",
          productCategoryName,
        );
        setStoreWithProducts(response);
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      }
    };

    if (productCategoryName) {
      fetchData();
      setLoading(false);
    }
  }, [productCategoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-semibold">{productCategoryName}</h1>
      <div className="">
        {storeWithProducts.map((storeWithProduct, index) => (
          <StoreWithProductsCard
            key={index}
            storeWithProduct={storeWithProduct}
          />
        ))}
      </div>
    </div>
  );
};

const StoreWithProductsCard = ({
  storeWithProduct,
}: {
  storeWithProduct: StoreWithProduct;
}) => {
  return (
    <Link href={`/store/${storeWithProduct.store.ID}`}>
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <img
          src={storeWithProduct.store.image}
          alt={storeWithProduct.store.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">
            {storeWithProduct.store.name}
          </h2>
          <h3 className="mb-4 text-base font-medium">Matching Products</h3>
          <div className="flex gap-4 overflow-x-auto">
            {storeWithProduct.products.map((product) => (
              <VerticalProductCard key={product.id} product={product} />
            ))}
            <VerticalProductCard
              key={storeWithProduct.products[0]!.id}
              product={storeWithProduct.products[0]!}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCategoryPage;
