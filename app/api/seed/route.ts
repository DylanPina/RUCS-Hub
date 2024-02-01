import { fetchAllCourseTableListings } from "@/lib/data/course";
import { fetchProfessorNames } from "@/lib/data/professor";
import { CourseTableColumn } from "@/lib/definitions/course";
import { mockReviews } from "@/lib/mock-data/review-mock-data";
import { PrismaClient, Professor, Review } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  // await seedCourses(prisma);
  // await seedProfessors(prisma);
  // await seedMockReviews(prisma);

  prisma.$disconnect();
  return Response.json({ message: "Seeding complete" });
}

async function seedCourses(prisma: any): Promise<Response> {
  const courseTableListings: CourseTableColumn[] =
    await fetchAllCourseTableListings();
  const courseCodesNames = courseTableListings.map(
    ({ courseCode, courseName }) => ({ code: courseCode, name: courseName }),
  );

  const createCourses: any = await prisma.course.createMany({
    data: courseCodesNames,
  });

  return Response.json(createCourses);
}

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

async function seedMockReviews(prisma: any): Promise<Response> {
  const createReviews: Review[] | null = await prisma.review.createMany({
    data: mockReviews,
  });

  return Response.json(createReviews);
}
