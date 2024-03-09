import NextAuth from "next-auth";
import { authOptions } from "../auth_options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
