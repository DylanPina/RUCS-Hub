"use server";

import { prisma } from "@/prisma/prisma";
import { getAuth0Token } from "./auth";
import axios from "axios";
import { hashEmailAddress } from "../utils";
import { updateLastPasswordReset } from "../data/user";

/**
 * Deletes a user
 *
 * @param userId - The ID of the user
 */
export async function deleteUser(userAuthId: string, email: string) {
  const userId = hashEmailAddress(email);
  const token = await getAuth0Token();

  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userAuthId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);

  if (response.status !== 204) {
    throw new Error("Failed to delete user");
  }

  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

/**
 * Resets a user's password
 *
 * @param userEmail - The email of the user
 */
export async function resetPassword(userEmail: string) {
  const config = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
    headers: { "content-type": "application/json" },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      email: userEmail,
      connection: "Username-Password-Authentication",
    },
  };

  await axios(config);
  await updateLastPasswordReset(userEmail);
}

/**
 * Checks if a user has reviewed a course
 *
 * @param userEmail - The email of the user
 * @param courseCode - The code of the course
 */
export async function getIfUserReviewedCourse(
  userEmail: string,
  courseCode: number,
) {
  const userId = hashEmailAddress(userEmail);
  return await prisma.review.findFirst({
    where: {
      userId: userId,
      courseCode: courseCode,
    },
  });
}
