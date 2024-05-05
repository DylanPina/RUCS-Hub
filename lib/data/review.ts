import { Vote } from "@prisma/client";
import { prisma } from "@/prisma/prisma";

/**
 * Upvotes a review
 *
 * @param reviewId - ID of the review
 */
export async function upvoteReview(
  userId: string,
  reviewId: number,
): Promise<Vote | null> {
  const alreadyUpvoted = await prisma.vote.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });

  if (alreadyUpvoted) {
    await prisma.vote.deleteMany({
      where: {
        userId: userId,
        reviewId: reviewId,
        upvote: true,
      },
    });
    return null;
  }

  await prisma.vote.deleteMany({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });

  return await prisma.vote.create({
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
  userId: string,
  reviewId: number,
): Promise<Vote | null> {
  const alreadyDownvoted = await prisma.vote.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });

  if (alreadyDownvoted) {
    await prisma.vote.deleteMany({
      where: {
        userId: userId,
        reviewId: reviewId,
        upvote: false,
      },
    });
    return null;
  }

  await prisma.vote.deleteMany({
    where: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });

  return await prisma.vote.create({
    data: {
      userId: userId,
      reviewId: reviewId,
      upvote: false,
    },
  });
}
