import { prisma } from "@/prisma/prisma";
import { getCourseSubscriptions } from "./subscription";

/**
 * Gets notifications for a user
 *
 * @param userId - ID of the user
 */
export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: {
      recipientId: userId,
    },
    include: {
      review: {
        include: {
          course: true,
          professor: true,
        },
      },
      vote: true,
      course: true,
      professor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Creates a notification
 *
 * @param userId - ID of the user who is subscribing
 * @param subjectCode - Subject code of the course
 * @param courseCode - Course code of the course the user is subscribing to
 * @param professorId - ID of the professor the user is subscribing to
 * @param reviewId - ID of the review the user is subscribing to
 * @param voteId - ID of the vote placed on the review the user is subscribing to
 */
export async function createNotification(
  userId: string,
  subjectCode?: string,
  courseCode?: number,
  professorId?: number,
  reviewId?: number,
  voteId?: number,
) {
  if (!userId) {
    throw new Error("Must provide userId to create notification");
  }

  if (!(courseCode && subjectCode) && !professorId && !reviewId) {
    throw new Error(
      "Must provide a code and a subject code, professorId, or reviewId to create notification",
    );
  }

  if ([courseCode, professorId].filter(Boolean).length > 1) {
    throw new Error(
      "Cannot provide both code and professorId to create notification",
    );
  }

  return await prisma.notification.create({
    data: {
      recipientId: userId,
      subjectCode: subjectCode,
      courseCode: courseCode,
      professorId: professorId,
      reviewId: reviewId,
      voteId: voteId,
    },
  });
}

/**
 * Deletes a notification
 *
 * @param notificationId - ID of the notification to delete
 */
export async function deleteNotification(notificationId: number) {
  if (!notificationId) {
    throw new Error("Must provide notificationId to delete notification");
  }

  return prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });
}

/**
 * Notifies subscribers of a review that a post has been voted upon
 *
 * @param reviewId - ID of the review that got a vote
 * @param voteId - ID of the vote placed on the review
 */
export async function notifySubscribersReviewVote(
  reviewId: number,
  voteId: number,
) {
  const subscribers = await prisma.subscription.findMany({
    where: {
      reviewId: reviewId,
    },
  });

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    await createNotification(
      subscriber.userId,
      undefined,
      undefined,
      subscriber.reviewId ?? undefined,
      voteId,
    );
  }
}

/**
 * Notifies subscribers of a vote that has been deleted
 *
 * @param reviewId - ID of the review
 * @param voteId - ID of the vote removed
 */
export async function notifySubscribersReviewVoteDeleted(
  reviewId: number,
  voteId: number,
) {
  const subscribers = await prisma.subscription.findMany({
    where: {
      reviewId: reviewId,
    },
  });

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    const notification = await prisma.notification.findFirst({
      where: {
        recipientId: subscriber.userId,
        voteId: voteId,
      },
    });

    if (notification) {
      await deleteNotification(notification.id);
    }
  }
}

/**
 * Notifies subscribers of a course review that has been created
 *
 * @param subjectCode - Subject code of the course
 * @param courseCode - Course code of the course
 * @param reviewId - ID of the review
 */
export async function notifySubscribersCourseReviewCreated(
  subjectCode: string,
  courseCode: number,
  reviewId: number,
) {
  const subscribers = await getCourseSubscriptions(courseCode);

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    await createNotification(
      subscriber.userId,
      subjectCode,
      courseCode,
      undefined,
      reviewId,
      undefined,
    );
  }
}

/**
 * Notifies subscribers of a course review that has been deleted
 *
 * @param subjectCode - Subject code of the course
 * @param courseCode - Course code of the course
 * @param reviewId - ID of the review
 */
export async function notifySubscribersCourseReviewDeleted(
  courseCode: number,
  reviewId: number,
) {
  const subscribers = await getCourseSubscriptions(courseCode);

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    const notification = await prisma.notification.findFirst({
      where: {
        recipientId: subscriber.userId,
        reviewId: reviewId,
      },
    });

    if (notification) {
      await deleteNotification(notification.id);
    }
  }
}

/**
 * Notifies subscribers of a professor review that has been created
 *
 * @param professorId - ID of the professor
 * @param reviewId - ID of the review
 */
export async function notifySubscribersProfessorReviewCreated(
  professorId: number,
  reviewId: number,
) {
  const subscribers = await prisma.subscription.findMany({
    where: {
      professorId: professorId,
    },
  });

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    await createNotification(
      subscriber.userId,
      undefined,
      professorId,
      reviewId,
      undefined,
    );
  }
}

/**
 * Notifies subscribers of a professor review that has been deleted
 *
 * @param professorId - ID of the professor
 * @param reviewId - ID of the review
 */
export async function notifySubscribersProfessorReviewDeleted(
  professorId: number,
  reviewId: number,
) {
  const subscribers = await prisma.subscription.findMany({
    where: {
      professorId: professorId,
    },
  });

  if (subscribers.length === 0) {
    return;
  }

  for (const subscriber of subscribers) {
    const notification = await prisma.notification.findFirst({
      where: {
        recipientId: subscriber.userId,
        reviewId: reviewId,
      },
    });

    if (notification) {
      await deleteNotification(notification.id);
    }
  }
}
