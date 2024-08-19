"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GlobalSearchBar from "~/components/search/globalSearchBar";
import GlobalConsts from "~/constants/constants";
import { Store } from "~/models/store";
import StoreCard from "~/widgets/storeCard";
import StoresByCategory from "../StoresByCategory";

const Page = ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const category = params.category.replace(/%20/g, " ");

  const searchParams = useSearchParams();
  const subCategory = searchParams.get("subCategory");

  if (category === "Grocery delivery" || category === "MIT Campus only") {
    // const stores: Store[] = [];
    const [stores, setStores] = useState<Store[]>([]);
    if (category === "MIT Campus only") {
      Store.getStoreByPincodeAndCategory("123456", "Food").then(
        (fetchedStores) => {
          fetchedStores = fetchedStores.filter(
            (store) =>
              store.primary_cuisine === "MIT Campus Only" ||
              store.secondary_cuisine === "MIT Campus Only",
          );
          setStores(fetchedStores);
        },
      );
    } else {
      Store.getStoresByPincodeAndSubCategory("123456", "Grocery stores").then(
        (fetchedStores) => {
          // stores.push(...fetchedStores);
          setStores(fetchedStores);
        },
      );
    }
    return (
      <div>
        <div className="sticky top-0 z-50  ">
          {/* <SearchBar /> */}
          <div className="w-full bg-white p-2 px-4 shadow-md">
            <GlobalSearchBar />
          </div>
        </div>
        <div className="p-2">
          {stores.map((store, index) => (
            <StoreCard key={index} store={store} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <StoresByCategory
      category={GlobalConsts.categories.find((cat) => cat.name === category)!}
      subCategory={GlobalConsts.categories
        .find((cat) => cat.name === category)!
        .subCategories.find((subCat) => subCat.name === subCategory)}
    />
  );
};

export default Page;
