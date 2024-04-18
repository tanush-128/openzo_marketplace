import { Store } from "~/models/store";
import StoreCard from "~/widgets/storeCard";

async function fetchStores() {
  const response = await Store.getStoresWithPincode("123456");
  return response;
}

export async function StoresList() {
  const stores = await fetchStores();
  return (
    <div className="p-2">
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </div>
  );
}
