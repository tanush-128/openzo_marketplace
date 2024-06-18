// components/CartsPage.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import CartList from './CartList';

const tabs = [
  { name: 'Pending', status: 'not_placed' },
  { name: 'Placed', status: 'placed' },
  { name: 'Delivered', status: 'delivered' },
] as const;

const CartsPage = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['status']>('not_placed');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carts</h1>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveTab(tab.status)}
              className={`px-3 py-2 font-medium text-sm rounded-t-lg border-b-2 ${
                activeTab === tab.status
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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





// components/CartList.tsx
import { useEffect } from 'react';
import Sale from '~/models/sale';
import { Store } from '~/models/store';
import useSalesStore from '~/providers/salesStore';
// import { format } from 'date-fns';
// import { useSalesStore } from '~/stores/useSalesStore';


interface CartListProps {
  status: 'not_placed' | 'placed' | 'delivered';
}

const CartList = ({ status }: CartListProps) => {
  const fetchOrders = useSalesStore((state) => state.fetchOrders);
  // const carts = useSalesStore((state) => state.onlineOrders
  // .filter((sale) => sale.status === status));
    const carts = useSalesStore((state) => state.onlineOrders);
  const fetching = useSalesStore((state) => state.fetching);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="">
      {carts.map((cart) => (
        <CartListTile key={cart.id} cart={cart} />
      ))}
      {carts.length === 0 && <p className="text-gray-500">No carts found.</p>}
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
        const fetchedStore = await Store.fetchStore(cart.storeId);
        setStore(fetchedStore);
      } catch (err) {
        setError('Failed to fetch store data');
      } finally {
        setLoading(false);
      }
    };

    getStore();
  }, [cart.storeId]);

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
        <span>{error || 'Error loading store'}</span>
      </div>
    );
  }

  return (
    <div className="my-2 p-0 shadow-lg rounded-lg bg-white">
      <Link href={`/cart/${cart.id}`} passHref>
        <div className="flex items-center cursor-pointer">
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
              {/* {format(cart.orderTime ? new Date(cart.orderTime) : new Date(), 'hh:mm a   dd-MMMM')}
               */}
                
            </p>
          </div>
          <button
            className="p-2 text-blue-500 hover:text-blue-700"
            onClick={() => router.push(`/cart/${cart.id}`)}
          >
            <Image src={"/assets/icons/cart.png"} className='mr-3'  height={22} width={22} alt='cart'/>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.401 2M7 13h10l1.25-7.125A1 1 0 0017.26 5H6.1L5.4 2.51A1 1 0 004.43 2H2M9 18a3 3 0 100 6 3 3 0 000-6zm7 0a3 3 0 100 6 3 3 0 000-6z"
              />
            </svg> */}
          </button>
        </div>
      </Link>
    </div>
  );
};



// interface CartListProps {
//   status: 'not_placed' | 'placed' | 'delivered';
// }

// const CartList = ({ status }: CartListProps) => {
//   const fetchOrders = useSalesStore((state) => state.fetchOrders);
//   const carts = useSalesStore((state) => state.onlineOrders.filter((sale) => sale.status === status));
//   const fetching = useSalesStore((state) => state.fetching);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   if (fetching) return <div>Loading...</div>;

//   return (
//     <div className="space-y-4">
//       {carts.map((cart) => (
//         <div key={cart.id} className="p-4 border rounded-lg shadow">
//           <h2 className="text-lg font-bold">Cart ID: {cart.id}</h2>
//           {/* Render other cart details here */}
//           <p>Status: {cart.status}</p>
//           {/* Example item rendering */}
//           <ul>
//             {cart.order_items.map((item) => (
//               <li key={item.product_id}>
//                 Product ID: {item.product_id}, Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       {carts.length === 0 && <p className="text-gray-500">No carts found.</p>}
//     </div>
//   );
// };
// export default CartList;
