import { downvoteReview, upvoteReview } from "@/lib/data/review";
import { hashEmailAddress } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/auth_options";

export async function POST(req: any, res: any) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({ message: "You must be signed in to vote." });
  }

  if (req.method === "POST") {
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
          hashEmailAddress(session?.user?.email ?? ""),
          reviewId,
        );
      } else {
        vote = await downvoteReview(
          hashEmailAddress(session?.user?.email ?? ""),
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
  } else {
    res.setHeader("Allow", ["POST"]);
    Response.json(`Method ${req.method} Not Allowed`);
  }
}
