import { Review } from "@prisma/client";

export interface Professor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ProfessorPage {
  id: number;
  firstName: string;
  lastName: string;
  overall: number;
  difficulty: number;
  reviews: Review[];
}

export type ProfessorTableColumn = {
  firstName: string;
  lastName: string;
  overall?: number;
  difficulty?: number;
  totalReviews?: number;
};
