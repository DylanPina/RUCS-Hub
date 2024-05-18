import { Review } from "./review";
import { User } from "./user";

export type Report = {
  id: number;
  user: User;
  userId: string;
  review: Review;
  reviewId: number;
  category: string;
  content: string;
  createdAt: Date;
};
