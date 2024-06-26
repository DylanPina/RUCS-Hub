import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (
    !session?.user.email_verified &&
    (req.nextUrl.pathname === "/add-review" ||
      req.nextUrl.pathname === "/my-reviews")
  ) {
    return NextResponse.redirect(new URL("/verify", req.url));
  }

  return res;
});

export const config = {
  matcher: ["/add-review", "/my-reviews", "/profile", "/edit-notifications"],
};
