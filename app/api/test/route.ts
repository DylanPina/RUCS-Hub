import { getProfessorNames } from "@/lib/data/professor";

export async function GET() {
  const professorNames = await getProfessorNames();
  return new Response(JSON.stringify(professorNames));
}
