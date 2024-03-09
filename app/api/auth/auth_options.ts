import GoogleProvider from "next-auth/providers/google";
import { PrismaClient, User } from "@prisma/client";
import { hashEmailAddress } from "@/lib/utils";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }): Promise<boolean> {
      if (
        account?.provider === "google" &&
        profile?.email?.endsWith("rutgers.edu")
      ) {
        const prisma = new PrismaClient();

        const getUser: User | null = await prisma.user.findUnique({
          where: {
            id: hashEmailAddress(profile.email),
          },
        });

        if (!getUser) {
          await prisma.user.create({
            data: {
              id: hashEmailAddress(profile.email),
            },
          });
        }

        return true;
      }
      return false;
    },
  },
};
