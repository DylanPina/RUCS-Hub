"use server";

import { prisma } from "@/prisma/prisma";
import { getAuth0Token } from "./auth";
import axios from "axios";
import { hashEmailAddress } from "../utils";

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
