import { Prisma } from "@prisma/client";

export type Section = Prisma.SectionGetPayload<{
  include: {
    course: true;
    professor: true;
  };
}>;
