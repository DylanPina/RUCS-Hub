import { prisma } from "@/prisma/prisma";
import { hashEmailAddress } from "@/lib/utils";

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
