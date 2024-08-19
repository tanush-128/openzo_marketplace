import GlobalConsts, { StoreType } from "~/constants/constants";
import { Store } from "~/models/store";
import StoreCard from "~/widgets/storeCard";

async function fetchStores() {
  const response = await Store.getStoresWithPincode("123456");
  return response;
}

const getStoreType = (store: Store) => {
  return (
    GlobalConsts.categories.find((category) => category.name === store.category)
      ?.type || StoreType.Store
  );
};

export async function StoresList() {
  const stores: Store[] = await fetchStores();

  const foodStores: Store[] = stores.filter(
    (store) => getStoreType(store) === StoreType.Food,
  );

  const productsStores: Store[] = stores.filter(
    (store) => getStoreType(store) === StoreType.Store,
  );

  const serviceStores: Store[] = stores.filter(
    (store) => getStoreType(store) === StoreType.Service,
  );

  return (
    <div className="p-4">
      <Section title="Top places to find food" stores={foodStores} />
      <Section title="Top stores near you" stores={productsStores} />
      <Section title="Top services near you" stores={serviceStores} />
      <Section title="New Businesses near you" stores={stores} />
    </div>
  );
}

type SectionProps = {
  title: string;
  stores: Store[];
};

function Section({ title, stores }: SectionProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-lg font-bold">{title}</h2>
      <div className="no-scrollbar flex items-baseline space-x-4 overflow-x-auto">
        {stores.length > 0 ? (
          stores.map((store, index) => <StoreCard key={index} store={store} />)
        ) : (
          <p className="text-gray-500">No stores found</p>
        )}
      </div>
    </div>
  );
}
