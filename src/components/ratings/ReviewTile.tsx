import React from "react";
import { format } from "date-fns";
import { PencilIcon, StarIcon } from "lucide-react";
import Review from "~/models/review";
import { Rating, capitalize } from "@mui/material";

interface ReviewTileProps {
  review: Review;
  byUser?: boolean;
}

const ReviewTile: React.FC<ReviewTileProps> = ({ review, byUser = false }) => {
  return (
    <div className="relative border-b border-gray-200 bg-white p-4">
      {byUser && (
        <PencilIcon className="absolute bottom-0 right-0 h-5 w-5 text-gray-400" />
      )}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 flex items-center">
              <Rating value={review.rating} precision={0.1} readOnly />
            </div>
            <span className="text-lg font-semibold">{review.rating}.0</span>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(review.createdAt), "MMM dd, yyyy")}
          </span>
        </div>
        <div className="pl-2 pt-1">
          <p className="text-base font-medium text-gray-700">
            {capitalize(review.review)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewTile;
