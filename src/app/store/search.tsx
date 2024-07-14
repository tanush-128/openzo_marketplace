"use client";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import MiniSearch from "minisearch";
import { Product } from "~/models/product";
import ProductCard from "~/components/product/productCard";

const SearchBar = ({
  productsObj,
  onClose,
}: {
  productsObj: any;
  onClose: () => void;
}) => {
  // var products: Product[] = await Product.fetchAll();
  // var products: Product[] = Product.fetchByStore(storeId);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsObj.map((product: any) => Product.fromJson(product)));
  }, [productsObj]);

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
    <div className="h-12 w-full px-2">
      <div className="flex h-full w-full items-center rounded-lg border border-gray-200 bg-gray-100 px-2">
        <Search size={24} className="font-extrabold text-primary" />
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
          className="flex-grow bg-transparent px-2 outline-none"
        />
        {
          <span
            onClick={() => {
              setQuery("");
              onClose();
            }}
          >
            <X />
          </span>
        }
      </div>
      <div className="shadow-lg">
        {filteredProducts.map(
          (product) =>
            product && <ProductCard key={product?.id} product={product} />,
        )}
      </div>
    </div>
  );
};

export default SearchBar;
