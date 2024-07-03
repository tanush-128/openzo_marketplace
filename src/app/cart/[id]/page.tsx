// app/cart/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import CartDetails from './CartDetails';
import OrderStatus from './OrderStatus';
// import ProductCard from './ProductCard';
import { Product } from '~/models/product';
import useSalesStore from '~/providers/salesStore';
import ProductCard from '~/components/product/productCard';

const CartPage = () => {
  const { id } = useParams(); // Get cart ID from URL
  const fetchOrders = useSalesStore((state) => state.fetchOrders);
  const carts = useSalesStore((state) => state.onlineOrders);
  const updateSale = useSalesStore((state) => state.updateSale);
  const cart = carts.find((cart) => cart.id === id);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (cart) {
      Product.fetchMany(cart.storeId).then((fetchedProducts) => {
        setProducts(
          fetchedProducts.filter((product) =>
            cart.order_items.some((item) => item.product_id === product.id)
          )
        );
      });
    }
  }, [cart]);
  
const handleCancelOrder = () => {
  // cart
    // Logic for canceling order (e.g., remove from Zustand store or update status)
    // updateOrderStatus(cart.id, 'canceled');
    // router.push('/'); // Redirect to homepage or cart list page
  };

  const handlePlaceOrder = () => {
    cart!.status = 'placed';
    updateSale(cart!);

    
    // Logic for placing the order (update the status and persist changes)
    // updateOrderStatus(cart.id, 'placed');
    // router.push('/'); // Redirect to homepage or order confirmation page
  };


  if (!cart) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
       <div className='mb-16'>
         <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <OrderStatus cart={cart} />
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}  addable={cart.status === "not_placed"}  />
          ))}
        </div>
        <CartDetails cart={cart} />
       </div>
         <div className=''>
          {cart.status === 'not_placed' && (
        <div className="bg-white p-4 border-t shadow-lg fixed  bottom-12 left-0 right-0 max-w-lg mx-auto">
          <div className="flex justify-between">
            <button
              onClick={handleCancelOrder}
              className="text-red-500 hover:text-red-700"
            >
              Cancel Order
            </button>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            >
              <span>Place Order</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 12H6.75m10.5 0l-3-3m3 3l-3 3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
         </div>
      </div>
    </div>
  );
};

export default CartPage;
