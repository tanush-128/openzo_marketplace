"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, StoreData } from "~/models/store";
import { Heart } from "lucide-react";

const StoreCard = ({ store }: { store: StoreData }) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavourite(!isFavourite);
  };

  const handleStoreClick = () => {
    router.push(`/store/${store.ID}`);
  };

  return (
    <div className="px-2">
      <div className="mx-auto my-8 w-full max-w-md cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <div
          onClick={handleStoreClick}
          className="relative h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${store.image})` }}
        >
          <div className="m-2 max-w-min rounded bg-black bg-opacity-50 px-2 py-1 text-sm font-medium text-white">
            {store.store_type}
          </div>

          <div className="absolute right-2 top-2 flex items-center space-x-2">
            <div onClick={handleFavoriteToggle}>
              {isFavourite ? (
                <Heart size={24} color="red" fill="red" />
              ) : (
                <Heart size={24} color="white" />
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-xl font-semibold text-gray-800">
              {store.name}
            </h3>
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1 rounded bg-amber-100 px-2 py-1">
                <span className="text-amber-600">⭐</span>
                <span className="text-sm font-medium text-gray-600">4.5</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-600">{store.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
