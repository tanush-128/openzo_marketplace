// components/Rating.tsx
import React from 'react';

type RatingProps = {
    rating: number;
};

export const Rating: React.FC<RatingProps> = ({ rating }) => {
    return (
        <div className="flex">
            {/* Render stars based on rating */}
            {Array.from({ length: 5 }, (_, index) => (
                <svg
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'text-orange-300' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.568L24 9.748l-6 5.854 1.416 8.267L12 18.897l-7.416 4.972L6 15.602 0 9.748l8.332-1.593z" />
                </svg>
            ))}
        </div>
    );
};
