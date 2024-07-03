import React from 'react';
import { Product } from '~/models/product';


interface ServiceCardProps {
  product: Product;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ product }) => {
  const buildProductImageForService = () => {
    if (product.images.length === 0) return <></>;

    return (
      <div className="w-full rounded-t-lg overflow-hidden bg-white">
        <img src={product.images[0]!.image} alt={product.name} className="w-full" />
      </div>
    );
  };

  return (
    <div className="m-2 bg-white rounded-lg border border-gray-200">
      {buildProductImageForService()}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-gray-900">{product.name}</h2>
        <div className="flex items-center mt-2">
          <span className="text-lg font-bold text-blue-gray-800">₹ {product.mrp}</span>
          <span className="ml-2 text-sm font-medium text-gray-600">per {product.quantityUnit}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      </div>
      {product.store_name && (
        <div className="px-4 pb-4">
          <p className="text-base font-semibold text-black">{product.store_name}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
