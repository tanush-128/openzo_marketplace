import { GlobalConsts } from "~/constants/constants";

const MainCategories = () => {
  return (
    <div className="grid grid-cols-4 justify-center gap-2 px-6">
      <MainCategoryTile title="Order food" />
      <MainCategoryTile title="Ride Hail" />
      <MainCategoryTile title="Services" />
      <MainCategoryTile title="Stores" />
      <MainCategoryTile title="Rentals" />
      <MainCategoryTile title="Products" />
      <MainCategoryTile title="Resell" />
      <MainCategoryTile title="Local events" />
      <MainCategoryTile title="Hot deals" />
    </div>
  );
};

const MainCategoryTile = ({ title }: { title: string }) => {
  return (
    <div className="flex  flex-col items-center justify-center">
      <div className=" w-16 overflow-hidden rounded-full bg-white shadow-md">
        <img
          src={`/assets/images/top/${title}.png`}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-2 text-sm font-semibold">{title}</p>
    </div>
  );
};

export default MainCategories;
