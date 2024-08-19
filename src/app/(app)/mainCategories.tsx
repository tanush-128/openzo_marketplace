// import { GlobalConsts } from "~/constants/constants";

import Link from "next/link";

const categories = [
  { title: "Food delivery", link: "/category/Food" },
  { title: "Service stores", link: "/category/Services" },
  { title: "Stores", link: "/category/Stores" },
  { title: "Grocery delivery", link: "/category/Grocery delivery" },
  { title: "Services", link: "/category/Home Services" },
  // MainCategoryTile(title: 'MIT Campus only', route: '/campus-only'),
  {
    title: "MIT Campus only",
    link: "/category/MIT Campus only",
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2 px-4 text-black">
      {categories.map((category) => (
        <MainCategoryTile
          key={category.title}
          title={category.title}
          link={category.link}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;

interface MainCategoryTileProps {
  title: string;
  link?: string;
}

const MainCategoryTile: React.FC<MainCategoryTileProps> = ({ title, link }) => {
  return (
    <Link href={link ?? "#"} className="flex flex-col items-center">
      <div className="max-h-28 max-w-28 rounded-full bg-white p-2">
        <img
          src={`/assets/images/home page icons/${title}.png`}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      {/* <p className="mt-2 text-center text-xs text-black">{title}</p> */}
    </Link>
  );
};
