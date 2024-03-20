import { Term } from "../definitions/course";
import { ProfessorPage, ProfessorTableColumn } from "../definitions/professor";
import { formatProfessorName, getValidYearTermMap } from "../utils";
import { parseWebRegListingByYearTerm } from "./course";
import { titleCase } from "../utils";
import { PrismaClient, Professor, Review } from "@prisma/client";

/**
 * Query professor by first and last name
 *
 * @param firstName - First name of professor or null
 * @param lastName - Last name of professor
 */
export async function queryProfessorByName(
  firstName: string | null,
  lastName: string,
): Promise<ProfessorPage> {
  const prisma = new PrismaClient();
  if (firstName === null) {
    firstName = "";
  }

  const professor = await prisma.professor.findFirst({
    include: {
      reviews: {
        include: {
          course: true,
          professor: true,
          votes: true,
        },
      },
    },
    where: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  return getProfessorPageRatings(professor);
}

/**
 * Query all professors
 *
 * @return - List of all professors
 */
export async function queryAllProfessors(): Promise<Professor[]> {
  const prisma = new PrismaClient();
  const professors = await prisma.professor.findMany();
  return professors;
}

/**
 * Query for professor table data
 *
 * @return - Professor table data
 */
export async function queryProfessorTableData(): Promise<
  ProfessorTableColumn[]
> {
  const prisma = new PrismaClient();
  const professors = await prisma.professor.findMany({
    include: {
      reviews: true,
    },
  });

  return professors.map((professor: Professor) =>
    getProfessorTableRatings(professor),
  );
}

/**
 * Fetches professor table data
 *
 * @return - Professor table data
 */
export async function fetchProfessorTableData(): Promise<
  ProfessorTableColumn[]
> {
  const professorNames: [string, string][] = await fetchProfessorNames();

  return professorNames.map(([lastName, firstName]: [string, string]) => {
    return {
      firstName: titleCase(firstName),
      lastName: titleCase(lastName),
      overall: 0,
      difficulty: 0,
      totalReviews: 0,
    };
  });
}

/**
 * Fetches all the names of professors for the CS department
 *
 * @return - List of tuples which contain [lastName, firstName]
 */
export async function fetchProfessorNames(): Promise<[string, string][]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const sections: Promise<any[]>[] = [];
  validYearTermMap.forEach((terms, year) => {
    terms.forEach((term) => {
      sections.push(parseWebRegListingByYearTerm(year, term));
    });
  });

  const listings = (await Promise.all(sections)).flat();

  const professorFullNames = new Set<string>();
  listings
    .flatMap((listing) => listing.sections)
    .forEach((section) => {
      if (section.professorName[0]?.name) {
        professorFullNames.add(section.professorName[0].name);
      }
    });

  return Array.from(professorFullNames).map((professor: string) => {
    const parts = professor
      .split(new RegExp("[, ]+"))
      .map((part: string) => part.trim());

    if (parts.length > 1) {
      return [parts[0], parts[1]];
    }

    return [parts[0], ""];
  });
}

/**
 * Creates a map of professor names to their respective IDs
 *
 * @return - Map of professor names to their respective IDs
 */
export async function createProfessorNameIdMap(): Promise<Map<string, number>> {
  const prisma = new PrismaClient();
  const professors = await prisma.professor.findMany();
  const professorNameIdMap = new Map<string, number>();

  professors.forEach((professor) => {
    const fullName = formatProfessorName(
      professor.lastName,
      professor.firstName,
    );
    professorNameIdMap.set(fullName, professor.id);
  });

  return professorNameIdMap;
}

/**
 * Returns overall ratings for a professor based on its reviews for the professor page
 *
 * @param professor - Professor we are interested
 * @return - Overall ratings for that professor
 */
function getProfessorPageRatings(professor: any): any {
  const reviews: Review[] = professor.reviews ?? [];

  const reviewsWithOverallRating: Review[] = reviews.filter(
    (review: Review) => {
      return review.professorQualityRating !== null;
    },
  );
  const overallRatingSum = reviewsWithOverallRating.reduce(
    (acc, review: any) => acc + (review.professorQualityRating ?? 0),
    0,
  );
  const averageOverallRating =
    reviewsWithOverallRating.length > 0
      ? overallRatingSum / reviewsWithOverallRating.length
      : 0;

  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => {
      return review.professorDifficultyRating !== null;
    },
  );
  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review: any) => acc + (review.professorDifficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  return {
    id: professor.id,
    firstName: professor.firstName,
    lastName: professor.lastName,
    overall: reviewsWithOverallRating.length ? averageOverallRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    reviews,
  };
}

/**
 * Returns overall ratings for a professor based on its reviews for the professor table
 *
 * @param professor - Professor we are interested
 * @return - Overall ratings for that professor
 */
function getProfessorTableRatings(professor: any): any {
  const reviews: Review[] = professor.reviews ?? [];

  const reviewsWithOverallRating: Review[] = reviews.filter(
    (review: Review) => {
      return review.professorQualityRating !== null;
    },
  );
  const overallRatingSum = reviewsWithOverallRating.reduce(
    (acc, review: any) => acc + (review.professorQualityRating ?? 0),
    0,
  );
  const averageOverallRating =
    reviewsWithOverallRating.length > 0
      ? overallRatingSum / reviewsWithOverallRating.length
      : 0;

  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => {
      return review.professorDifficultyRating !== null;
    },
  );
  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review: any) => acc + (review.professorDifficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  return {
    firstName: professor.firstName,
    lastName: professor.lastName,
    overall: reviewsWithOverallRating.length ? averageOverallRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    reviews: reviews.length,
  };
}

/**
 * Query for professor by course
 *
 * @param courseId - Course ID
 * @return - List of professors
 */
export async function queryProfessorsByCourse(
  courseCode: number,
): Promise<Professor[]> {
  const prisma = new PrismaClient();
  const professors = await prisma.professor.findMany({
    where: {
      sections: {
        some: {
          courseCode: courseCode,
        },
      },
    },
  });
  return professors;
}
