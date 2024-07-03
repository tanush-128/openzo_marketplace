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
  { title: 'Food delivery' },
  { title: 'Services' },
  { title: 'Stores' },
  { title: 'Grocery delivery' },
  { title: 'Service stores' },
  { title: 'Hotel rooms' },
  { title: 'Ride hire' },
];

const CategoryGrid: React.FC = () => {


  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <MainCategoryTile key={category.title} title={category.title} />
      ))}
      <Link href={"/category"}>
        <div
          className="flex flex-col items-center cursor-pointer"

        >
          <div className="w-16 h-16 p-2 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
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
          <p className="text-xs text-center mt-2">More</p>
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
      <div className="w-16 h-16 p-2 bg-white rounded-full">
        <img
          src={`/assets/images/home page icons/${title}.png`}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-xs text-center mt-2">{title}</p>
    </div>
  );
};