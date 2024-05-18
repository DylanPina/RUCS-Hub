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

export const reportReasons = [
  "Inappropriate Content",
  "Offensive Language",
  "Personal Attack",
  "Spam or Advertising",
  "Irrelevant Review",
  "False Information",
  "Confidential Information",
  "Duplicate Review",
];
