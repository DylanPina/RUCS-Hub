"use client";

import React, { useEffect, useState } from "react";
import TableFilterCourse from "@/components/table/table_filter_course";
import TableFilterSearch from "@/components/table/table_filter_search";
import TableFilterTerm from "@/components/table/table_filter_term";
import TableFilterYear from "@/components/table/table_filter_year";
import { formatProfessorName, getTermNameByValue } from "@/lib/utils";
import { Review } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Button } from "@/components/shadcn/ui/button";
import ReviewCard from "./review-card";
import TableFilterProfessor from "../table/table_filter_professor";
import { useSearchParams } from "next/navigation";
import TableSortBy from "../table/table_sort_by";

interface Props {
  reviews: Review[];
  user: any;
}

export default function MyReviews({ reviews, user }: Props) {
  const searchParams = useSearchParams();
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [paginatedReviews, setPaginatedReviews] = useState(reviews);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? "",
  );
  const [sortBy, setSortBy] = useState("newest");
  const [year, setYear] = useState("Any");
  const [years, setYears] = useState<any>([]);
  const [term, setTerm] = useState("Any");
  const [terms, setTerms] = useState<any>([]);
  const [course, setCourse] = useState("Any");
  const [courses, setCourses] = useState(["Any"]);
  const [professor, setProfessor] = useState(
    searchParams.get("professor") ?? "Any",
  );
  const [professors, setProfessors] = useState(["Any"]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

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
    return reviews.sort((a: any, b: any) => {
      const upvotesA = a.votes.filter((vote: any) => vote.upvote).length ?? 0;
      const upvotesB = b.votes.filter((vote: any) => vote.upvote).length ?? 0;

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
    return reviews.sort((a: any, b: any) => {
      const downvotesA =
        a.votes.filter((vote: any) => !vote.upvote).length ?? 0;
      const downvotesB =
        b.votes.filter((vote: any) => !vote.upvote).length ?? 0;

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
    setTerms(reviews.map((review: any) => getTermNameByValue(review.semester)));
    setYears(reviews.map((review: any) => review.year));
  }, [reviews]);

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

    const filtered = sortedReviews.filter((review: any) => {
      const yearMatches =
        year === "Any" || review.year.toString() === year.toString();
      const termMatches =
        term === "Any" || getTermNameByValue(review.semester) === term;
      const courseMatches = course === "Any" || review.course.name === course;
      const professorMatches =
        professor === "Any" ||
        formatProfessorName(
          review.professor.lastName,
          review.professor.firstName,
        ) === professor;
      const searchMatches =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      return (
        yearMatches &&
        termMatches &&
        courseMatches &&
        professorMatches &&
        searchMatches
      );
    });

    setFilteredReviews(filtered);
    setPaginatedReviews(filtered.slice(startIndex, endIndex));
  }, [
    user?.email,
    sortBy,
    term,
    reviews,
    year,
    course,
    professor,
    searchTerm,
    startIndex,
    endIndex,
  ]);

  useEffect(() => {
    if (course !== "Any") {
      const filteredProfessors = Array.from(
        new Set(
          reviews
            .filter((review: any) => review.course.name === course)
            .map((review: any) =>
              formatProfessorName(
                review.professor.lastName,
                review.professor.firstName,
              ),
            ),
        ),
      );
      setProfessors(["Any"].concat(filteredProfessors));
      if (!filteredProfessors.includes(professor)) {
        setProfessor("Any");
      }
    } else {
      const uniqueProfessors = Array.from(
        new Set(
          reviews.map((review: any) =>
            formatProfessorName(
              review.professor.lastName,
              review.professor.firstName,
            ),
          ),
        ),
      );
      setProfessors(["Any"].concat(uniqueProfessors));
    }
  }, [course, reviews, professor]);

  useEffect(() => {
    if (professor !== "Any") {
      const filteredCourses = Array.from(
        new Set(
          reviews
            .filter(
              (review: any) =>
                formatProfessorName(
                  review.professor.lastName,
                  review.professor.firstName,
                ) === professor,
            )
            .map((review: any) => review.course.name),
        ),
      );
      setCourses(["Any"].concat(filteredCourses));
      if (!filteredCourses.includes(course)) {
        setCourse("Any");
      }
    } else {
      const uniqueCourses = Array.from(
        new Set(reviews.map((review: any) => review.course.name)),
      );
      setCourses(["Any"].concat(uniqueCourses));
    }
  }, [professor, reviews, course]);

  useEffect(() => {
    if (searchParams.get("searchTerm")) {
      handleSearchTermChange(searchParams.get("searchTerm") ?? "");
    }
  }, [searchParams]);

  function noReviewsMessage() {
    if (reviews.length > 0 && !searchTerm) {
      const isAnyTermOrYear =
        (term === "Any" || !term) && (year === "Any" || !year);
      const messageParts = [];

      if (term && term !== "Any") {
        messageParts.push(`the ${term}`);
      }
      if (year && year !== "Any") {
        messageParts.push(year);
      }
      const message = messageParts.join(" ");

      return (
        <p className="font-bold text-primary-red">
          No reviews found for{" "}
          {messageParts.length > 0 ? (
            <span className="underline">{message}</span>
          ) : (
            ""
          )}{" "}
          {isAnyTermOrYear ? "" : "term"}
          {isAnyTermOrYear ? "s" : ""}
        </p>
      );
    } else {
      return <p className="font-bold text-primary-red">No reviews found</p>;
    }
  }

  function handleSearchTermChange(value: string) {
    setSearchTerm(value);
    setStartIndex(0);
    setEndIndex(rowsPerPage);
  }

  function handleRowsPerPageChange(value: string) {
    setRowsPerPage(parseInt(value));
    setStartIndex(0);
    setEndIndex(parseInt(value));
    setPaginatedReviews(filteredReviews.slice(0, parseInt(value)));
  }

  function handlePrev() {
    const newStartIndex = Math.max(startIndex - rowsPerPage, 0);
    const newEndIndex = Math.max(endIndex - rowsPerPage, rowsPerPage);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }

  function handleNext() {
    const newStartIndex = startIndex + rowsPerPage;
    const newEndIndex = Math.min(
      endIndex + rowsPerPage,
      filteredReviews.length,
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }

  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="flex flex-col max-sm:space-y-3">
        <div className="flex max-lg:flex-col lg:space-x-2 max-lg:space-y-3 place-content-between w-full space-y-1">
          <div className="flex-col space-y-3 max-lg:w-full lg:max-w-[300px] self-end">
            <TableFilterSearch
              filter={searchTerm}
              setFilter={handleSearchTermChange}
              placeHolder="Search reviews..."
            />
          </div>
          <div className="flex lg:self-end max-lg:flex-col lg:space-x-2 max-lg:space-y-3">
            <div className="flex lg:space-x-2 max-lg:space-y-3 max-lg:flex-col max-lg:w-full">
              <TableFilterCourse
                courses={courses}
                selectedCourse={course}
                onCourseChange={setCourse}
              />
              <TableFilterProfessor
                professors={professors}
                selectedProfessor={professor}
                onProfessorChange={setProfessor}
              />
            </div>
            <div className="flex space-x-2 w-full">
              <TableFilterYear
                selectedYear={year}
                onYearChange={setYear}
                years={years}
              />
              <TableFilterTerm
                selectedTerm={term}
                onTermChange={setTerm}
                terms={terms}
              />
              <TableSortBy
                selectedValue={sortBy}
                options={[
                  ["newest", "Newest"],
                  ["oldest", "Oldest"],
                  ["upvote", "Upvote"],
                  ["downvote", "Downvote"],
                ]}
                onSelectChange={(value: any) => setSortBy(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.length > 0
          ? paginatedReviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))
          : noReviewsMessage()}
      </div>

      {filteredReviews.length > 0 && (
        <div className="flex max-sm:flex-col max-sm:place-content-start sm:place-content-between sm:space-x-2 max-sm:space-y-4 w-full">
          <div className="flex space-x-4">
            <span className="flex items-center text-sm font-semibold align-top">
              {` Page ${startIndex / rowsPerPage + 1} of ${Math.ceil(
                filteredReviews.length / rowsPerPage,
              )}`}
            </span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={handleRowsPerPageChange}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select a year..." />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20, 25].map((pageSize: number) => (
                  <SelectItem value={pageSize.toString()} key={pageSize}>
                    Show {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handlePrev();
              }}
              disabled={startIndex === 0}
              className="bg-primary-white text-primary-black hover:bg-primary-red border-0 disabled:bg-primary-white/90 transition duration-150 ease-out hover:ease-in"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleNext();
              }}
              disabled={endIndex >= filteredReviews.length}
              className="bg-primary-white text-primary-black hover:bg-primary-red border-0 disabled:bg-primary-white/90 transition duration-150 ease-out hover:ease-in"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
