"use client";

import React, { useEffect, useState } from "react";
import { getTermNameByValue } from "@/lib/utils";
import { Review } from "@/lib/definitions/review";
import { Vote } from "@/lib/definitions/vote";
import ReviewsSortBy from "@/components/reviews/reviews-sort-by";
import ReviewsFilterCourse from "@/components/reviews/reviews-filter-course";
import ReviewsFilterTerm from "@/components/reviews/reviews-filter-term";
import ReviewsFilterYear from "@/components/reviews/reviews-filter-year";
import ReviewsFilterSearch from "@/components/reviews/reviews-filter-search";
import ReviewCard from "@/components/reviews/review-card";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function ProfessorReviews({ reviews }: ProfessorReviewProps) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [year, setYear] = useState("Any");
  const [term, setTerm] = useState("Any");
  const [course, setCourse] = useState("Any");

  const courses: string[] = ["Any"].concat(
    Array.from(new Set(reviews.map((review: Review) => review.course.name))),
  );

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
      const courseMatches = course === "Any" || review.course.name === course;
      const searchMatches =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      return yearMatches && termMatches && courseMatches && searchMatches;
    });

    setFilteredReviews(filtered);
  }, [sortBy, term, reviews, year, course, searchTerm]);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col max-sm:space-y-3">
        <div className="flex max-sm:flex-col max-sm:space-y-3 place-content-between w-full space-y-1">
          <div className="flex-col space-y-3 max-sm:w-full sm:max-w-[300px] self-end">
            <h3 className="text-lg text-primary-white font-bold mt-auto">
              Professor Reviews:
            </h3>
            <ReviewsFilterSearch
              onFilterChange={(value: string) => setSearchTerm(value)}
              placeHolder="Filter reviews..."
            />
          </div>
          <div className="flex max-sm:place-self-start self-end space-x-2">
            <ReviewsFilterCourse
              courses={courses}
              selectedCourse={course}
              onCourseChange={setCourse}
            />
            <ReviewsFilterYear selectedYear={year} onYearChange={setYear} />
            <ReviewsFilterTerm selectedTerm={term} onTermChange={setTerm} />
            <ReviewsSortBy
              selectedValue={sortBy}
              onSelectChange={(value) => setSortBy(value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.length ? (
          filteredReviews.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : reviews.length && !searchTerm ? (
          <p className="font-bold text-primary-red">
            No reviews found for{" "}
            {course && course !== "Any" && (
              <span>
                <span className="underline">{course}</span>
                {" in "}
              </span>
            )}
            {term && term !== "Any" && "the"}{" "}
            <span className="underline">
              {term && term !== "Any" ? term : ""}
              {year && year !== "Any" ? " " + year : ""}
            </span>{" "}
            term
            {(year && year === "Any") || (term && term === "Any") ? "s" : ""}
          </p>
        ) : (
          <p className="font-bold text-primary-red">No reviews found</p>
        )}
      </div>
    </div>
  );
}
