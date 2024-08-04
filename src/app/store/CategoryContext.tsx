// src/contexts/CategoryContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "~/models/product";
import { CategorizedProducts } from "./[storeId]/page";

interface CategoryContextType {
  categories: CategorizedProducts;
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categoryMenuVisible : boolean;
  setCategories: (categories: CategorizedProducts) => void;
  setCategoryKeys: (categoryKeys: {
    [key: string]: React.RefObject<HTMLDivElement>;
  }) => void;
    setCategoryMenuVisible: (categoryMenuVisible: boolean) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider",
    );
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategorizedProducts>({});
    const [categoryKeys, setCategoryKeys] = useState<{
        [key: string]: React.RefObject<HTMLDivElement>;
    }>({});
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  return (
    <CategoryContext.Provider value={{ categories, setCategories, 
    categoryKeys, setCategoryKeys, categoryMenuVisible, setCategoryMenuVisible
     }}>
      {children}
    </CategoryContext.Provider>
  );
};
