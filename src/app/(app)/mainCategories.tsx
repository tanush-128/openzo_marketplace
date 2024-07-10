// import { GlobalConsts } from "~/constants/constants";

import Link from "next/link";

// const MainCategories = () => {
//   return (
//     <div className="grid grid-cols-4 justify-center gap-2 px-6">
//       <MainCategoryTile title="Order food" />
//       <MainCategoryTile title="Ride Hail" />
//       <MainCategoryTile title="Services" />
//       <MainCategoryTile title="Stores" />
//       <MainCategoryTile title="Rentals" />
//       <MainCategoryTile title="Products" />
//       <MainCategoryTile title="Resell" />
//       <MainCategoryTile title="Local events" />
//       <MainCategoryTile title="Hot deals" />
//     </div>
//   );
// };

// const MainCategoryTile = ({ title }: { title: string }) => {
//   return (
//     <div className="flex  flex-col items-center justify-center">
//       <div className=" w-16 overflow-hidden rounded-full bg-white shadow-md">
//         <img
//           src={`/assets/images/top/${title}.png`}
//           alt={title}
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <p className="mt-2 text-sm font-semibold">{title}</p>
//     </div>
//   );
// };

// export default MainCategories;

// import MainCategoryTile from './MainCategoryTile';

const categories = [
  { title: "Food delivery" },
  { title: "Service stores" },
  { title: "Stores" },
  { title: "Grocery delivery" },
  { title: "Services" },
  { title: "Hotel rooms" },
  { title: "Ride hire" },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 px-4">
      {categories.map((category) => (
        <MainCategoryTile key={category.title} title={category.title} />
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
}

const MainCategoryTile: React.FC<MainCategoryTileProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-14 w-14 rounded-full bg-white p-2">
        <img
          src={`/assets/images/home page icons/${title}.png`}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="mt-2 text-center text-xs">{title}</p>
    </div>
  );
};
