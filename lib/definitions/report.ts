import { Prisma } from "@prisma/client";

export type Report = Prisma.ReportGetPayload<{
  include: {
    user: true;
    review: true;
  };
}>;

export const reportReasons = [
  "Inappropriate Content",
  "Offensive Language",
  "Personal Attack",
  "Spam or Advertising",
  "Irrelevant Review",
  "False Information",
  "Confidential Information",
  "Duplicate Review",
];
