import React from "react";
import ReviewList from "@/components/Review/ReviewList";
import { getSession } from "@auth0/nextjs-auth0";
import { getReviewsByUser } from "@/lib/data/user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Reviews",
};

export default async function Page() {
  const session = await getSession();
  const reviews = await getReviewsByUser(session?.user.email);

  return (
    <div className="flex flex-col space-y-4 w-full place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl text-primary-white font-bold">
        My Reviews
      </h1>
      <ReviewList reviews={reviews} user={session?.user} />
    </div>
  );
}
