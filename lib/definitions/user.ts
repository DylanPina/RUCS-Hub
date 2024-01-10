import { Review } from "./review";

export type Student = {
  studentId: string; // Student ID (primary key)
  email?: string; // Student email
  displayName?: string; // Display name for the student
  photoUrl?: string; // Photo for the student
  reviews?: Review[]; // Reviews created by the student
};
