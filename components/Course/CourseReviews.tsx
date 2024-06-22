"use client";

import React, { useEffect, useState } from "react";
import { formatProfessorName, getTermNameByValue } from "@/lib/utils";
import { Review } from "@/lib/definitions/review";
import ReviewCard from "@/components/Review/ReviewCard";
import { Button } from "../shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useUser } from "@auth0/nextjs-auth0/client";
import TableSortBy from "../Table/TableSortBy";
import TableFilterYear from "../Table/TableFilterYear";
import TableFilterTerm from "../Table/TableFilterTerm";
import TableFilterProfessor from "../Table/TableFilterProfessor";
import TableFilterSearch from "../Table/TableFilterSearch";

interface ProfessorReviewProps {
  reviews: Review[];
}

export default function CourseReviews({ reviews }: ProfessorReviewProps) {
  const { user } = useUser();
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [paginatedReviews, setPaginatedReviews] = useState(reviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [year, setYear] = useState("Any");
  const [years, setYears] = useState<any>([]);
  const [term, setTerm] = useState("Any");
  const [terms, setTerms] = useState<any>([]);
  const [professor, setProfessor] = useState("Any");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const professors: string[] = ["Any"].concat(
    Array.from(
      new Set(
        reviews.map((review: Review) =>
          formatProfessorName(
            review.professor?.lastName ?? "",
            review.professor?.firstName ?? "",
          ),
        ),
      ),
    ),
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
    return reviews.sort((a: Review, b: Review) => {
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
    return reviews.sort((a, b) => {
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

    const filtered = sortedReviews.filter((review) => {
      const yearMatches =
        year === "Any" || review.year.toString() === year.toString();
      const termMatches =
        term === "Any" || getTermNameByValue(review.semester) === term;
      const professorMatches =
        professor === "Any" ||
        formatProfessorName(
          review.professor?.lastName ?? "",
          review.professor?.firstName ?? "",
        ) === professor;
      const searchMatches =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      return yearMatches && professorMatches && termMatches && searchMatches;
    });

    setFilteredReviews(filtered);
    setPaginatedReviews(filtered.slice(startIndex, endIndex));
  }, [
    user?.email,
    sortBy,
    term,
    professor,
    reviews,
    year,
    searchTerm,
    startIndex,
    endIndex,
  ]);

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
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col max-sm:space-y-3">
        <div className="flex max-lg:flex-col max-lg:space-y-3 place-content-between w-full space-y-1">
          <div className="flex-col space-y-3 w-full lg:max-w-[300px] self-end">
            <h3 className="text-lg text-primary-white font-bold mt-auto">
              Course Reviews:
            </h3>
            <TableFilterSearch
              filter={searchTerm}
              setFilter={handleSearchTermChange}
              placeHolder="Filter reviews..."
            />
          </div>
          <div className="flex lg:self-end max-lg:flex-col lg:space-x-2 max-lg:space-y-3">
            <div className="lg:w-full">
              <TableFilterProfessor
                professors={professors}
                selectedProfessor={professor}
                onProfessorChange={setProfessor}
              />
            </div>
            <div className="flex space-x-2">
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
                onSelectChange={(value) => setSortBy(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredReviews.length > 0
          ? paginatedReviews.map((review) => (
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
