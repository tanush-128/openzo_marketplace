"use client";

import { useEffect, useState } from "react";
import { Store } from "~/models/store";
import StoreCard from "~/widgets/storeCard";

export function StoresList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await Store.getStoresWithPincode("123456");
        setStores(response);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching stores.");
        setLoading(false);
      }
    };

    fetchStores();
  }, []);
  return (
    <div className="p-2">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {stores.length === 0 && <div>No stores found</div>}
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </div>
  );
}
