import { Prisma } from "@prisma/client";
import { Review } from "./review";

export type Professor = Prisma.ProfessorGetPayload<{
  include: {
    reviews: true;
    sections: true;
    subscribers: true;
  };
}>;

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
