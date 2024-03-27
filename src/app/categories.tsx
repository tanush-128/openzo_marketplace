import Link from "next/link";
import { GlobalConsts, StoreCategory } from "~/constants/constants";

const StoreCategories = () => {
  return (
    <div className="h-40 overflow-x-auto">
      <div className="mt-2 flex gap-4 px-4">
        {GlobalConsts.StoreCategories.map((storeCategory) => (
          <StoreCategoryTile
            key={storeCategory.categoryName}
            storeCategory={storeCategory}
          />
        ))}
      </div>
    </div>
  );
};

const StoreCategoryTile = ({
  storeCategory,
}: {
  storeCategory: StoreCategory;
}) => {
  return (
    <Link href={`/category/${storeCategory.categoryName}`}>
      <div className="block h-24 w-20">
        <div className="mx-auto mb-2 overflow-hidden rounded-md shadow-md">
          <img
            src={`/assets/images/${storeCategory.imageName}`}
            alt={storeCategory.categoryName}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-center text-sm font-medium text-gray-700">
          {storeCategory.categoryName}
        </p>
      </div>
    </Link>
  );
};

export default StoreCategories;
