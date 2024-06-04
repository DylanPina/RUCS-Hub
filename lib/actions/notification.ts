"use server";

import { prisma } from "@/prisma/prisma";

/**
 * Marks a notification as read
 *
 * @param notificationId - ID of the notification
 */
export async function readNotification(notificationId: number) {
  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
}

/**
 * Marks multiple notifications as read
 *
 * @param notificationIds - IDs of the notifications
 */
export async function readNotifications(notificationIds: number[]) {
  await prisma.notification.updateMany({
    where: {
      id: {
        in: notificationIds,
      },
    },
    data: {
      read: true,
    },
  });
}

/**
 * Deletes a notification
 *
 * @param notificationId - ID of the notification to delete
 */
export async function deleteNotification(notificationId: number) {
  await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });
}

/**
 * Deletes multiple notifications
 *
 * @param notificationIds - IDs of the notifications to delete
 */
export async function deleteNotifications(notificationIds: number[]) {
  await prisma.notification.deleteMany({
    where: {
      id: {
        in: notificationIds,
      },
    },
  });
}
