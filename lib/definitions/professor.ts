export interface Professor {
  professorId: string;
  name: string;
  rating: number;
  currentlyTeaching: string[] | null;
  previouslyTaught: string[] | null;
  difficultyRating: number;
}

export type ProfessorTableColumn = {
  firstName: string;
  lastName: string;
  overall?: number;
  difficulty?: number;
  totalReviews?: number;
};
