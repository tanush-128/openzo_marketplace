import React from "react";
import { Product } from "~/models/product";

interface ServiceCardProps {
  product: Product;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ product }) => {
  const buildProductImageForService = () => {
    if (product.images.length === 0) return <></>;

    return (
      <div className="max-h-[200px]  overflow-hidden rounded-t-lg bg-white">
        <img
          src={product.images[0]!.image}
          alt={product.name}
          className="mx-auto max-h-[200px] object-contain"
        />
      </div>
    );
  };

  return (
    <div className="m-2 rounded-lg border border-gray-200 bg-white">
      {buildProductImageForService()}
      <div className="p-4">
        <h2 className="text-blue-gray-900 text-xl font-semibold">
          {product.name}
        </h2>
        <div className="mt-2 flex items-center">
          <span className="text-blue-gray-800 text-lg font-bold">
            ₹ {product.mrp}
          </span>
          {/* <span className="ml-2 text-sm font-medium text-gray-600">
            per {product.quantity_unit}
          </span> */}
        </div>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      </div>
      {product.store_name && (
        <div className="px-4 pb-4">
          <p className="text-base font-semibold text-black">
            {product.store_name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
