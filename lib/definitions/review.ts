import { Prisma } from "@prisma/client";

export type Review = Prisma.ReviewGetPayload<{
  include: {
    user: true;
    course: true;
    votes: true;
    professor: true;
    reports: true;
    notifications: true;
    subscribers: true;
  };
}>;

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

export type ReviewEditForm = {
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
