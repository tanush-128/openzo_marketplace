"use client";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Store, StoreData } from "~/models/store";

interface StoreInfoProps {
  storeId: number;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ storeId }) => {
  // Dummy data for demonstration
  const [store, setStore] = useState<StoreData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await Store.fetchStore(storeId);
        setStore(response);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching store.");
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-white pt-2">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!store && <div>No store found</div>}
      {store && (
        <div>
          <div className="p-2">
            <img
              src={store.image}
              alt={store.name}
              // width={maxW}

              className="mx-auto rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-center text-3xl font-bold">{store.name}</h1>
            <p className="mt-1 text-center text-lg text-gray-600">
              {store.store_type}
            </p>
            <div className=" flex items-center justify-center">
              <div className="flex items-center">
                <div className="rounded-full bg-yellow-100 p-1">
                  <span className="text-amber-600">⭐</span>
                </div>
                <span className="ml-1">4.5</span>
              </div>
              <span className="ml-2 text-gray-600">(100 Reviews)</span>
            </div>
            <div className=" flex items-center justify-center">
              <div className="rounded-full bg-gray-100 p-2">
                {/* <img src="/icons/schedule.png" alt="Schedule" className="h-6 w-6" /> */}
                <Clock size={24} />
              </div>
              <span className="ml-2">
                {store.openingTime} - {store.closingTime}
              </span>
            </div>
            <div className=" rounded-lg bg-gradient-to-b from-yellow-300 via-transparent to-white p-4">
              <p className="text-center text-lg font-semibold text-black">
                {store.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInfo;
