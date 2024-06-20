import { Prisma } from "@prisma/client";

export type Notification = Prisma.NotificationGetPayload<{
  include: {
    recipient: true;
    vote: true;
    review: true;
  };
}>;
