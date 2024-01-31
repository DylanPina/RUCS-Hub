import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient, User } from "@prisma/client";

const authOptions: AuthOptions = {
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
            email: profile.email,
          },
        });

        if (!getUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
            },
          });
        }

        return true;
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
