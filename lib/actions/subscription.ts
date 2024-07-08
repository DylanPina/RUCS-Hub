"use server";

import { prisma } from "@/prisma/prisma";
import { createSubscription, deleteSubscription } from "../data/subscription";
import { getProfessorPageRatings } from "../data/professor";
import { getCoursePageRatings } from "../data/course";

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
    include: {
      course: true,
      professor: true,
      review: {
        include: {
          course: true,
          professor: true,
          votes: true,
        },
      },
    },
  });
}

/**
 * Gets all subscription card data to be displayed on the subscription page
 *
 * @param userId - The ID of the user
 */
export async function getSubscriptionCards(userId: string) {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: {
        include: {
          reviews: {
            include: {
              course: true,
              professor: true,
              votes: true,
            },
          },
        },
      },
      professor: {
        include: {
          reviews: {
            include: {
              course: true,
              professor: true,
              votes: true,
            },
          },
        },
      },
      review: {
        include: {
          course: true,
          professor: true,
          votes: true,
        },
      },
    },
  });

  return subscriptions.map((subscription) => {
    if (subscription.professor) {
      const updatedProfessor = getProfessorPageRatings(subscription.professor);
      return { ...subscription, professor: updatedProfessor };
    } else if (subscription.course) {
      const updatedCourse = getCoursePageRatings(subscription.course);
      return { ...subscription, course: updatedCourse };
    }
    return subscription;
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

  await createSubscription(
    userId,
    undefined,
    undefined,
    professorId,
    undefined,
  );
}

/**
 * Creates a subscription to a course
 *
 * @param userId - The ID of the user
 * @param subjectCode - The subject code of the course
 * @param courseCode - The code of the course
 */
export async function createCourseSubscription(
  userId: string,
  subjectCode: string,
  courseCode: number,
) {
  if (!subjectCode || !courseCode) {
    throw new Error(
      "Must provide subject and course code to create subscription",
    );
  }

  if (!userId) {
    throw new Error("Must provide userId to create subscription");
  }

  const alreadySubscribed = await isUserSubscribedToCourse(
    userId,
    subjectCode,
    courseCode,
  );

  if (alreadySubscribed) {
    throw new Error("User is already subscribed to this course");
  }

  await createSubscription(
    userId,
    subjectCode,
    courseCode,
    undefined,
    undefined,
  );
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
    throw new Error("Must provide code to create subscription");
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
      userId,
      professorId,
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
 * @param subjectCode - The code of the subject
 * @param courseCode - The code of the course
 */
export async function deleteCourseSubscription(
  userId: string,
  subjectCode: string,
  courseCode: number,
) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      subjectCode,
      courseCode,
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
      userId,
      reviewId,
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
 * @param subjectCode - The subject code of the course
 * @param courseCode - The code of the course
 */
export async function isUserSubscribedToCourse(
  userId: string,
  subjectCode: string,
  courseCode: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to check subscription");
  }

  if (!subjectCode || !courseCode) {
    throw new Error(
      "Must provide subject and course code to check subscription",
    );
  }

  return await prisma.subscription.findFirst({
    where: {
      userId,
      subjectCode,
      courseCode,
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
