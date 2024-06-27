import { Term } from "../definitions/course";
import { ProfessorPage, ProfessorTableColumn } from "../definitions/professor";
import { formatProfessorName, getValidYearTermMap } from "../utils";
import { prisma } from "@/prisma/prisma";
import { Professor, Review } from "@prisma/client";
import { getListingByYearTermWebReg } from "./webreg";

/**
 * Get professor by first and last name
 *
 * @param firstName - First name of professor or null
 * @param lastName - Last name of professor
 */
export async function getProfessorByName(
  firstName: string | null,
  lastName: string,
): Promise<ProfessorPage> {
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
 * Get all professors
 *
 * @return - List of all professors
 */
export async function getAllProfessors(): Promise<Professor[]> {
  const professors = await prisma.professor.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
  return professors;
}

/**
 * Get professor table data
 *
 * @return - Professor table data
 */
export async function getProfessorTableData(): Promise<ProfessorTableColumn[]> {
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
 * Get all the names of professors for the CS department
 *
 * @return - List of tuples which contain [lastName, firstName]
 */
export async function getProfessorNames(): Promise<[string, string][]> {
  const validYearTermMap: Map<number, Term[]> = getValidYearTermMap();

  const sections: Promise<any[]>[] = [];
  validYearTermMap.forEach((terms, year) => {
    terms.forEach((term) => {
      sections.push(getListingByYearTermWebReg(year, term));
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
export function getProfessorPageRatings(professor: any): any {
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
 * Get professor by course
 *
 * @param courseId - Course ID
 * @return - List of professors
 */
export async function getProfessorByCourse(code: number): Promise<Professor[]> {
  const professors = await prisma.professor.findMany({
    where: {
      sections: {
        some: {
          courseCode: code,
        },
      },
    },
  });
  return professors;
}
