import { Review } from "@prisma/client";
import React from "react";
import ProfessorReview from "./professor_review";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function ProfessorReviews({ reviews }: ProfessorReviewProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="text-xl text-primary-white font-bold">
          Professor Reviews:
        </h3>
      </div>
      <div className="flex flex-col space-y-3">
        {reviews.map((review: Review) => (
          <ProfessorReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
