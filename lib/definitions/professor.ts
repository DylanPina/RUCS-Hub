export interface Professor {
  professorId: string; // Unique identifier for a professor
  name: string; // Professor's full name
  rating: number; // Quality rating
  currentlyTeaching: string[] | null; // Courses the professor is currently teaching
  previouslyTaught: string[] | null; // Courses the professor has previously taught
  difficultyRating: number; // Difficulty difficulty
}

export type ProfessorTableColumn = {
  firstName: string;
  lastName: string;
  overall?: number;
  difficulty?: number;
  totalReviews?: number;
};
