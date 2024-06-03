import { prisma } from "@/prisma/prisma";

/**
 * Creates a subscription to a course, professor, or review
 *
 * @param userId - ID of the user who is subscribing
 * @param courseCode - Course code of the course the user is subscribing to
 * @param professorId - ID of the professor the user is subscribing to
 * @param reviewId - ID of the review the user is subscribing to
 */
export async function createSubscription(
  userId: string,
  courseCode?: number,
  professorId?: number,
  reviewId?: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  if (!userId && !courseCode && !professorId && !reviewId) {
    throw new Error(
      "Must provide userId or courseCode or professorId or reviewId to create subscription",
    );
  }

  return await prisma.subscription.create({
    data: {
      userId: userId,
      courseCode: courseCode,
      professorId: professorId,
      reviewId: reviewId,
    },
  });
}

/**
 * Deletes a subscription
 *
 * @param subscriptionId - ID of the subscription to delete
 */
export async function deleteSubscription(subscriptionId: number) {
  if (!subscriptionId) {
    throw new Error("Must provide subscriptionId to delete subscription");
  }

  return prisma.subscription.delete({
    where: {
      id: subscriptionId,
    },
  });
}
