// "use client";

import StoreInfo from "../storeInfo";
import { Products } from "../products";
import SearchBar from "../search";
import { Product } from "~/models/product";
// import { useEffect, useState } from "react";

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

export default async function StorePage({
  params,
}: {
  params: { id: number };
}) {
  var storeId = params.id;
  var products: Product[] = await Product.fetchByStore(storeId);

  const categorizedProducts = categorizeProducts(products);

  return (
    <div>
      <div className="sticky top-0 bg-primary px-3 py-1">
        <SearchBar storeId={storeId} />
      </div>

      <StoreInfo storeId={storeId} />
      <Products categorizedProducts={categorizedProducts} />
    </div>
  );
}
