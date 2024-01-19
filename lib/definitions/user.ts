import { Review } from "./review";

export type Student = {
  studentId: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  reviews?: Review[];
};
