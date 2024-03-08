import { Review } from "./review";
import { Vote } from "./vote";

export type User = {
  id: number;
  createdAt: Date;
  email: string;
  reviews?: Review[];
  votes: Vote[];
};
