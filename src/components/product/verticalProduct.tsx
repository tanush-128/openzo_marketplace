import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Product } from '~/models/product';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   images: { image: string }[];
//   storeID: string;
//   mrp: number;
//   discountPrice: number;
// }

interface VerticalProductCardProps {
  product: Product;
}

const VerticalProductCard: React.FC<VerticalProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-0">
      <Link href={`/store/${product.store_id}/product/${product.id}`} className="cursor-pointer">
        <div className="mb-1 h-[200px]">
         <Image alt='' src={
                product.images.length > 0 ? product.images[0]!.image : '/placeholder.png'
            } width={240} height={320} />
        </div>
        <div className="p-1">
          <div className="text-lg font-bold text-blue-gray-900 line-clamp-2">
            {product.name}
          </div>
          <div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
          {product.mrp !== product.discount_price ? (
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center text-primary">
               
                <span className="">
                  {((product.mrp - product.discount_price) / product.mrp * 100).toFixed(0)}%
                </span>
              </div>
              <div className="line-through text-gray-500">₹{product.mrp}</div>
              <div className="text-lg font-semibold">₹{product.discount_price}</div>
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
