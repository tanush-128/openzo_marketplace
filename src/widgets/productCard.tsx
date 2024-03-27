import React, { useState } from "react";
import Image from "next/image";
import { Product } from "~/models/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border-b border-gray-300 p-4">
      <div className="w-1/4">
        <Image
          src={product.images?.[0]?.image ?? ""}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center">
          {product.discount_price !== product.mrp ? (
            <>
              <span className="mr-2 font-semibold text-red-500">
                ₹ {product.discount_price}
              </span>
              <span className="text-gray-500 line-through">
                ₹ {product.mrp}
              </span>
            </>
          ) : (
            <span>₹ {product.mrp}</span>
          )}
        </div>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-2 flex items-center">
          <button
            onClick={handleRemove}
            className="rounded bg-blue-500 px-3 py-1 text-white"
          >
            -
          </button>
          <span className="mx-3">{quantity}</span>
          <button
            onClick={handleAdd}
            className="rounded bg-blue-500 px-3 py-1 text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
