"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sale from "~/models/sale";
import { Store } from "~/models/store";
import useSalesStore from "~/providers/salesStore";

interface CartListProps {
  status: "not_placed" | "placed" | "delivered";
}

const CartsPage = () => {
  const tabs = [
    { name: "Pending", status: "not_placed" },
    { name: "Placed", status: "placed" },
    { name: "Delivered", status: "delivered" },
  ] as const;
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["status"]>("not_placed");

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Carts</h1>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveTab(tab.status)}
              className={`rounded-t-lg border-b-2 px-3 py-2 text-sm font-medium ${
                activeTab === tab.status
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        <CartList status={activeTab} />
      </div>
    </div>
  );
};

export default CartsPage;

const CartList = ({ status }: CartListProps) => {
  const fetchOrders = useSalesStore((state) => state.fetchOrders);
  const carts = useSalesStore((state) => state.onlineOrders);
  const fetching = useSalesStore((state) => state.fetching);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  if (fetching) return <div>Loading...</div>;

  const filteredCarts = carts.filter((cart) => cart.status === status);

  return (
    <div className="">
      {filteredCarts.map((cart) => (
        <CartListTile key={cart.id} cart={cart} />
      ))}
      {filteredCarts.length === 0 && (
        <p className="text-gray-500">No carts found.</p>
      )}
    </div>
  );
};

interface CartListTileProps {
  cart: Sale;
}

const CartListTile = ({ cart }: CartListTileProps) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getStore = async () => {
      try {
        const fetchedStore = await Store.fetchStore(cart.store_id);
        setStore(fetchedStore);
      } catch (err) {
        setError("Failed to fetch store data");
      } finally {
        setLoading(false);
      }
    };

    getStore();
  }, [cart.store_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <span>Loading...</span>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="flex items-center justify-center p-4">
        <span>{error || "Error loading store"}</span>
      </div>
    );
  }

  return (
    <div className="my-2 rounded-lg bg-white p-0 shadow-lg">
      <Link href={`/cart/${cart.id}`} passHref>
        <div className="flex cursor-pointer items-center">
          <Image
            src={store.image}
            alt={store.name}
            width={82}
            height={92}
            className="rounded"
          />
          <div className="ml-4 flex-grow">
            <h2 className="text-lg font-bold">{store.name}</h2>
            <p>Total: ₹{cart.total_amount.toFixed(2)}</p>
            <p className="text-gray-500">
              {/* {format(cart.orderTime ? new Date(cart.orderTime) : new Date(), 'hh:mm a   dd-MMMM')} */}
            </p>
          </div>
          <button
            className="p-2 text-blue-500 hover:text-blue-700"
            onClick={() => router.push(`/cart/${cart.id}`)}
          >
            <Image
              src={"/assets/icons/cart.png"}
              className="mr-3"
              height={22}
              width={22}
              alt="cart"
            />
          </button>
        </div>
      </Link>
    </div>
  );
};
