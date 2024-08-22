import { useState, useEffect, Suspense } from "react";
import GlobalSearchBar from "~/components/search/globalSearchBar";
import SubcategoryListTile from "./SubcategoryListTile";
import { Category, SubCategory } from "~/constants/constants";

import { Store } from "~/models/store";
import StoreCard from "~/widgets/storeCard";

interface StoresByCategoryProps {
  category: Category;
  subCategory?: SubCategory;
  showSubCategories?: boolean;
  deliveryOnly?: boolean;
}

const StoresByCategory: React.FC<StoresByCategoryProps> = ({
  category,
  subCategory: initialSubCategory,
  showSubCategories = true,
  deliveryOnly = false,
}) => {
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>(
    initialSubCategory,
  );
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    category.subCategories,
  );

  useEffect(() => {
    if (initialSubCategory) {
      setSubCategories((prevSubCategories) => {
        const updatedSubCategories = prevSubCategories.filter(
          (subCat) => subCat !== initialSubCategory,
        );
        updatedSubCategories.unshift(initialSubCategory);
        return updatedSubCategories;
      });
    }
  }, [initialSubCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky  bg-white px-4 py-2 shadow">
        <GlobalSearchBar />
      </header>
      {showSubCategories && (
        <div className="sticky top-0 z-50 bg-white px-4 py-2 shadow">
          <div className="flex space-x-4 overflow-x-auto overflow-y-hidden">
            {subCategories.map((e) => (
              <SubcategoryListTile
                key={e.name}
                e={e}
                category={category}
                active={e === subCategory}
                setSelectedCategory={setSubCategory}
              />
            ))}
          </div>
        </div>
      )}
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <StoresList
            subCategory={subCategory?.name}
            category={category.name}
            //   pincode="576104"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StoresByCategory;

async function StoresList({
  category,
  subCategory,
}: {
  category: string;
  subCategory?: string;
}) {
  // const stores = await Store.getStoreByPincodeAndCategory("576104", category);
  let stores;

  if (subCategory) {
    stores = await Store.getStoresByPincodeAndSubCategory(
      "576104",
      subCategory,
    );
  } else {
    stores = await Store.getStoreByPincodeAndCategory("576104", category);
  }

  return (
    <div className="p-2">
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </div>
  );
}
