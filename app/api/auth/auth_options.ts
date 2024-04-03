import GoogleProvider from "next-auth/providers/google";
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
      return (
        (account?.provider === "google" &&
          profile?.email?.endsWith("rutgers.edu")) ??
        false
      );
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
