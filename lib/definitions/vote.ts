import { Prisma } from "@prisma/client";

export type Vote = Prisma.VoteGetPayload<{
  include: {
    user: true;
    review: true;
    notifications: true;
  };
}>;
