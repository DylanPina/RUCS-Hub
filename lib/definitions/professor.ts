export interface Professor {
  id: number;
  firstName: string;
  lastName: string;
}

export type ProfessorTableColumn = {
  firstName: string;
  lastName: string;
  overall?: number;
  difficulty?: number;
  totalReviews?: number;
};
