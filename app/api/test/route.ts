import { getProfessorNamesWebReg } from "@/lib/data/webreg";

export async function GET() {
  const professorNames = await getProfessorNamesWebReg();
  return new Response(JSON.stringify(professorNames));
}
