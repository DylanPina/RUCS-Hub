import { prisma } from "@/prisma/prisma";

/**
 * Creates a report
 *
 * @param userId - ID of the user
 * @param reviewId - ID of the review
 * @param category - Category of the report
 * @param content - Content of the report
 */
export async function createReport(
  userId: string,
  reviewId: number,
  category: string,
  content: string,
) {
  const report = await prisma.report.create({
    data: {
      userId: userId,
      reviewId: reviewId,
      category: category,
      content: content,
    },
  });
  return report;
}

/**
 * Get report by user and review
 *
 * @param userId - ID of the user
 * @param reviewId - ID of the review
 */
export async function getReportByUserAndReview(
  userId: string,
  reviewId: number,
) {
  const report = await prisma.report.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
    },
  });
  return report;
}
