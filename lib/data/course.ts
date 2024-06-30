import {
  CourseTableColumn,
  CourseSection,
  Term,
  CoursePage,
} from "@/lib/definitions/course";
import { Course, Section } from "@prisma/client";
import { Review } from "../definitions/review";
import { prisma } from "@/prisma/prisma";

/**
 * Get course by courseId
 *
 * @param code - Course code of the course we are trying to fetch
 * @return - Course
 */
export async function getCourseByCode(code: number): Promise<CoursePage> {
  const course = await prisma.course.findUnique({
    where: {
      code: code,
    },
    include: {
      reviews: {
        include: {
          course: true,
          professor: true,
          votes: true,
        },
      },
    },
  });

  if (!course) {
    console.error(`Failed to find course with code ${code}`);
  }

  return getCoursePageRatings(course);
}

/**
 * Get courses
 *
 * @return - List of all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
    },
    orderBy: {
      code: "asc",
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
  }

  return courses;
}

/**
 * Get course table listings
 *
 * @return - List of all course table listings
 */
export async function getAllCourseTableListing(): Promise<CourseTableColumn[]> {
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
    return [];
  }

  return courses.map((course: Course) => getCourseTableRatings(course));
}

/**
 * Get course table data based on the given year and term
 *
 * @param year - Year the courses were offered (or null or all)
 * @param term - Term the courses were offered (or null or all)
 * @return - Course table data for the courses based on year and terms
 */
export async function getCourseTableDataByYearTerm(
  year: number | null,
  term: Term | null,
): Promise<CourseTableColumn[]> {
  const courses: Course[] = await prisma.course.findMany({
    include: {
      reviews: true,
      sections: true,
    },
  });

  if (!courses) {
    console.error("Failed to find any courses");
    return [];
  }

  if (year !== null && term !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some(
          (section: CourseSection) =>
            section.term === term && section.year === year,
        ),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else if (year !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some((section: CourseSection) => section.year === year),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else if (term !== null) {
    return courses
      .filter((course: any) =>
        course.sections.some((section: CourseSection) => section.term === term),
      )
      .map((course: any) => getCourseTableRatings(course));
  } else {
    return courses.map((course: any) => getCourseTableRatings(course));
  }
}

/**
 * Returns overall ratings for a course based on its reviews to display on the course page
 *
 * @param course - Course we are interested
 */
export function getCoursePageRatings(course: any): CoursePage {
  const reviews: Review[] = course.reviews;
  const overallRatingSum = reviews.reduce(
    (acc, review) => acc + (review.rating ?? 0),
    0,
  );
  const averageRating =
    reviews.length > 0 ? overallRatingSum / reviews.length : 0;

  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => review.difficultyRating !== null,
  );
  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review) => acc + (review.difficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  const reviewsWithWorkload: Review[] = reviews.filter(
    (review: Review) => review.workload !== null,
  );
  const workloadSum = reviewsWithWorkload.reduce(
    (acc, review) => acc + (review.workload ?? 0),
    0,
  );
  const averageWorkload =
    reviewsWithWorkload.length > 0
      ? workloadSum / reviewsWithWorkload.length
      : 0;

  const reviewsWithProfessorQualityRating: Review[] = reviews.filter(
    (review: Review) => review.professorQualityRating !== null,
  );
  const professorQualityRatingSum = reviewsWithProfessorQualityRating.reduce(
    (acc, review) => acc + (review.professorQualityRating ?? 0),
    0,
  );
  const averageProfessorQualityRating =
    reviewsWithProfessorQualityRating.length > 0
      ? professorQualityRatingSum / reviewsWithProfessorQualityRating.length
      : 0;

  const reviewsWithLectureRating: Review[] = reviews.filter(
    (review: Review) => review.lectureRating !== null,
  );
  const lectureRatingSum = reviewsWithLectureRating.reduce(
    (acc, review) => acc + (review.lectureRating ?? 0),
    0,
  );
  const averageLectureRating =
    reviewsWithLectureRating.length > 0
      ? lectureRatingSum / reviewsWithLectureRating.length
      : 0;

  const reviewsWithBookRating: Review[] = reviews.filter(
    (review: Review) => review.bookRating !== null,
  );
  const bookRatingSum = reviewsWithBookRating.reduce(
    (acc, review) => acc + (review.bookRating ?? 0),
    0,
  );
  const averageBookRating =
    reviewsWithBookRating.length > 0
      ? bookRatingSum / reviewsWithBookRating.length
      : 0;

  const reviewsWithPiazzaRating: Review[] = reviews.filter(
    (review: Review) => review.piazzaRating !== null,
  );
  const piazzaRatingSum = reviewsWithPiazzaRating.reduce(
    (acc, review) => acc + (review.piazzaRating ?? 0),
    0,
  );
  const averagePiazzaRating =
    reviewsWithPiazzaRating.length > 0
      ? piazzaRatingSum / reviewsWithPiazzaRating.length
      : 0;

  return {
    code: course.code,
    name: course.name,
    prereqs: course.prereqs,
    credits: course.credits,
    synopsisUrl: course.synopsis,
    rating: reviews.length ? averageRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    professorQualityRating: reviewsWithProfessorQualityRating.length
      ? averageProfessorQualityRating
      : -1,
    lectureRating: reviewsWithLectureRating.length ? averageLectureRating : -1,
    bookRating: reviewsWithBookRating.length ? averageBookRating : -1,
    piazzaRating: reviewsWithPiazzaRating.length ? averagePiazzaRating : -1,
    workload: reviewsWithWorkload.length ? averageWorkload : -1,
    reviews,
  };
}

/**
 * Returns overall ratings for a course based on its reviews to display on the course table
 *
 * @param course - Course we are interested
 * @return - Overall ratings for that course
 */
function getCourseTableRatings(course: any): any {
  const reviews: Review[] = course.reviews;
  const reviewsWithDifficultyRating: Review[] = reviews.filter(
    (review: Review) => review.difficultyRating !== null,
  );
  const reviewsWithWorkload: Review[] = reviews.filter(
    (review: Review) => review.workload !== null,
  );

  const overallRatingSum = reviews.reduce(
    (acc, review) => acc + (review.rating ?? 0),
    0,
  );
  const averageRating =
    reviews.length > 0 ? overallRatingSum / reviews.length : 0;

  const difficultyRatingSum = reviewsWithDifficultyRating.reduce(
    (acc, review) => acc + (review.difficultyRating ?? 0),
    0,
  );
  const averageDifficultyRating =
    reviewsWithDifficultyRating.length > 0
      ? difficultyRatingSum / reviewsWithDifficultyRating.length
      : 0;

  const workloadSum = reviewsWithWorkload.reduce(
    (acc, review) => acc + (review.workload ?? 0),
    0,
  );
  const averageWorkload =
    reviewsWithWorkload.length > 0
      ? workloadSum / reviewsWithWorkload.length
      : 0;

  return {
    code: course.code,
    name: course.name,
    credits: course.credits,
    rating: reviews.length ? averageRating : -1,
    difficulty: reviewsWithDifficultyRating.length
      ? averageDifficultyRating
      : -1,
    workload: reviewsWithWorkload.length ? averageWorkload : -1,
    reviews: reviews.length,
  };
}

/**
 * Get all course section from the database
 *
 * @return - All course sections from the database
 */
export async function getAllCourseSections(): Promise<Section[]> {
  const courseSections: Section[] = await prisma.section.findMany();

  if (!courseSections) {
    console.error("Failed to find any course sections");
  }

  return courseSections;
}

/**
 * Returns the unique course IDs that the professor taught
 *
 * @param professorId - ID for the professor we are interested in
 * @return - Unique course IDs that the professor taught
 */
export async function getCoursesTaughtByProfessor(
  professorId: number,
): Promise<number[]> {
  const sections = await getAllCourseSections();

  const codes = sections
    .filter((section: Section) => section.professorId === professorId)
    .map((section) => section.courseCode);

  return Array.from(new Set(codes));
}

/**
 * Returns the unique course IDs that the professor is currently teaching
 *
 * @param professorId - ID for the professor we are interested in
 * @return - Unique course IDs that the professor is currently teaching
 */
export async function getCoursesBeingTaughtByProfessor(
  professorId: number,
): Promise<number[]> {
  const sections = await getAllCourseSections();

  const codes = sections
    .filter(
      (section: Section) =>
        section.professorId === professorId &&
        section.year === 2024 &&
        section.term === Term.Spring,
    )
    .map((section) => section.courseCode);

  return Array.from(new Set(codes));
}

/**
 * Parses the webreq preq notes
 *
 * @param preqreqNotes - Prereq notes string returned from webreg api
 * @return - List of prereq course code strings
 */
export function parsePrereqNotes(prereqNotes: string): string[] {
  const normalizedString = prereqNotes
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[()]/g, "")
    .replace(/\s/g, "")
    .trim()
    .replace(
      "anycourseequalorgreaterthan:",
      "Any course equal x_x greater than ",
    );

  const prereqs: string[] = normalizedString.split("or");

  const prereqsSplit: string[][] = [];
  prereqs.forEach((s: string) => {
    prereqsSplit.push(s.split("and"));
  });

  const prereqsJoined: string[] = [];
  prereqsSplit.forEach((s: string[]) => {
    prereqsJoined.push(
      s.join(" and ").replace("or", " or ").replace("x_x", "or"),
    );
  });

  return prereqsJoined;
}
