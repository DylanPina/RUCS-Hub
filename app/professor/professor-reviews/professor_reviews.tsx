"use client";

import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProfessorReview from "./professor_review";
import ProfessorReviewsSortBy from "./professor_reviews_sort_by";
import ProfessorReviewsFilterTerm from "./professor_reviews_filter_term";
import { getTermNameByValue } from "@/lib/utils";
import ProfessorReviewsFilterYear from "./professor_reviews_filter_year";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function ProfessorReviews({ reviews }: ProfessorReviewProps) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [sortBy, setSortBy] = useState("newest");
  const [year, setYear] = useState("Any");
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
    let sortedReviews = [...reviews];

    if (sortBy === "newest") {
      sortedReviews = sortReviewsByNewest(sortedReviews);
    } else if (sortBy === "oldest") {
      sortedReviews = sortReviewsByOldest(sortedReviews);
    } else if (sortBy === "upvotes") {
      sortedReviews = sortReviewsByUpvotes(sortedReviews);
    } else if (sortBy === "downvotes") {
      sortedReviews = sortReviewsByDownvotes(sortedReviews);
    }

    const filtered = sortedReviews.filter((review) => {
      const yearMatches =
        year === "Any" || review.year.toString() === year.toString();
      const termMatches =
        term === "Any" || getTermNameByValue(review.semester) === term;
      return yearMatches && termMatches;
    });

    setFilteredReviews(filtered);
  }, [sortBy, term, reviews, year]);

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
          <ProfessorReviewsFilterYear
            selectedYear={year}
            onYearChange={setYear}
          />
          <ProfessorReviewsFilterTerm
            selectedTerm={term}
            onTermChange={setTerm}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.length ? (
          filteredReviews.map((review: Review) => (
            <ProfessorReview key={review.id} review={review} />
          ))
        ) : reviews.length ? (
          <p className="font-bold text-primary-red">
            No reviews found for the{" "}
            <span className="underline">
              {term}
              {year ? " " + year : ""}
            </span>{" "}
            term
          </p>
        ) : (
          <p className="font-bold text-primary-red">No reviews found</p>
        )}
      </div>
    </div>
  );
}
