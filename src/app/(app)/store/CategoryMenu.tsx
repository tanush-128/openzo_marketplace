import { Menu } from "lucide-react";
import { useState } from "react";
import { animated } from "react-spring";

interface CategoryMenuProps {
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categories: { [key: string]: any[] };
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categoryKeys,
  categories,
}) => {
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(true);

  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key].current) {
      categoryKeys[key].current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-12 right-0 z-50">
      {categoryMenuVisible && (
        <div className="absolute bottom-16 right-6 max-h-96 min-h-[150px] w-3/4 overflow-auto rounded-lg bg-white shadow-lg">
          <div className="p-4">
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className="flex cursor-pointer justify-between p-4"
                onClick={() => handleScrollToCategory(category)}
              >
                <span className="font-medium text-black">{category}</span>
                <span className="font-medium text-black">
                  {categories[category].length}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className="absolute bottom-0 right-0 m-4 cursor-pointer rounded-full bg-black p-2 shadow-lg"
        onClick={() => setCategoryMenuVisible(!categoryMenuVisible)}
      >
        {/* <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg> */}
        <Menu size={24} color="red" />
      </div>
    </div>
  );
};

export default CategoryMenu;
