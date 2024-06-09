"use server";

import { prisma } from "@/prisma/prisma";
import { createSubscription, deleteSubscription } from "../data/subscription";

/**
 * Gets all subscriptions for a user
 *
 * @param userId - The ID of the user
 */
export async function getSubscriptions(userId: string) {
  if (!userId) {
    throw new Error("Must provide userId");
  }

  return await prisma.subscription.findMany({
    where: {
      userId: userId,
    },
  });
}

/**
 * Creates a subscription to a professor
 *
 * @param userId - The ID of the user
 * @param professorId - The ID of the professor
 */
export async function createProfessorSubscription(
  userId: string,
  professorId: number,
) {
  if (!professorId) {
    throw new Error("Must provide professorId to create subscription");
  }

  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  const alreadySubscribed = await isUserSubscribedToProfessor(
    userId,
    professorId,
  );

  if (alreadySubscribed) {
    throw new Error("User is already subscribed to this professor");
  }

  await createSubscription(userId, undefined, professorId, undefined);
}

/**
 * Creates a subscription to a course
 *
 * @param userId - The ID of the user
 * @param courseCode - The code of the course
 */
export async function createCourseSubscription(
  userId: string,
  courseCode: number,
) {
  if (!courseCode) {
    throw new Error("Must provide courseCode to create subscription");
  }

  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  const alreadySubscribed = await isUserSubscribedToCourse(userId, courseCode);

  if (alreadySubscribed) {
    throw new Error("User is already subscribed to this course");
  }

  await createSubscription(userId, courseCode, undefined, undefined);
}

/**
 * Creates a subscription to a review
 *
 * @param userId - The ID of the user
 * @param reviewId - The ID of the review
 */
export async function createReviewSubscription(
  userId: string,
  reviewId: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  if (!reviewId) {
    throw new Error("Must provide courseCode to create subscription");
  }

  await createSubscription(userId, undefined, undefined, reviewId);
}

/**
 * Deletes a subscription a professor
 *
 * @param userId - The ID of the user
 * @param professorId - The ID of the professor
 */
export async function deleteProfessorSubscription(
  userId: string,
  professorId: number,
) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: userId,
      professorId: professorId,
    },
    select: {
      id: true,
    },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  await deleteSubscription(subscription.id);
}

/**
 * Deletes a subscription to a course
 *
 * @param userId - The ID of the user
 * @param courseCode - The code of the course
 */
export async function deleteCourseSubscription(
  userId: string,
  courseCode: number,
) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: userId,
      courseCode: courseCode,
    },
    select: {
      id: true,
    },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  await deleteSubscription(subscription.id);
}

/**
 * Deletes a subscription to a review
 *
 * @param userId - The ID of the user
 * @param reviewId - The ID of the review
 */
export async function deleteReviewSubscription(
  userId: string,
  reviewId: number,
) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
    },
    select: {
      id: true,
    },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  await deleteSubscription(subscription.id);
}

/**
 * Checks if a user is subscribed to a professor
 *
 * @param userId - The ID of the user
 * @param professorId - The ID of the professor
 */
export async function isUserSubscribedToProfessor(
  userId: string,
  professorId: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to check subscription");
  }

  if (!professorId) {
    throw new Error("Must provide professorId to check subscription");
  }

  return await prisma.subscription.findFirst({
    where: {
      userId: userId,
      professorId: professorId,
    },
  });
}

/**
 * Checks if a user is subscribed to a course
 *
 * @param userId - The ID of the user
 * @param courseCode - The code of the course
 */
export async function isUserSubscribedToCourse(
  userId: string,
  courseCode: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to check subscription");
  }

  if (!courseCode) {
    throw new Error("Must provide courseCode to check subscription");
  }

  return await prisma.subscription.findFirst({
    where: {
      userId: userId,
      courseCode: courseCode,
    },
  });
}

/**
 * Checks if a user is subscribed to a review
 *
 * @param userId - The ID of the user
 * @param reviewId - The ID of the review
 */
export async function isUserSubscribedToReview(
  userId: string,
  reviewId: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to check subscription");
  }

  if (!reviewId) {
    throw new Error("Must provide reviewId to check subscription");
  }

  return await prisma.subscription.findFirst({
    where: {
      userId: userId,
      reviewId: reviewId,
    },
  });
}
