"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import MiniSearch from "minisearch";
import { Product } from "~/models/product";
import ProductCard from "~/components/product/productCard";

const SearchBar = ({ productsObj }: { productsObj: any }) => {
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
    <div className="w-full h-12">
      <div className="w-full h-full bg-gray-100 border border-gray-200 rounded-lg flex items-center px-2">
        {/* <Search size={24} />
         */}
        <img src="/assets/icons/search.png" alt="Search" className="w-6 h-6" />
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
          className="flex-grow bg-transparent outline-none px-2"
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
