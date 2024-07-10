import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6 lg:px-8">
          <Skeleton width={200} height={24} />
        </div>
      </header>

      <main className="p-4">
        <div className="mb-4 bg-white p-4">
          <Skeleton height={200} />
        </div>

        <div className="mb-4 bg-white p-4">
          <Skeleton width="100%" height={24} />
          <div className="mt-2">
            <Skeleton width="100%" height={16} />
          </div>
          <div className="mt-4">
            <Skeleton width={100} height={18} />
          </div>
        </div>

        <div className="mb-4 bg-white p-4">
          <div className="mb-4 flex items-center">
            <Skeleton width={40} height={18} />
            <div className="ml-4">
              <Skeleton width={200} height={18} />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton width={40} height={18} />
            <div className="ml-4">
              <Skeleton width={200} height={18} />
            </div>
          </div>
        </div>

        <div className="mb-4 bg-white p-4">
          <Skeleton height={150} />
        </div>

        <div className="mb-4 bg-white p-4">
          <Skeleton height={150} />
        </div>
      </main>

      <footer className="bg-white p-4 shadow">
        <Skeleton height={48} />
      </footer>
    </div>
  );
};

export default ProductPageSkeleton;
