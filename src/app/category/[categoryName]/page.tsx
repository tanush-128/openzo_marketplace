"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GlobalConsts, ProductCategory } from "~/constants/constants";
import { Ad } from "~/models/ad";
import { Store } from "~/models/store";
import AdSpace from "~/widgets/adCarousel";
import Separator from "~/widgets/separator";
import StoreCard from "~/widgets/storeCard";

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
  params.categoryName = decodeURIComponent(params.categoryName);
  var storeCategory = GlobalConsts.StoreCategories.find(
    (storeCategory) => storeCategory.categoryName === params.categoryName,
  );
  if (!storeCategory) {
    return (
      <div>
        Category
        {params.categoryName} not found
      </div>
    );
  }
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        if (storeCategory) {
          const response = await Store.getStoreByPincodeAndCategory(
            "123456",
            storeCategory.storeType.toString(),
          );
          setStores(response);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-gray-800">
        {storeCategory.categoryName}
      </h1>
      <AdSpace />
      <Separator title="Categories" />
      <div className="h-4" />
      <div className="flex gap-0 overflow-x-auto">
        {storeCategory.productCategories.map(
          (e) =>
            storeCategory && (
              <ProductCategoryTile
                e={e}
                categoryName={storeCategory.categoryName}
              />
            ),
        )}
      </div>
      <Separator title="Stores" />
      <div className="h-4" />
      {loading && <div>Loading...</div>}
      {error && <div>Error: An error occurred while fetching stores.</div>}
      {stores.length === 0 && <div>No stores found</div>}
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </div>
  );
};

const ProductCategoryTile = ({
  e,
  categoryName,
}: {
  e: ProductCategory;
  categoryName: string;
}) => {
  const handleClick = () => {
    // Handle click event
    // You can implement navigation logic here
  };

  return (
    <Link href={"/products/" + e.categoryName}>
      <div className="mb-4 h-32 w-24 cursor-pointer">
        <div className="h-32 w-24  ">
          <div className="mx-auto mb-2 h-16 w-16 overflow-hidden rounded-lg bg-white shadow-md">
            <img
              src={`/assets/images/${categoryName}/${e.image}.png`}
              alt={e.categoryName}
              className="mx-auto  object-contain"
            />
          </div>
          <p className="text-center text-sm font-light text-gray-500">
            {e.categoryName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryPage;
