import { Vote } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import {
  notifySubscribersReviewVote,
  notifySubscribersReviewVoteDeleted,
} from "./notification";

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
    await notifySubscribersReviewVoteDeleted(reviewId, alreadyUpvoted.id);
    return null;
  }

  const downvote = await prisma.vote.findFirst({
    where: {
      userId,
      reviewId,
      upvote: false,
    },
  });

  if (downvote) {
    await prisma.vote.deleteMany({
      where: {
        userId,
        reviewId,
        upvote: false,
      },
    });
    await notifySubscribersReviewVoteDeleted(reviewId, downvote.id);
  }

  const newVote = await prisma.vote.create({
    data: {
      userId: userId,
      reviewId: reviewId,
      upvote: true,
    },
  });
  await notifySubscribersReviewVote(reviewId, newVote.id);
  return newVote;
}

/**
 * Downvotes a review
 *
 * @param userId - ID of the user
 * @param reviewId - ID of the review
 */
export async function downvoteReview(
  userId: string,
  reviewId: number,
): Promise<Vote | null> {
  const alreadyDownvoted = await prisma.vote.findFirst({
    where: {
      userId,
      reviewId,
      upvote: false,
    },
  });

  if (alreadyDownvoted) {
    await prisma.vote.deleteMany({
      where: {
        userId,
        reviewId,
        upvote: false,
      },
    });
    await notifySubscribersReviewVoteDeleted(reviewId, alreadyDownvoted.id);
    return null;
  }

  const upvote = await prisma.vote.findFirst({
    where: {
      userId,
      reviewId,
      upvote: true,
    },
  });

  if (upvote) {
    await prisma.vote.deleteMany({
      where: {
        userId,
        reviewId,
        upvote: true,
      },
    });
    await notifySubscribersReviewVoteDeleted(reviewId, upvote.id);
  }

  const newVote = await prisma.vote.create({
    data: {
      userId,
      reviewId,
      upvote: false,
    },
  });

  await notifySubscribersReviewVote(reviewId, newVote.id);
  return newVote;
}
