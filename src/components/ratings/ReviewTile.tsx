import React from 'react';
import { format } from 'date-fns';
import { PencilIcon, StarIcon } from 'lucide-react';
import Review from '~/models/review';
import { capitalize } from '@mui/material';

interface ReviewTileProps {
  review: Review;
  byUser?: boolean;
}

const ReviewTile: React.FC<ReviewTileProps> = ({ review, byUser = false }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200 relative">
      {byUser && (
        <PencilIcon className="absolute bottom-0 right-0 h-5 w-5 text-gray-400" />
      )}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(review.rating)].map((_, index) => (
                <StarIcon key={index} className="h-6 w-6 text-amber-500" />
              ))}
            </div>
            <span className="text-lg font-semibold">{review.rating}.0</span>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(review.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="pt-1 pl-2">
          <p className="text-base text-gray-700 font-medium">
            {capitalize(review.review)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewTile;
