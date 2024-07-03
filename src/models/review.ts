import axios from 'axios';
import GlobalConsts from '~/constants/constants';

interface ReviewProps {
  id?: string;
  storeId: string;
  userId?: string;
  userName?: string;
  rating: number;
  createdAt: Date;
  review: string;
}

class Review {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  rating: number;
  createdAt: Date;
  review: string;

  static endpoint = `https://backend.openzo.in/stores`;

  constructor({ id = '', storeId, userId = '', userName = '', rating, createdAt, review }: ReviewProps) {
    this.id = id;
    this.storeId = storeId;
    this.userId = userId;
    this.userName = userName;
    this.rating = rating;
    this.createdAt = createdAt;
    this.review = review;
  }

  static fromJson(json: any): Review {
    return new Review({
      id: json.id,
      storeId: json.store_id,
      userId: json.user_id,
      userName: json.user_name,
      rating: json.rating,
      createdAt: new Date(json.created_at),
      review: json.review,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      store_id: this.storeId,
      review: this.review,
      user_id: this.userId,
      user_name: this.userName,
      rating: this.rating,
      created_at: this.createdAt.toISOString(),
    };
  }

  static async createReview(review: Review): Promise<Review> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await axios.post(
        `${Review.endpoint}/review`,
        review.toJson(),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        return Review.fromJson(response.data);
      } else {
        throw new Error('Failed to create review');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create review');
    }
  }

  static async getReviewsByStoreID(storeID: string): Promise<Review[]> {
    try {
      const response = await axios.get(`${Review.endpoint}/reviews/${storeID}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200) {
        return response.data.map((item: any) => Review.fromJson(item));
      } else {
        throw new Error('Failed to get reviews');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get reviews');
    }
  }
}

export default Review;
