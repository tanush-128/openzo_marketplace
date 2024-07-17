// import { Store, StoreData } from "~/models/store";
// import { Heart } from "lucide-react";

// const StoreCard = ({ store }: { store: StoreData }) => {
//   // const handleFavoriteToggle = () => {
//   //   setIsFavourite(!isFavourite);
//   // };

//   return (
//     // href={`/store/${store.ID}`}
//     <div className="px-2">
//       <a href={`/store/${store.id}`}>
//         <div className="mx-auto my-8 w-full max-w-md cursor-pointer overflow-hidden rounded-lg shadow-lg">
//           <div
//             className="relative h-48 w-full bg-cover bg-center"
//             style={{ backgroundImage: `url(${store.image})` }}
//           >
//             <div className="m-2 max-w-min rounded bg-black bg-opacity-50 px-2 py-1 text-sm font-medium text-white">
//               {store.subCategory}
//             </div>

//             <div className="absolute right-2 top-2 flex items-center space-x-2">
//               {/* <div onClick={handleFavoriteToggle}>
//               {isFavourite ? (
//                 <Heart size={24} color="red" fill="red" />
//               ) : (
//                 <Heart size={24} color="white" />
//               )}
//             </div> */}
//             </div>
//           </div>
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <h3 className="truncate text-xl font-semibold text-gray-800">
//                 {store.name}
//               </h3>
//               <div className="flex items-center space-x-1">
//                 <div className="flex items-center space-x-1 rounded bg-amber-100 px-2 py-1">
//                   <span className="text-amber-600">⭐</span>
//                   <span className="text-sm font-medium text-gray-600">4.5</span>
//                 </div>
//               </div>
//             </div>
//             <p className="mt-2 text-gray-600">{store.description}</p>
//           </div>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default StoreCard;

// components/StoreCard.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
import { Store } from "~/models/store";
import GlobalConsts, { StoreType } from "../constants/constants";
// import { Store } from '~/models/store';

// export default StoreCard;

// app/components/StoreCard.tsx

import Image from "next/image";
import Link from "next/link";
// import GlobalConsts{  StoreType, Store } from '../constants/constants';

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const storeType =
    GlobalConsts.categories.find((category) => category.name === store.category)
      ?.type || StoreType.Store;

  return (
    <Link href={`/store/${store.id}`}>
      <div className="mx-1 my-3 cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={store.image}
            alt={store.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute left-2 top-2 flex items-center space-x-1 rounded-md bg-black bg-opacity-50 px-2 py-1 text-white">
            <p className="text-sm font-medium">{store.sub_category}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-lg  font-semibold text-black">
              {store.name}
            </div>
            <div className="flex items-center">
              <Rating rating={store.rating} />
              {storeType === StoreType.Food && (
                <>
                  {store.pure_veg ? (
                    <img
                      src="/assets/icons/veg.png"
                      alt="Veg"
                      className="ml-2 h-4 w-4 text-green-500"
                    />
                  ) : (
                    <div className="ml-2 flex space-x-1">
                      <img
                        src="/assets/icons/veg.png"
                        alt="Veg"
                        className="h-4 w-4 text-green-500"
                      />
                      <img
                        src="/assets/icons/non-veg.png"
                        alt="Non-Veg"
                        className="h-4 w-4 text-red-500"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {storeType === StoreType.Store && store.description}
          </p>
          {storeType === StoreType.Food && (
            <div className="flex justify-between text-sm text-gray-600">
              <p>{`• ${store.primary_cuisine} • ${store.secondary_cuisine}`}</p>
              <p>{`₹${store.avg_price_per_person} for one`}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1 rounded-md bg-yellow-100 px-2 py-1">
      <span className="text-sm font-medium text-gray-600">
        {" "}
        ⭐ {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StoreCard;
