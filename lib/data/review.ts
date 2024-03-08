import { PrismaClient } from "@prisma/client";

/**
 * Upvotes a review
 *
 * @param reviewId - ID of the review
 */
export async function upvoteReview(
  userId: number,
  reviewId: number,
): Promise<void> {
  const prisma = new PrismaClient();

  const alreadyUpvoted = await prisma.vote.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });

  if (alreadyUpvoted) {
    console.error(`User ${userId} already upvoted review ${reviewId}`);
    return;
  }

  await prisma.vote.deleteMany({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });

  await prisma.vote.create({
    data: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });
}

/**
 * Downvotes a review
 *
 * @param reviewId - ID of the review
 */
export async function downvoteReview(
  userId: number,
  reviewId: number,
): Promise<void> {
  const prisma = new PrismaClient();

  const alreadyDownvoted = await prisma.vote.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });

  if (alreadyDownvoted) {
    console.error(`User ${userId} already downvoted review ${reviewId}`);
    return;
  }

  await prisma.vote.deleteMany({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });

  await prisma.vote.create({
    data: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });
}
