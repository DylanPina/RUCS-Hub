"use client";

import React, { useState, useEffect } from "react";
import ReviewsFilterCourse from "../reviews/reviews-filter-course";
import ReviewsFilterProfessor from "../reviews/reviews_filter_professor";
import ReviewsSortBy from "../reviews/reviews-sort-by";
import ReviewsFilterSearch from "../reviews/reviews-filter-search";
import SubscriptionCard from "./subscription_card";
import { formatProfessorName } from "@/lib/utils";
import { Button } from "../shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface Props {
  user: any;
  subscriptions: any[];
}

export default function SubscriptionsTable({ user, subscriptions }: Props) {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<any[]>([]);
  const [paginatedSubscriptions, setPaginatedSubscriptions] = useState<any[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [course, setCourse] = useState("Any");
  const [courses, setCourses] = useState(["Any"]);
  const [professor, setProfessor] = useState("Any");
  const [professors, setProfessors] = useState(["Any"]);
  const [sortBy, setSortBy] = useState("newest");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  useEffect(() => {
    let sortedSubscriptions = [...subscriptions];

    if (sortBy === "newest") {
      sortedSubscriptions = sortSubscriptionsByNewest(sortedSubscriptions);
    } else if (sortBy === "oldest") {
      sortedSubscriptions = sortSubscriptionsByOldest(sortedSubscriptions);
    }

    const filtered = sortedSubscriptions.filter((subscription: any) => {
      const courseMatches =
        course === "Any" ||
        (subscription.review && subscription.review.course.name === course) ||
        (subscription.course && subscription.course.name === course);

      const professorMatches =
        professor === "Any" ||
        (subscription.review &&
          formatProfessorName(
            subscription.review.professor.lastName,
            subscription.review.professor.firstName,
          )) === professor ||
        (subscription.professor &&
          formatProfessorName(
            subscription.professor.lastName,
            subscription.professor.firstName,
          ) === professor);

      return courseMatches && professorMatches;
    });

    setFilteredSubscriptions(filtered);
    setPaginatedSubscriptions(filtered.slice(startIndex, endIndex));
  }, [
    sortBy,
    course,
    professor,
    courses,
    professors,
    subscriptions,
    startIndex,
    endIndex,
    rowsPerPage,
  ]);

  useEffect(() => {
    if (professor !== "Any") {
      const filteredCourses = Array.from(
        new Set(
          subscriptions
            .filter((subscription: any) => {
              return (
                subscription.review &&
                formatProfessorName(
                  subscription.review.professor.lastName,
                  subscription.review.professor.firstName,
                ) === professor
              );
            })
            .map((subscription: any) => subscription.review.course.name),
        ),
      );
      console.log(`Filtered courses: ${filteredCourses}`);
      setCourses(["Any"].concat(filteredCourses));
      if (!filteredCourses.includes(course)) {
        setCourse("Any");
      }
    } else {
      const uniqueCourses = Array.from(
        new Set(
          subscriptions.map(
            (subscription: any) =>
              subscription.review && subscription.review.course.name,
          ),
        ),
      );
      setCourses(["Any"].concat(uniqueCourses));
    }

    if (course !== "Any") {
      const filteredProfessors = Array.from(
        new Set(
          subscriptions
            .filter((subscription: any) => {
              return (
                subscription.review &&
                subscription.review.course.name === course
              );
            })
            .map((subscription: any) =>
              formatProfessorName(
                subscription.review.professor.lastName,
                subscription.review.professor.firstName,
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
          subscriptions.map(
            (subscription: any) =>
              subscription.review &&
              formatProfessorName(
                subscription.review.professor.lastName,
                subscription.review.professor.firstName,
              ),
          ),
        ),
      );
      setProfessors(["Any"].concat(uniqueProfessors));
    }
  }, [professor, course, subscriptions]);

  useEffect(() => {
    setPaginatedSubscriptions(
      filteredSubscriptions.slice(startIndex, endIndex),
    );
  }, [filteredSubscriptions]);

  function handleSearchTermChange(value: string) {
    setSearchTerm(value);
    setFilteredSubscriptions(
      subscriptions.filter((subscription) => {
        const lowerCaseValue = value.toLowerCase();
        return (
          (subscription.review &&
            ((subscription.review.professor.firstName &&
              subscription.review.professor.firstName
                .toLowerCase()
                .includes(lowerCaseValue)) ||
              (subscription.review.professor.lastName &&
                subscription.review.professor.lastName
                  .toLowerCase()
                  .includes(lowerCaseValue)) ||
              (subscription.review.title &&
                subscription.review.title
                  .toLowerCase()
                  .includes(lowerCaseValue)) ||
              (subscription.review.content &&
                subscription.review.content
                  .toLowerCase()
                  .includes(lowerCaseValue)))) ||
          (subscription.professor &&
            ((subscription.professor.firstName &&
              subscription.professor.firstName
                .toLowerCase()
                .includes(lowerCaseValue)) ||
              (subscription.professor.lastName &&
                subscription.professor.lastName
                  .toLowerCase()
                  .includes(lowerCaseValue)))) ||
          (subscription.course &&
            ((subscription.course.courseCode &&
              subscription.course.courseCode
                .toLowerCase()
                .includes(lowerCaseValue)) ||
              (subscription.course.name &&
                subscription.course.name
                  .toLowerCase()
                  .includes(lowerCaseValue))))
        );
      }),
    );
  }

  function handleRowsPerPageChange(value: string) {
    setRowsPerPage(parseInt(value));
    setStartIndex(0);
    setEndIndex(parseInt(value));
    setPaginatedSubscriptions(filteredSubscriptions.slice(0, parseInt(value)));
  }

  function sortSubscriptionsByNewest(subscriptions: any[]) {
    return subscriptions.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  function sortSubscriptionsByOldest(subscriptions: any[]) {
    return subscriptions.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
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
      filteredSubscriptions.length,
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }

  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="flex flex-col max-sm:space-y-3">
        <div className="flex max-lg:flex-col lg:space-x-2 max-lg:space-y-3 place-content-between w-full space-y-1">
          <div className="flex-col space-y-3 w-full lg:max-w-[275px] self-end">
            <ReviewsFilterSearch
              onFilterChange={handleSearchTermChange}
              placeHolder="Search subscriptions..."
              defaultValue=""
            />
          </div>
          <div className="flex lg:self-end max-lg:flex-col lg:space-x-2 max-lg:space-y-3">
            <div className="flex lg:space-x-2 max-lg:space-y-3 max-lg:flex-col max-lg:w-full">
              <ReviewsFilterCourse
                courses={courses}
                selectedCourse={course}
                onCourseChange={setCourse}
              />
              <ReviewsFilterProfessor
                professors={professors}
                selectedProfessor={professor}
                onProfessorChange={setProfessor}
              />
            </div>
            <div className="flex max-lg:w-full">
              <ReviewsSortBy
                selectedValue={sortBy}
                onSelectChange={(value) => setSortBy(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {filteredSubscriptions.length > 0 ? (
          paginatedSubscriptions.map((subscription: any) => (
            <SubscriptionCard
              key={subscription.id}
              user={user}
              subscription={subscription}
            />
          ))
        ) : (
          <p className="font-bold text-primary-red">No subscriptions found</p>
        )}
      </div>
      {filteredSubscriptions.length > 0 && (
        <div className="flex max-sm:flex-col max-sm:place-content-start sm:place-content-between sm:space-x-2 max-sm:space-y-4 w-full">
          <div className="flex space-x-4">
            <span className="flex items-center text-sm font-semibold align-top">
              {` Page ${startIndex / rowsPerPage + 1} of ${Math.ceil(
                filteredSubscriptions.length / rowsPerPage,
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
              disabled={endIndex >= filteredSubscriptions.length}
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
