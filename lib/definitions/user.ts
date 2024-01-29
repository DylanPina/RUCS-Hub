import { Review } from "./review";

export type User = {
  id: number;
  createdAt: Date;
  email: string;
  reviews?: Review[];
};
