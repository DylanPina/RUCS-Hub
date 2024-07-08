import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

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
  subjectCode?: string,
  courseCode?: number,
  professorId?: number,
  reviewId?: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  if (!(courseCode && subjectCode) && !professorId && !reviewId) {
    throw new Error(
      "Must provide a course & subject code, professorId, or reviewId to create notification",
    );
  }

  if ([courseCode, professorId].filter(Boolean).length > 1) {
    throw new Error(
      "Cannot provide both course code and professorId to create notification",
    );
  }

  const subscription = await prisma.subscription.create({
    data: {
      userId: userId,
      subjectCode: subjectCode,
      courseCode: courseCode,
      professorId: professorId,
      reviewId: reviewId,
    },
  });

  revalidatePath("/subscriptions");
  return subscription;
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

  const deletedSubscription = await prisma.subscription.delete({
    where: {
      id: subscriptionId,
    },
  });

  revalidatePath("/subscriptions");
  return deletedSubscription;
}

/**
 * Gets all users subscribed to a course
 *
 * @courseId - ID of the course
 */
export async function getCourseSubscriptions(courseId: number) {
  if (!courseId) {
    throw new Error("Must provide courseId to get subscriptions");
  }

  return await prisma.subscription.findMany({
    where: {
      courseCode: courseId,
    },
  });
}
