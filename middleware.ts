import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  console.log(`Session: ${JSON.stringify(session, null, 2)}`);
  if (!session?.user.email_verified) {
    return NextResponse.redirect(new URL("/verify", req.url));
  }
  return res;
});

export const config = {
  matcher: "/add-review",
};
