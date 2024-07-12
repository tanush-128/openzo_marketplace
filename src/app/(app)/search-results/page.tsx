"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchResultsPage from "~/components/search/SearchResultsPage";
import { Product } from "~/models/product";
import { Store } from "~/models/store";
const SearchPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  if (!query) {
    return <div className="p-4 text-center">No search query provided</div>;
  }

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const productsResult = await Product.searchProducts("123456", query); // Replace with actual API call
      const storesResult = await Store.searchStores("123456", query); // Replace with actual API call
      setProducts(productsResult);
      setStores(storesResult);
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!products.length && !stores.length) {
    return <div className="p-4 text-center">No results found</div>;
  }

  return <SearchResultsPage products={products} stores={stores} />;
};

const SearchPageWithSuspense = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </React.Suspense>
  );
};

export default SearchPageWithSuspense;
