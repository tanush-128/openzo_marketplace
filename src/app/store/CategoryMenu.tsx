import { Menu, X } from "lucide-react";
import { useState } from "react";

interface CategoryMenuProps {
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categories: { [key: string]: any[] };
  categoryMenuVisible: boolean;
  setCategoryMenuVisible: (visible: boolean) => void;
}

const CategoryMenuButton: React.FC<CategoryMenuProps> = ({
  categoryKeys,
  categories,
  categoryMenuVisible,
  setCategoryMenuVisible,
}) => {
  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key]?.current) {
      categoryKeys[key]?.current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 ">
      <div
        className="absolute bottom-0 right-0 m-4 cursor-pointer rounded-full bg-black p-2 shadow-lg"
        onClick={() => setCategoryMenuVisible(!categoryMenuVisible)}
      >
        <Menu size={24} color="white" />
      </div>
    </div>
  );
};

export default CategoryMenuButton;

export function CategoryMenu({
  categoryKeys,
  categories,
  categoryMenuVisible,
  setCategoryMenuVisible,
  handleScrollToCategory,
}: {
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categories: { [key: string]: any[] };
  categoryMenuVisible: boolean;
  setCategoryMenuVisible: (visible: boolean) => void;
  handleScrollToCategory: (key: string) => void;
}) {
  return (
    <div className="fixed bottom-10 right-6 z-50 w-3/4 rounded-lg bg-white shadow-lg">
      {categoryMenuVisible && (
        <div className="">
          <div className="  max-h-96  min-h-[150px] overflow-y-auto p-4 ">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                className="flex w-full cursor-pointer justify-between p-4"
                onClick={() => {
                  handleScrollToCategory(category);
                  setCategoryMenuVisible(false);
                }}
              >
                <span className="font-medium text-black">{category}</span>
                <span className="font-medium text-black">
                  {categories[category]?.length}
                </span>
              </button>
            ))}
          </div>
          <button
            className="absolute -right-2 -top-2"
            onClick={() => setCategoryMenuVisible(!categoryMenuVisible)}
          >
            <div className="rounded-full bg-black">
              <X size={18} color="white" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
