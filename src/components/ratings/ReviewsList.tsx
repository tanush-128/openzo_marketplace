import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Review from "~/models/review";
import { Store } from "~/models/store";
import ReviewSummary from "./ReviewSummary";
import ReviewTile from "./ReviewTile";

interface ReviewsListProps {
  storeId: string;
  store: Store | null;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ storeId, store }) => {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await Review.getReviewsByStoreID(storeId);
        setReviewData(reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
    // fetchStore();
  }, [storeId, store]);

  if (!store) {
    return (
      <div className="flex h-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviewData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No reviews found</p>
      </div>
    );
  }

  //   const userReview = reviewData.find((review) => review.userId === user.id);
  const reviews = reviewData;

  const ratingDistribution = {
    Excellent: reviews.filter((review) => review.rating === 5).length,
    Good: reviews.filter((review) => review.rating === 4).length,
    Average: reviews.filter((review) => review.rating === 3).length,
    "Below Average": reviews.filter((review) => review.rating === 2).length,
    Poor: reviews.filter((review) => review.rating === 1).length,
  };

  return (
    <div className="mt-16">
      <ReviewSummary
        averageRating={store!.rating}
        reviewCount={store!.review_count}
        ratingDistribution={ratingDistribution}
      />
      <div>
        {reviews.map((review) => (
          <ReviewTile key={review.id} review={review} byUser={false} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
