import { fetchProfessorNames } from "@/lib/data/professor";
import { mockReviews } from "@/lib/mock-data/review-mock-data";
import { PrismaClient, Professor, Review } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const createMockReviews = await seedMockReviews(prisma);

  return Response.json(createMockReviews);
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

async function seedMockReviews(prisma: any): Promise<Review[] | null> {
  const createReviews: Review[] | null = await prisma.review.createMany({
    data: mockReviews,
  });

  return createReviews;
}
