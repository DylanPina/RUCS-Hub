import {
  fetchAllCourseTableListings,
  fetchCourseSections,
} from "@/lib/data/course";
import { fetchProfessorNames } from "@/lib/data/professor";
import { CourseTableColumn } from "@/lib/definitions/course";
import { mockReviews } from "@/lib/mock-data/review-mock-data";
import { mockUsers } from "@/lib/mock-data/user-mock-data";
import { PrismaClient, Professor, Review } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  // Uncomment the following line to seed the database when this URL is visited
  const seedResponse: Response = await seedDatabase(prisma);

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
  const seedCoursesResponse: Response = await seedCourses(prisma);
  const seedProfessorsResponse: Response = await seedProfessors(prisma);
  const seedSectionsResponse: Response = await seedSections(prisma);
  const seedReviewsResponse: Response = await seedMockReviews(prisma);

  return Response.json({
    users: seedUsersResponse,
    courses: seedCoursesResponse,
    professors: seedProfessorsResponse,
    sections: seedSectionsResponse,
    reviews: seedReviewsResponse,
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
  const courseTableListings: CourseTableColumn[] =
    await fetchAllCourseTableListings();
  const courses = courseTableListings.map(
    ({ courseCode, courseName, credits }) => ({
      code: courseCode,
      name: courseName,
      credits,
    }),
  );

  const createCourses: any = await prisma.course.createMany({
    data: courses,
  });

  return Response.json(createCourses);
}

/**
 * Seed the database with professors
 *
 * @param prisma - The Prisma client
 */
async function seedProfessors(prisma: any): Promise<Response> {
  const professorNames: string[][] = await fetchProfessorNames();
  const professrNamesMapped: any[] = professorNames.map(
    (professorName: string[]) => {
      return {
        lastName: professorName[0],
        firstName: professorName[1],
      };
    },
  );

  const createProfessors: Professor[] | null =
    await prisma.professor.createMany({
      data: professrNamesMapped,
    });

  return Response.json(createProfessors);
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
 * Seed the database with course, professor, and review data
 *
 * @param prisma - The Prisma client
 */
async function seedSections(prisma: any): Promise<Response> {
  const sections = await fetchCourseSections();
  const createSections: any = await prisma.section.createMany({
    data: sections,
  });

  return Response.json(createSections);
}
