import { Course } from "./course";
import { Professor } from "./professor";
import { User } from "./user";
import { Vote } from "./vote";

export type Review = {
  id: number;
  user: User;
  userId: string;
  semester: number;
  year: number;
  course: Course;
  courseCode: number;
  title: string;
  content: string;
  createdAt: Date;
  lastModified: Date;
  rating: number;
  votes: Vote[];
  difficultyRating: number;
  professor: Professor;
  professorId?: number;
  professorQualityRating?: number;
  professorDifficultyRating?: number;
  lectureRating?: number;
  bookRating?: number;
  piazzaRating?: number;
  workload?: number;
};

export type ReviewForm = {
  course: string;
  professor: string;
  year: string;
  term: string;
  title: string;
  content: string;
  courseRating: number;
  courseDifficultyRating?: number;
  courseWorkload?: number;
  professorRating?: number;
  professorDifficultyRating?: number;
  lectureRating?: number;
};
