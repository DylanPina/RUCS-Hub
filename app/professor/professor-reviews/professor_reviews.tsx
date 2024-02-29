"use client";

import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProfessorReview from "./professor_review";
import ProfessorReviewsSortBy from "./professor_reviews_sort_by";
import ProfessorReviewsFilterTerm from "./professor_reviews_filter_term";
import { getTermNameByValue } from "@/lib/utils";
import ProfessorReviewsFilterYear from "./professor_reviews_filter_year";
import ProfessorReviewsFilterCourse from "./professor_reviews_filter_course";
import ProfessorReviewsFilterSearch from "./professor_reviews_filter_search";

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

  const courses = [
    "Any",
    ...new Set(reviews.map((review: Review) => review.course.name)),
  ];

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
      const courseMatches = course === "Any" || review.course.name === course;
      const searchMatches =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      return yearMatches && termMatches && courseMatches && searchMatches;
    });

    setFilteredReviews(filtered);
  }, [sortBy, term, reviews, year, course, searchTerm]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <h3 className="text-xl text-primary-white font-bold mt-auto">
          Professor Reviews:
        </h3>
        <div className="flex place-content-between w-full space-y-1">
          <div className="max-sm:w-full sm:max-w-[300px] self-end">
            <ProfessorReviewsFilterSearch
              onFilterChange={(value: string) => setSearchTerm(value)}
              placeHolder="Filter reviews..."
            />
          </div>
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
            <ProfessorReviewsFilterCourse
              courses={courses}
              selectedCourse={course}
              onCourseChange={setCourse}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.length ? (
          filteredReviews.map((review: Review) => (
            <ProfessorReview key={review.id} review={review} />
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
