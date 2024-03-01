import { PrismaClient } from "@prisma/client";

/**
 * Upvotes a review
 *
 * @param reviewId - ID of the review
 */
export async function upvoteReview(reviewId: number): Promise<void> {
  const prisma = new PrismaClient();
}
