import React from 'react';
import { Box, Typography, LinearProgress, Rating } from '@mui/material';

interface ReviewSummaryProps {
  averageRating: number;
  reviewCount: number;
  ratingDistribution: Record<string, number>;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  reviewCount,
  ratingDistribution,
}) => {
  const getColorForRating = (rating: string): string => {
    switch (rating) {
      case 'Excellent':
        return 'green';
      case 'Good':
        return 'lightgreen';
      case 'Average':
        return 'yellow';
      case 'Below Average':
        return 'orange';
      case 'Poor':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Average Rating Display */}
      <Box textAlign="center" mb={2}>
        <Typography variant="h3" component="div" fontWeight="bold">
          {averageRating.toFixed(1)}
        </Typography>
        <Rating value={averageRating} precision={0.1} readOnly />
      </Box>

      {/* Review Count */}
      <Typography color="textSecondary" mb={2}>
        based on {reviewCount} reviews
      </Typography>

      {/* Rating Distribution Bars */}
      <Box width="100%" px={4}>
        {Object.entries(ratingDistribution).map(([key, value]) => (
          <Box key={key} display="flex" alignItems="center" my={1}>
            <Box width="80px">
              <Typography>{key}</Typography>
            </Box>
            <Box width="100%" mx={1}>
              <LinearProgress
                variant="determinate"
                value={(value / reviewCount) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColorForRating(key),
                  },
                }}
              />
            </Box>
            <Typography>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewSummary;
