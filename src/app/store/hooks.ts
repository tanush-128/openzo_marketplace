import { useState } from "react";
import { Category } from "~/constants/constants";

interface CategoryMenuProps {
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categories: { [key: string]: any[] };
}

const useCategoryMenu = (props: CategoryMenuProps) => {
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  const [categories, setCategories] = useState(props.categories);
  const [categoryKeys, setCategoryKeys] = useState(props.categoryKeys);

  const handleScrollToCategory = (key: string) => {
    if (categoryKeys[key]?.current) {
      categoryKeys[key]?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setCategoriesAndKeys = (categoryMenuProps: CategoryMenuProps) => {
    setCategories(categoryMenuProps.categories);
    setCategoryKeys(categoryMenuProps.categoryKeys);
  };

  return {
    categories,
    categoryKeys,
    categoryMenuVisible,
    setCategoriesAndKeys,
    setCategoryMenuVisible,
    handleScrollToCategory,
  };
};

export default useCategoryMenu;

export type { CategoryMenuProps };
