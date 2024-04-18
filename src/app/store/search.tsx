"use client";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

import { Product } from "~/models/product";
import ProductCard from "~/widgets/productCard";
import MiniSearch from "minisearch";

const SearchBar = ({ storeId }: { storeId: number }) => {
  // var products: Product[] = await Product.fetchAll();
  // var products: Product[] = Product.fetchByStore(storeId);
  const [products, setProducts] = useState<Product[]>([]);
  Product.fetchByStore(storeId).then((products) => {
    setProducts(products);
  });
  const [query, setQuery] = useState("");

  const miniSearch = new MiniSearch({
    fields: ["name", "description", "category"],

    storeFields: ["name", "description", "id"],
  });

  miniSearch.addAll(products);

  const searchResults = miniSearch.search(query, {
    prefix: true,
    fuzzy: 0.2,
  });
  const filteredProducts = searchResults.map((result) =>
    products.find((product) => product.id === result.id),
  );

  return (
    <div className="mt-4 rounded-md bg-white">
      <div className="flex w-full gap-2 rounded-md border border-gray-300 p-2">
        <Search size={24} />
        <input
          type="text"
          placeholder="Search Products..."
          value={query}
          onChange={(e) => {
            document.body.scrollTo({
              top: 100,
              behavior: "smooth",
            });
            setQuery(e.target.value);
          }}
          className="w-full outline-none"
        />
        {query !== "" && (
          <span onClick={() => setQuery("")}>
            <X />
          </span>
        )}
      </div>
      <div className="mt-4">
        {filteredProducts.map(
          (product) =>
            product && <ProductCard key={product?.id} product={product} />,
        )}
      </div>
    </div>
  );
};

export default SearchBar;
