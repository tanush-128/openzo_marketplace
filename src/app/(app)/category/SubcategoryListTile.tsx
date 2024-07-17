import { Category, SubCategory } from "~/constants/constants";

interface SubcategoryListTileProps {
  e: SubCategory;
  category: Category;
  active: boolean;
  setSelectedCategory: (subCategory: SubCategory) => void;
}

const SubcategoryListTile: React.FC<SubcategoryListTileProps> = ({
  e,
  category,
  active,
  setSelectedCategory,
}) => {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center ${active ? "text-primary" : "text-black"}`}
      onClick={() => setSelectedCategory(e)}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100     ${active ? "ring-2 ring-primary" : ""}`}
      >
        <img
          src={`/assets/images/Categories page/${category.name}/${e.name}.png`}
          alt={e.name}
          className=" h-9 w-9"
        />
      </div>
      <span className="line-clamp-2 text-center text-xs font-semibold text-black">
        {e.name}
      </span>
    </div>
  );
};

export default SubcategoryListTile;
