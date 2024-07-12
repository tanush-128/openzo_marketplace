"use client";
import React, { useState, useEffect } from "react";
import FilterChip from "./FilterChipWidget";
import ServiceCard from "../product/ServiceCard";
import ProductCard from "../product/productCard";
import { Store } from "~/models/store";
import { Product } from "~/models/product";
import StoreCard from "~/widgets/storeCard";

interface SearchResultsPageProps {
  stores: Store[];
  products: Product[];
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  stores,
  products,
}) => {
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterType, setFilterType] = useState<string>("");

  useEffect(() => {
    setFilteredStores(stores);
    setFilteredProducts(products);
  }, [stores, products]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex overflow-x-auto p-4">
        <FilterChip
          label="Stores"
          onClick={() => {
            setFilteredStores(stores);
            setFilteredProducts([]);
            setFilterType("store");
          }}
          isSelected={filterType === "store"}
        />
        <FilterChip
          label="Products"
          onClick={() => {
            setFilteredStores([]);
            setFilteredProducts(
              products.filter((product) => product.type === "product"),
            );
            setFilterType("product");
          }}
          isSelected={filterType === "product"}
        />
        <FilterChip
          label="Food"
          onClick={() => {
            setFilteredStores([]);
            setFilteredProducts(
              products.filter((product) => product.type === "food"),
            );
            setFilterType("food");
          }}
          isSelected={filterType === "food"}
        />
        <FilterChip
          label="Posts"
          onClick={() => {
            setFilteredStores([]);
            setFilteredProducts(
              products.filter((product) => product.type === "post"),
            );
            setFilterType("post");
          }}
          isSelected={filterType === "post"}
        />
        <FilterChip
          label="Services"
          onClick={() => {
            setFilteredStores([]);
            setFilteredProducts(
              products.filter((product) => product.type === "service"),
            );
            setFilterType("service");
          }}
          isSelected={filterType === "service"}
        />
      </div>
      <div className="flex-1 overflow-auto p-4">
        {filteredProducts.map((product) =>
          product.type === "post" ? (
            <div key={product.id} className="mb-4">
              {/* <PostCard product={product} /> */}
              <ServiceCard key={product.id} product={product} />
            </div>
          ) : product.type === "service" ? (
            <ServiceCard key={product.id} product={product} />
          ) : (
            <div key={product.id} className="mb-4">
              <ProductCard product={product} />
            </div>
          ),
        )}
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
