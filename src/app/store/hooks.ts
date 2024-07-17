import { useState } from "react";

interface CategoryMenuProps {
  categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> };
  categories: { [key: string]: any[] };
}


const useCategoryMenu = (props: CategoryMenuProps) => {
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(true);
    
    const handleScrollToCategory = (key: string) => {
        if (props.categoryKeys[key].current) {
        props.categoryKeys[key].current!.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    return {
        categoryMenuVisible,
        setCategoryMenuVisible,
        handleScrollToCategory,
    };
    }

export default useCategoryMenu;

export type { CategoryMenuProps };