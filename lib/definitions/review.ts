export type Review = {
  reviewId?: string; // Unique identifier for the review
  userId?: string; // Unique identifier for the user leaving the review (foreign key)
  courseId: string; // Unique identifier for course (foreign key)
  bookUsefulness?: number; // Booking usefulness rating
  difficulty?: number; // Difficulty rating
  upvotes?: number; // # of upvotes
  downvotes?: number; // # of downvotes
  lastUpdated: Date; // Time the review was last updated
  lectureQuality: number; // Lecture quality rating
  piazzaCommunity?: number; // Piazza community rating
  professorId?: number; // Unique identifier for professor teaching the course (foreign key)
  professorQuality?: number; // Professor quality ranking
  projectDifficulty?: number; // Project difficulty review
  rating: number; // Course rating review
  review: string; // Contents of the review
  semester: string; // Semester the course was taken
  year: number; // Year the class was taken
  title: string; // Title of the review
  timestamp: Date; // When the review was published
  weeklyWorkload?: number; // How many hours a week was spent on average
};
