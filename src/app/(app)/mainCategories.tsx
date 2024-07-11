// import { GlobalConsts } from "~/constants/constants";

import Link from "next/link";

const categories = [
  { title: "Food delivery", link: "/category/Food" },
  { title: "Service stores", link: "/category/Services" },
  { title: "Stores", link: "/category/Stores" },
  { title: "Grocery delivery" },
  { title: "Services", link: "/category/Home Services" },
  { title: "Hotel rooms" },
  { title: "Ride hire" },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 px-4">
      {categories.map((category) => (
        <MainCategoryTile
          key={category.title}
          title={category.title}
          link={category.link}
        />
      ))}
      <Link href={"/category"}>
        <div className="flex cursor-pointer flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-2">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </div>
          <p className="mt-2 text-center text-xs">More</p>
        </div>
      </Link>
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
      <div className="h-14 w-14 rounded-full bg-white p-2">
        <img
          src={`/assets/images/home page icons/${title}.png`}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="mt-2 text-center text-xs">{title}</p>
    </Link>
  );
};
