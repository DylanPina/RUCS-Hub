import { mockReviews } from "@/lib/mock-data/review-mock-data";
import { mockUsers } from "@/lib/mock-data/user-mock-data";
import { mockVotes } from "@/lib/mock-data/vote-mock-data";
import { Review, Vote } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import {
  getAllCourseListingWebReg,
  getAllCourseSectionsWebReg,
  getProfessorNamesWebReg,
  getSubjectsWebReg,
  mergeCourseListingBySubjectCourseCode,
} from "@/lib/data/webreg";
import { parseProfessorName, titleCase } from "@/lib/utils";
import { CourseWebRegListing } from "@/lib/definitions/course";

/** Performs seeding operations */
export async function GET() {
  prisma.$disconnect();
  return Response.json({ message: `Seeding complete!` });
}

/**
 * Seed the database with users, courses, professors, sections, and mock reviews
 *
 * @param prisma - The Prisma client
 */
async function seedDatabase(prisma: any): Promise<Response> {
  const seedUsersResponse: Response = await seedMockUsers(prisma);
  const seedSubjectsResponse: Response = await seedSubjects(prisma);
  const seedCoursesResponse: Response = await seedCourses(prisma);
  const seedProfessorsResponse: Response = await seedProfessors(prisma);
  const seedSectionsResponse: Response = await seedSections(prisma);
  const seedReviewsResponse: Response = await seedMockReviews(prisma);
  const seedVotesResponse: Response = await seedVotes(prisma);

  return Response.json({
    users: seedUsersResponse,
    subjects: seedSubjectsResponse,
    courses: seedCoursesResponse,
    professors: seedProfessorsResponse,
    sections: seedSectionsResponse,
    reviews: seedReviewsResponse,
    votes: seedVotesResponse,
  });
}

/**
 * Seed the database with mock users
 *
 * @param prisma - The Prisma client
 */
async function seedMockUsers(prisma: any): Promise<Response> {
  const createUsers: any = await prisma.user.createMany({ data: mockUsers });

  return Response.json(createUsers);
}

/**
 * Seed the database with courses
 *
 * @param prisma - The Prisma client
 */
async function seedCourses(prisma: any): Promise<Response> {
  const courseListings = await getAllCourseListingWebReg();
  const mergedCourseListings = mergeCourseListingBySubjectCourseCode(
    Array.from(courseListings.values()),
  );

  const courseListingsFormatted = Array.from(mergedCourseListings.values())
    .flat()
    .filter(
      (courseListing: CourseWebRegListing) =>
        courseListing.subjectCode !== "198",
    )
    .map((courseListing: CourseWebRegListing) => {
      return {
        subjectCode: courseListing.subjectCode,
        code: courseListing.code,
        name: titleCase(courseListing.title)
          .replace("Ii", "II")
          .replace("Cs", "CS"),
        credits: courseListing.credits,
      };
    });

  const createCourses: any = await prisma.course.createMany({
    data: courseListingsFormatted,
  });

  return Response.json(createCourses);
}

/**
 * Drop the course table
 *
 * @param prisma - The Prisma client
 */
async function dropCourses(prisma: any): Promise<Response> {
  return Response.json(await prisma.course.deleteMany());
}

/**
 * Seed the database with professors
 *
 * @param prisma - The Prisma client
 */
async function seedProfessors(prisma: any): Promise<Response> {
  const professorNames: string[] = await getProfessorNamesWebReg();
  const parsedProfessorNames = professorNames.map((professorName: string) =>
    parseProfessorName(professorName),
  );

  const createProfessors = await prisma.professor.createMany({
    data: parsedProfessorNames.map((professorName: [string, string | null]) => {
      if (professorName[1]) {
        return {
          firstName: professorName[0] || "",
          lastName: professorName[1],
        };
      } else {
        return {
          firstName: "",
          lastName: professorName[0],
        };
      }
    }),
  });

  return Response.json(createProfessors);
}

/**
 * Drop the professor table
 *
 * @param prisma - The Prisma client
 */
async function dropProfessors(prisma: any): Promise<Response> {
  return Response.json(await prisma.professor.deleteMany());
}

/**
 * Seed the database with reviews
 *
 * @param prisma - The Prisma client
 */
async function seedMockReviews(prisma: any): Promise<Response> {
  const createReviews: Review[] | null = await prisma.review.createMany({
    data: mockReviews,
  });

  return Response.json(createReviews);
}

/**
 * Seed the database with votes
 *
 * @param prisma - The Prisma client
 */
async function seedVotes(prisma: any): Promise<Response> {
  const createVotes: Vote[] | null = await prisma.vote.createMany({
    data: mockVotes,
  });

  return Response.json(createVotes);
}

/**
 * Seed the database with course, professor, and review data
 *
 * @param prisma - The Prisma client
 */
async function seedSections(prisma: any): Promise<Response> {
  const sections = await getAllCourseSectionsWebReg();
  const createSections: any = await prisma.section.createMany({
    data: sections,
  });

  return Response.json(createSections);
}

/**
 * Seed the database with subjects
 *
 * @param prisma - The Prisma client
 */
async function seedSubjects(prisma: any): Promise<Response> {
  const subjects = await getSubjectsWebReg();
  const createSubjects: any = await prisma.subject.createMany({
    data: subjects,
  });

  return Response.json(createSubjects);
}
