import React, { useState } from "react";
import { Product } from "~/models/product";

const VerticalProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(
    // cart?.orderItems.find((item) => item.productId === product.id)?.quantity ||
    0,
  );

  const handleAdd = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    // You can add logic to update the cart here
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      // You can add logic to update the cart here
    }
  };

  return (
    <div className="w-175">
      <div className="cursor-pointer" onClick={() => console.log("Open modal")}>
        <div className="relative mx-auto mb-2 h-48 w-48 overflow-hidden rounded-lg shadow-md">
          <img
            src={
              product.images.length > 0
                ? product.images[0]?.image ?? "assets/images/watch.webp"
                : "assets/images/watch.webp"
            }
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-blueGray-900 text-lg font-semibold">
            {product.name}
          </p>
          {product.mrp !== product.discount_price ? (
            <div className="flex items-center justify-center">
              <p className="text-base font-semibold">
                ₹ {product.discount_price}
              </p>
              <p className="ml-2 text-sm font-normal text-gray-500 line-through">
                ₹ {product.mrp}
              </p>
            </div>
          ) : (
            <p className="text-base font-semibold">₹ {product.mrp}</p>
          )}
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default VerticalProductCard;
