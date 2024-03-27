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
  const [storeWithProducts, setStoreWithProducts] = useState<
    StoreWithProduct[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StoreWithProduct.getStoresAndProductsByPincode(
          "123456",
          productCategoryName,
        );
        setStoreWithProducts(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productCategoryName) {
      fetchData();
    }
  }, [productCategoryName]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-semibold">{productCategoryName}</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {storeWithProduct.products.map((product) => (
              <VerticalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCategoryPage;
