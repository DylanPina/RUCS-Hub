import { prisma } from "@/prisma/prisma";

export async function getSubjects() {
  return await prisma.subject.findMany();
}

export async function getSubjectByCode(code: string) {
  return await prisma.subject.findUnique({
    where: {
      code: code,
    },
  });
}
