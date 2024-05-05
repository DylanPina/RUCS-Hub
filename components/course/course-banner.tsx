import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { CoursePage } from "@/lib/definitions/course";
import CourseCharts from "../charts/course_charts";
import AddReviewBannerButton from "../reviews/add_review_banner_button";

interface Props {
  coursePage: CoursePage;
}

export default async function CourseBanner({ coursePage }: Props) {
  const {
    courseCode,
    courseName,
    rating,
    difficulty,
    workload,
    credits,
    reviews,
  } = coursePage;

  const totalDifficultyRatings = reviews.filter((review) => {
    return review.difficultyRating !== null;
  }).length;

  const totalWorkloadRatings = reviews.filter((review) => {
    return review.workload !== null;
  }).length;

  return (
    <div className="flex flex-col lg:flex-row justify-start lg:justify-between max-lg:space-y-3">
      <div className="flex w-full lg:w-1/2 bg-primary-red outline outline-1 outline-primary-white rounded py-3 px-4">
        <div className="flex flex-col place-content-between min-w-fit space-y-3">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl text-primary-black font-black">
              {courseName}
            </h1>
            <div className="flex flex-col space-y-1">
              <h3 className="text-md text-primary-white font-bold">
                Course Code: <span className="font-normal">{courseCode}</span>
              </h3>
              <h3 className="text-md text-primary-white font-bold">
                Credits: <span className="font-normal">{credits}</span>
              </h3>
              <h3 className="text-md text-primary-white font-bold">
                Reviews: {reviews.length}
              </h3>
              {reviews.length > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Rating:{" "}
                  <span className="font-normal">{rating.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/50 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs italic text-primary-white/50 font-normal">
                    based on{" "}
                    <span className="underline">{reviews.length} reviews</span>
                  </span>
                </h3>
              ) : (
                <h3 className="text-md text-primary-white font-bold">
                  Rating: <span className="font-normal">?</span>
                </h3>
              )}
              {totalDifficultyRatings > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Difficulty:{" "}
                  <span className="font-normal">{difficulty.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/50 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs italic text-primary-white/50 font-normal">
                    based on{" "}
                    <span className="underline font-normal">
                      {totalDifficultyRatings} reviews
                    </span>
                  </span>
                </h3>
              ) : (
                <h3 className="text-md text-primary-white font-bold">
                  Difficulty: <span className="font-normal">?</span>
                </h3>
              )}
              {totalWorkloadRatings > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Workload:{" "}
                  <span className="font-normal">
                    {workload.toFixed(1)} hours per week
                  </span>
                  <span className="text-xs italic text-primary-white/50 font-normal">
                    {" "}
                    based on{" "}
                    <span className="underline font-normal">
                      {totalWorkloadRatings} reviews
                    </span>
                  </span>
                </h3>
              ) : (
                <h3 className="text-md text-primary-white font-bold">
                  Workload: <span className="font-normal">?</span>
                </h3>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
              Compare Courses
            </Button>
            <AddReviewBannerButton courseCode={courseCode} />
          </div>
        </div>
      </div>
      <CourseCharts reviews={reviews} />
    </div>
  );
}
