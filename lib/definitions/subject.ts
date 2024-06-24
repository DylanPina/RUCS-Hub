import { Prisma } from "@prisma/client";

export type Subject = Prisma.SectionGetPayload<{
  include: {
    course: true;
  };
}>;
