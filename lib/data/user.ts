import axios from "axios";
import { prisma } from "@/prisma/prisma";
import { hashEmailAddress } from "@/lib/utils";
import { getAuth0Token } from "../actions/auth";

export async function createUser(userEmail: string) {
  const userId = hashEmailAddress(userEmail);
  return await prisma.user.create({
    data: {
      id: userId,
    },
  });
}

export async function getUser(userEmail: string) {
  const userId = hashEmailAddress(userEmail);
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserByAuth0Id(userId: string) {
  const token = await getAuth0Token();

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response.data;
}

export async function getLastEmailVerification(userEmail: string) {
  const userId = hashEmailAddress(userEmail);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      lastEmailVerification: true,
    },
  });

  return user?.lastEmailVerification;
}

export async function updateLastEmailVerification(userEmail: string) {
  const userId = hashEmailAddress(userEmail);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastEmailVerification: new Date(),
    },
  });

  return user;
}

export async function getLastPasswordReset(userEmail: string) {
  const userId = hashEmailAddress(userEmail);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      lastPasswordReset: true,
    },
  });

  return user?.lastPasswordReset;
}

export async function updateLastPasswordReset(userEmail: string) {
  const userId = hashEmailAddress(userEmail);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastPasswordReset: new Date(),
    },
  });

  return user;
}

export async function getReviewsByUser(userEmail: string) {
  const userId = hashEmailAddress(userEmail);
  return await prisma.review.findMany({
    where: {
      userId: userId,
    },
    include: {
      votes: true,
      course: true,
      professor: true,
    },
  });
}
