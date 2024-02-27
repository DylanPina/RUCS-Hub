"use client";

import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProfessorReview from "./professor_review";
import ProfessorReviewSortBy from "./professor_review_sort_by";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function ProfessorReviews({ reviews }: ProfessorReviewProps) {
  const [sortBy, setSortBy] = useState("newest");

  function sortReviewsByNewest(reviews: Review[]) {
    return reviews.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  function sortReviewsByOldest(reviews: Review[]) {
    return reviews.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  function sortReviewsByUpvotes(reviews: Review[]) {
    return reviews.sort((a, b) => {
      const upvotesA = a.upvotes ?? 0;
      const upvotesB = b.upvotes ?? 0;

      if (upvotesA > upvotesB) {
        return -1;
      }
      if (upvotesA < upvotesB) {
        return 1;
      }
      return 0;
    });
  }

  function sortReviewsByDownvotes(reviews: Review[]) {
    return reviews.sort((a, b) => {
      const downvotesA = a.downvotes ?? 0;
      const downvotesB = b.downvotes ?? 0;

      if (downvotesA > downvotesB) {
        return -1;
      }
      if (downvotesA < downvotesB) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (sortBy === "newest") {
      sortReviewsByNewest(reviews);
    } else if (sortBy === "oldest") {
      sortReviewsByOldest(reviews);
    } else if (sortBy === "upvotes") {
      sortReviewsByUpvotes(reviews);
    } else if (sortBy === "downvotes") {
      sortReviewsByDownvotes(reviews);
    }
  }, [sortBy, reviews]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex place-content-between space-x-4">
        <h3 className="text-xl text-primary-white font-bold mt-auto">
          Professor Reviews:
        </h3>
        <div className="flex space-x-2">
          <ProfessorReviewSortBy
            selectedValue={sortBy}
            onSelectChange={(value) => setSortBy(value)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {reviews.map((review: Review) => (
          <ProfessorReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
