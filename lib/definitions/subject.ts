import { Prisma } from "@prisma/client";

export type Subject = Prisma.SubjectGetPayload<{
  include: {
    courses: true;   
  } 
}>;
