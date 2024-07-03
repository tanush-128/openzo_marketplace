// app/cart/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import CartDetails from "./CartDetails";
import OrderStatus from "./OrderStatus";
// import ProductCard from './ProductCard';
import ProductCard from "~/components/product/productCard";
import { Product } from "~/models/product";
import Sale from "~/models/sale";

const CartPage = () => {
  const { id } = useParams(); // Get cart ID from URL

  // var cart : Sale | null = null;
  const [cart, setCart] = useState<Sale | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      var _cart = await Sale.getSaleByID(id as string);

      var _products = await Product.fetchMany(_cart.store_id);

      setCart(_cart);
      setProducts(
        _products.filter((product) =>
          _cart.order_items.some((item) => item.product_id === product.id),
        ),
      );
    };

    fetchOrder();
  }, [id]);

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-16">
          <h1 className="mb-4 text-2xl font-bold">
            Order ID : {cart.id.split("-")[0]}
          </h1>
          {cart.type === "online_order" && <OrderStatus cart={cart} />}
          <div className="mb-4 rounded-lg bg-white p-4 shadow">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addable={false}
                _quantity={
                  cart.order_items.find((e) => e.product_id === product.id)
                    ?.quantity
                }
              />
            ))}
          </div>
          <CartDetails cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
