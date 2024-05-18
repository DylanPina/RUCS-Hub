"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { createReport, getReportByUserAndReview } from "../data/report";
import { hashEmailAddress } from "../utils";

export async function submitReport(
  reviewId: number,
  category: string,
  content: string,
) {
  const session = await getSession();
  const userId = hashEmailAddress(session?.user.email);
  const alreadyReported = await getReportByUserAndReview(userId, reviewId);

  if (alreadyReported) {
    return null;
  }

  return await createReport(userId, reviewId, category, content);
}
