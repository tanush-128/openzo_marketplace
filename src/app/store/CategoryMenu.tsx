import { Menu, X } from "lucide-react";
import { useCategoryContext } from "./CategoryContext";

const CategoryMenuButton = () => {
  const {
    categories,
    setCategories,
    setCategoryKeys,
    setCategoryMenuVisible,
    categoryMenuVisible,
    categoryKeys,
  } = useCategoryContext();

  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key]?.current) {
      categoryKeys[key]?.current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 mr-2 ">
      <div
        className="absolute bottom-0 right-0 m-1 cursor-pointer rounded-full bg-black p-2 shadow-lg"
        onClick={() => setCategoryMenuVisible(!categoryMenuVisible)}
      >
        <Menu size={24} color="white" />
      </div>
    </div>
  );
};

export default CategoryMenuButton;

export function HorizontalCategoryMenu() {
  const {
    categories,
    setCategories,
    setCategoryKeys,
    setCategoryMenuVisible,
    categoryMenuVisible,
    categoryKeys,
  } = useCategoryContext();

  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key]?.current) {
      categoryKeys[key]?.current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-20 w-full overflow-x-auto whitespace-nowrap bg-white py-0 shadow-md">
      <div className="flex justify-between">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className="cursor-pointer px-4 py-2 "
            onClick={() => {
              handleScrollToCategory(category);
            }}
          >
            <div className="mx-auto h-10 w-10 rounded-full bg-gray-300"></div>
            <span className="font-medium text-black">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryMenu() {
  const {
    categories,
    setCategories,
    setCategoryKeys,
    setCategoryMenuVisible,
    categoryMenuVisible,
    categoryKeys,
  } = useCategoryContext();
  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key]?.current) {
      categoryKeys[key]?.current!.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 w-3/4 rounded-lg bg-white shadow-lg">
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
