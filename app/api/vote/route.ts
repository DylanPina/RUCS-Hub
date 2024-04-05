import { downvoteReview, upvoteReview } from "@/lib/data/review";
import { hashEmailAddress } from "@/lib/utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const POST = withApiAuthRequired(async function Protected(req: any) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  const { reviewId, upvote } = await req.json();

  if (!reviewId) {
    return Response.json({ message: "Review ID must be provided." });
  }

  if (upvote === undefined) {
    return Response.json({ message: "Upvote value must be provided." });
  }

  try {
    let vote = null;

    if (upvote) {
      vote = await upvoteReview(
        hashEmailAddress(session?.user.email ?? ""),
        reviewId,
      );
    } else {
      vote = await downvoteReview(
        hashEmailAddress(session?.user.email ?? ""),
        reviewId,
      );
    }

    if (!vote) {
      return Response.json({ error: "Error upvoting review" });
    }

    return Response.json({ vote });
  } catch (error) {
    console.error("Request error:", error);
    Response.json({ error: "Error creating vote" });
  }
});

export { POST };
