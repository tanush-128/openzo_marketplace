import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "~/models/product";

interface VerticalProductCardProps {
  product: Product;
}

const VerticalProductCard: React.FC<VerticalProductCardProps> = ({
  product,
}) => {
  return (
    <div className=" min-w-44 bg-white p-2  duration-200 ">
      <Link
        href={`/store/${product.store_id}/product/${product.id}`}
        className="cursor-pointer"
      >
        <div className="relative mb-3 h-[200px] overflow-hidden rounded-t-lg">
          <Image
            alt={product.name}
            src={
              product.images.length > 0
                ? product.images[0]!.image
                : "/placeholder.png"
            }
            layout="fill"
            objectFit="contain"
            className="h-full w-full"
          />
        </div>
        <div className="p-2">
          <div className="text-blue-gray-900 mb-1 line-clamp-1 text-lg">
            {product.name}
          </div>
          <div className="mb-2 line-clamp-1 text-sm text-gray-600">
            {product.description}
          </div>
          {product.mrp !== product.discount_price ? (
            <div className="flex w-full items-center justify-between space-x-2 ">
              <div className="flex items-center">
                <span className="rounded bg-red-500 px-2 py-1 text-white">
                  {(
                    ((product.mrp - product.discount_price) / product.mrp) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="text-gray-500 line-through">₹{product.mrp}</div>
              <div className="text-lg font-semibold ">
                ₹{product.discount_price}
              </div>
            </div>
          ) : (
            <div className="text-lg font-semibold">₹{product.mrp}</div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VerticalProductCard;
