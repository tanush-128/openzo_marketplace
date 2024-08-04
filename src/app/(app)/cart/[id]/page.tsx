"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "~/models/store";
import { Product } from "~/models/product";
import useSalesStore from "~/providers/salesStore";
import useUserStore from "~/providers/userStore";
import ProductCard from "~/components/product/productCard";

import AddressDetails from "./AddressDetails";
import { ChevronRight, CircleArrowOutUpLeftIcon, Trash2 } from "lucide-react";
import OrderStatus from "./OrderStatus";
import Link from "next/link";

interface CartPageProps {
  id: string;
}

const CartPage: React.FC<CartPageProps> = () => {
  const { id } = useParams(); // Get cart ID from URL
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [notPlaced, setNotPlaced] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const {
    onlineOrders,
    updateSale,
    // deleteSale
  } = useSalesStore();
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const cart = onlineOrders.find((order) => order.id === id);

    if (cart) {
      setNotPlaced(cart.status === "not_placed");
      Store.fetchStore(cart.store_id).then(setStore);
      setAddress(cart.customer?.address || user.address || "");
      setPhone(cart.customer?.phone || user.phone || "");
      Product.fetchMany(cart.store_id).then((fetchedProducts) => {
        setProducts(
          fetchedProducts.filter((product) =>
            cart.order_items.some(
              (item) => item.product_id === product.id && item.quantity > 0,
            ),
          ),
        );
      });
    }
  }, [id, onlineOrders, user]);

  const handlePlaceOrder = () => {
    if (!phone || !address) {
      alert("Please enter your phone number and address");
      return;
    }

    const cart = onlineOrders.find((order) => order.id === id);
    if (cart) {
      cart.status = "placed";
      updateSale(cart);
      setNotPlaced(false);
    }
  };

  const handleDeleteCart = () => {
    const cart = onlineOrders.find((order) => order.id === id);
    if (cart) {
      deleteSale(cart.id);
      router.push("/");
    }
  };

  const handleEditAddress = (newAddress: string, newPhone: string) => {
    setAddress(newAddress);
    setPhone(newPhone);
    const cart = onlineOrders.find((order) => order.id === id);
    if (cart) {
      cart.customer = {
        ...cart.customer,
        address: newAddress,
        phone: newPhone,
        id: cart.customer?.id || null, // Add id property with type 'number | null'
      };
      updateSale(cart);
    }
  };

  const cart = onlineOrders.find((order) => order.id === id);

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <Link
          // onClick={() => router.replace("/cart")}
          href="/cart/"
          className="text-gray-500"
        >
          &larr; Back
        </Link>
        <h1 className="text-lg font-semibold">{store?.name}</h1>
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {cart.status !== "not_placed" &&
          cart.status !== "cancelled" &&
          cart.status !== "rejected" && <OrderStatus cart={cart} />}

        {cart.status === "rejected" || cart.status === "cancelled" ? (
          <div className="mb-4 rounded-lg bg-red-500 p-4 text-white">
            <p>We are sorry, Store has cancelled the order</p>
          </div>
        ) : null}

        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold">{store?.name}</h2>
            <button
              onClick={() => router.push(`/store/${store?.id}`)}
              className="text-blue-500"
            >
              {notPlaced ? "Add More" : "View More"}
            </button>
          </div>

          {store?.phone && !notPlaced && (
            <div className="mb-2 flex items-center">
              <img
                src="/icons/phone.png"
                alt="Phone"
                className="mr-2 h-5 w-5"
              />
              <span className="text-gray-700">+91 {store.phone}</span>
            </div>
          )}
        </div>

        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              _quantity={
                cart.order_items.find((item) => item.product_id === product.id)
                  ?.quantity || 0
              }
              // cart={cart}
              addable={cart.status === "not_placed"}
            />
          ))}
        </div>

        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <AddressDetails
            cart={cart}
            onEditAddress={handleEditAddress}
            address={address}
            phone={phone}
          />
        </div>

        {!store?.selfDeliveryService && (
          <div className="mb-4 rounded-lg bg-white p-4 shadow">
            <div className="flex items-center text-red-500">
              {/* <img
                src="/icons/error.png"
                alt="Error"
                className="mr-2 h-5 w-5"
              /> */}
              <CircleArrowOutUpLeftIcon />
              <span>This store does not provide delivery service</span>
            </div>
          </div>
        )}

        {cart.status === "not_placed" && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleDeleteCart}
              className="flex items-center text-red-500"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Cart
            </button>
          </div>
        )}
      </main>

      {cart.status === "not_placed" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-4 py-4">
          <div className="flex items-center text-gray-700">
            <img src="/icons/bill.png" alt="Bill" className="mr-2 h-5 w-5" />
            <span className="mr-2">Total Bill</span>
            <strong>₹{cart.total_amount + 40}</strong>
          </div>
          {store?.selfDeliveryService && (
            <button
              onClick={handlePlaceOrder}
              className="btn-primary flex items-center text-primary"
            >
              Place Order
              <ChevronRight size={16} className="mb-1 ml-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
