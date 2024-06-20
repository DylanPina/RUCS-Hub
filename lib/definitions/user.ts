import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: {
    reviews: true;
    votes: true;
    reports: true;
    notifications: true;
    subscriptions: true;
  };
}>;
