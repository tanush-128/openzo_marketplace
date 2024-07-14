"use client";
import Image from "next/image";

import { Store } from "~/models/store";

// components/StoreDetails.tsx

import { Rating } from "./Rating"; // Assuming you have a Rating component
// import {'; // Assuming you have a skeleton loader component
import { StoreType } from "~/constants/constants";
import { StoreDetailsSkeleton } from "./StoreDetailsSkeleton";

type StoreDetailsProps = {
  // storeId: string;
  store: Store | null;
  storeType: StoreType;
};

const StoreDetails: React.FC<StoreDetailsProps> = ({ store, storeType }) => {
  if (!store) {
    return <StoreDetailsSkeleton />;
  }

  return (
    <div className={"flex w-full flex-col items-center font-sans "}>
      <div className="relative h-[100vw] max-h-72 w-full overflow-hidden rounded-b-lg">
        <Image
          src={store.image}
          alt={store.name}
          layout="fill"
          objectFit="cover"
          className="object-contain"
        />
        <div className="absolute bottom-3 right-3 rounded-md bg-white p-3 shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Rating rating={store.rating} />
              <span className="ml-1 text-sm text-black">
                ({store.review_count} Reviews)
              </span>
            </div>
            <div className="mt-1 flex items-center rounded-full bg-gray-100 px-3 py-1">
              <Image
                src="/assets/icons/schedule.png"
                width={20}
                height={20}
                alt="Schedule"
              />
              <span className="ml-1 text-sm text-black">
                {store.openingTime} - {store.closingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-3">
        {storeType === StoreType.Food ? (
          <div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">{store.name}</span>
              <span className="text-gray-500">{store.sub_category}</span>
            </div>
            <div className="flex items-end justify-between">
              {store.pure_veg ? (
                <Image
                  src="/assets/icons/veg.png"
                  width={24}
                  height={24}
                  alt="Veg"
                  className="text-green-500 "
                />
              ) : (
                <div className="flex">
                  <Image
                    src="/assets/icons/veg.png"
                    width={24}
                    height={24}
                    alt="Veg"
                    className="text-green-500"
                  />
                  <Image
                    src="/assets/icons/non-veg.png"
                    width={24}
                    height={24}
                    alt="Non-Veg"
                    className="text-red-500"
                  />
                </div>
              )}
              <div className="flex space-x-2 text-gray-500">
                <span>
                  • {store.primary_cuisine} • {store.secondary_cuisine}
                </span>
                <span>₹{store.avg_price_per_person} for one</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center text-xl font-bold">{store.name}</div>
            <div className="text-center text-gray-500">
              {store.sub_category}
            </div>
          </div>
        )}
      </div>

      <div className="my-2 w-full rounded-t-lg bg-gradient-to-b from-yellow-200 to-white px-3 py-4">
        <p className="text-center font-semibold text-black">
          {store.description}
        </p>
      </div>
    </div>
  );
};

export default StoreDetails;
