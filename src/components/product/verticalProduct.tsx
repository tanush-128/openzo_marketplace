import { ArrowDown } from "lucide-react";
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
        {/* <div className="relative z-0 mb-3 h-[200px] overflow-hidden rounded-t-lg">
          <Image
            alt={product.name}
            src={product.images.length > 0 ? product.images[0]!.image : ""}
            layout="fill"
            objectFit="contain"
            className="z-0 h-full w-full"
          />
        </div> */}
        {product.images.length > 0 && (
          <img
            src={product.images[0]!.image}
            className="z-0 h-[200px] max-w-full object-contain"
          />
        )}
        <div className="px-2">
          <div className="mb-1 line-clamp-1 text-lg font-medium text-black">
            {product.name}
          </div>
          <div className="mb-2 line-clamp-1 text-sm text-zinc-400">
            {product.description}
          </div>
          {product.mrp !== product.discount_price ? (
            <div className="flex w-full items-center space-x-2  ">
              <div className="flex items-center">
                <span className="flex items-center rounded  py-1 text-primary">
                  <ArrowDown size={16} />
                  {(
                    ((product.mrp - product.discount_price) / product.mrp) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="text-gray-500 line-through">₹{product.mrp}</div>
              <div className="text-lg font-medium text-black">
                ₹{product.discount_price}
              </div>
            </div>
          ) : (
            <div className="text-lg font-semibold text-black">
              ₹{product.mrp}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VerticalProductCard;
