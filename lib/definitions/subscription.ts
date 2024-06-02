import { Prisma } from "@prisma/client";

export type Subscription = Prisma.SubscriptionGetPayload<{
  include: {
    user: true;
    course: true;
    professor: true;
    review: true;
  };
}>;
