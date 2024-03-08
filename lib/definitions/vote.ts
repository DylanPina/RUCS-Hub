import { Review } from "./review";
import { User } from "./user";

export type Vote = {
  id: number;
  user: User;
  userId: number;
  review: Review;
  reviewId: number;
  upvote: boolean;
  createdAt: Date;
};
