import { Clock } from "lucide-react";
import Image from "next/image";

import { Store, StoreData } from "~/models/store";

// components/StoreDetails.tsx
import { useState, useEffect } from 'react';


import { Rating } from './Rating'; // Assuming you have a Rating component
// import {'; // Assuming you have a skeleton loader component
import 'tailwindcss/tailwind.css';
import { StoreDetailsSkeleton } from "./StoreDetailsSkeleton";
import GlobalConsts, { StoreType } from "~/constants/constants";
// interface StoreInfoProps {
//   storeId: string;
// }

// const StoreInfo: React.FC<StoreInfoProps> = async ({ storeId }) => {

//   const store = await Store.fetchStore(storeId);


//   return (
//     <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-white pt-2">
//       {!store && <div>No store found</div>}
//       {store && (
//         <div>
//           <div className="p-2">
//             <img
//               src={store.image}
//               alt={store.name}
//               // width={maxW}

//               className="mx-auto rounded-lg"
//             />
//           </div>
//           <div>
//             <h1 className="text-center text-3xl font-bold">{store.name}</h1>
//             <p className="mt-1 text-center text-lg text-gray-600">
//               {store.subCategory}
//             </p>
//             <div className=" flex items-center justify-center">
//               <div className="flex items-center">
//                 <div className="rounded-full bg-yellow-100 p-1">
//                   <span className="text-amber-600">⭐</span>
//                 </div>
//                 <span className="ml-1">4.5</span>
//               </div>
//               <span className="ml-2 text-gray-600">(100 Reviews)</span>
//             </div>
//             <div className=" flex items-center justify-center">
//               <div className="rounded-full bg-gray-100 p-2">
//                 {/* <img src="/icons/schedule.png" alt="Schedule" className="h-6 w-6" /> */}
//                 <Clock size={24} />
//               </div>
//               <span className="ml-2">
//                 {store.openingTime} - {store.closingTime}
//               </span>
//             </div>
//             <div className=" rounded-lg bg-gradient-to-b from-yellow-300 via-transparent to-white p-4">
//               <p className="text-center text-lg font-semibold text-black">
//                 {store.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreInfo;





type StoreDetailsProps = {
  storeId: string;
};

const StoreDetails: React.FC<StoreDetailsProps> = ({ storeId }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storeType, setStoreType] = useState<StoreType>(StoreType.Store);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await Store.fetchStore(storeId);
        setStore(storeData);
        setStoreType(GlobalConsts.categories.find((category) => category.name === storeData.category)?.type || StoreType.Store);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);


  if (loading) {
    return <StoreDetailsSkeleton />;
  }

  if (error || !store) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[100vw] relative overflow-hidden rounded-b-lg">
        <Image
          src={store.image}
          alt={store.name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute bottom-3 right-3 shadow-md rounded-md bg-white p-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Rating rating={store.rating} />
              <span className="ml-1 text-black text-sm">({store.reviewCount} Reviews)</span>
            </div>
            <div className="mt-1 px-3 py-1 bg-gray-100 rounded-full flex items-center">
              <Image src="/assets/icons/schedule.png" width={20} height={20} alt="Schedule" />
              <span className="ml-1 text-black text-sm">
                {store.openingTime} - {store.closingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 w-full">
        {storeType === StoreType.Food ? (
          <div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">{store.name}</span>
              <span className="text-gray-500">{store.subCategory}</span>
            </div>
            <div className="flex justify-between items-end">
              {store.pureVeg ? (
                <Image src="/assets/icons/veg.png" width={24} height={24} alt="Veg" className="text-green-500" />
              ) : (
                <div className="flex">
                  <Image src="/assets/icons/veg.png" width={24} height={24} alt="Veg" className="text-green-500" />
                  <Image src="/assets/icons/non-veg.png" width={24} height={24} alt="Non-Veg" className="text-red-500" />
                </div>
              )}
              <div className="flex space-x-2 text-gray-500">
                <span>• {store.primaryCuisine} • {store.secondaryCuisine}</span>
                <span>₹{store.avgPricePerPerson} for one</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xl font-bold text-center">{store.name}</div>
            <div className="text-gray-500 text-center">{store.subCategory}</div>
          </div>
        )}
      </div>

      <div className="my-2 px-3 py-4 w-full bg-gradient-to-b from-yellow-200 to-white rounded-t-lg">
        <p className="text-center text-black font-semibold">{store.description}</p>
      </div>
    </div>
  );
};

export default StoreDetails;
