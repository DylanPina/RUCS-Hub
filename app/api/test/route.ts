import { getSubjects } from "@/lib/data/subject";

export async function GET() {
  return Response.json(await getSubjects());
}
