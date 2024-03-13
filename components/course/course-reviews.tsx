"use client";

import React, { useEffect, useState } from "react";
import { getTermNameByValue } from "@/lib/utils";
import { Review } from "@/lib/definitions/review";
import { Vote } from "@/lib/definitions/vote";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function CourseReviews({ reviews }: ProfessorReviewProps) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [searchTerm, setSearchTerm] = useState("");
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
      const upvotesA = a.votes.filter((vote: Vote) => vote.upvote).length ?? 0;
      const upvotesB = b.votes.filter((vote: Vote) => vote.upvote).length ?? 0;

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
      const downvotesA =
        a.votes.filter((vote: Vote) => !vote.upvote).length ?? 0;
      const downvotesB =
        b.votes.filter((vote: Vote) => !vote.upvote).length ?? 0;

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
      const searchMatches =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      return yearMatches && termMatches && searchMatches;
    });

    setFilteredReviews(filtered);
  }, [sortBy, term, reviews, year, searchTerm]);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col max-sm:space-y-3">
        <div className="flex max-sm:flex-col max-sm:space-y-3 place-content-between w-full space-y-1">
          <div className="flex-col space-y-3 max-sm:w-full sm:max-w-[300px] self-end"></div>
        </div>
      </div>
    </div>
  );
}
