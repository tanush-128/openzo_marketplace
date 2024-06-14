// components/StoreDetailsSkeleton.tsx
import React from 'react';

export const StoreDetailsSkeleton: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center animate-pulse">
            <div className="w-full h-[100vw] bg-gray-300 rounded-b-lg"></div>
            <div className="px-3 w-full">
                <div className="h-8 bg-gray-300 mt-2 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-300 mt-2 rounded-md w-1/4"></div>
                <div className="h-4 bg-gray-300 mt-2 rounded-md w-1/2"></div>
            </div>
            <div className="my-2 px-3 py-4 w-full bg-gray-300 rounded-t-lg"></div>
        </div>
    );
};
