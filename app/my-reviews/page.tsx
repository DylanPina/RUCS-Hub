import React from "react";
import MyReviews from "@/components/reviews/my-reviews";
import { getSession } from "@auth0/nextjs-auth0";
import { getReviewsByUser } from "@/lib/data/user";

export default async function Page() {
  const session = await getSession();
  const reviews = await getReviewsByUser(session?.user.email);

  return (
    <div className="flex flex-col space-y-4 w-full place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl text-primary-white font-bold">
        My Reviews
      </h1>
      <MyReviews reviews={reviews} user={session?.user} />
    </div>
  );
}
