"use client";

import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProfessorReview from "./professor_review";
import ProfessorReviewsSortBy from "./professor_reviews_sort_by";
import ProfessorReviewsFilterTerm from "./professor_reviews_filter_term";
import { getTermNameByValue } from "@/lib/utils";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function ProfessorReviews({ reviews }: ProfessorReviewProps) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [sortBy, setSortBy] = useState("newest");
  const [term, setTerm] = useState("Any");

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

    if (term === "Any") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(
        reviews.filter(
          (review) => getTermNameByValue(review.semester) === term,
        ),
      );
    }
  }, [sortBy, term, reviews]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex place-content-between space-x-4">
        <h3 className="text-xl text-primary-white font-bold mt-auto">
          Professor Reviews:
        </h3>
        <div className="flex space-x-2">
          <ProfessorReviewsSortBy
            selectedValue={sortBy}
            onSelectChange={(value) => setSortBy(value)}
          />
          <ProfessorReviewsFilterTerm
            selectedTerm={term}
            onTermChange={setTerm}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.map((review: Review) => (
          <ProfessorReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
