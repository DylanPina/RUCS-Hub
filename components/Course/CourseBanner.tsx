import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { CoursePage } from "@/lib/definitions/course";
import ChartCourse from "../Chart/ChartCourse";
import AddReviewBannerButton from "../Review/ReviewAddBannerButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { getSession } from "@auth0/nextjs-auth0";
import NotificationCourseBanner from "../Notification/NotificationCourseBanner";

interface Props {
  coursePage: CoursePage;
}

export default async function CourseBanner({ coursePage }: Props) {
  const session = await getSession();
  const { subjectCode, code, name, rating, difficulty, workload, reviews } =
    coursePage;

  const totalDifficultyRatings = reviews.filter((review) => {
    return review.difficultyRating !== null;
  }).length;

  const totalWorkloadRatings = reviews.filter((review) => {
    return review.workload !== null;
  }).length;

  return (
    <div className="flex flex-col lg:flex-row justify-start lg:justify-between max-lg:space-y-3">
      <div className="flex w-full lg:w-1/2 bg-primary-red border border-primary-white rounded overflow-hidden py-3 px-4">
        <div className="flex flex-col place-content-between min-w-fit w-full space-y-3 relative">
          <div className="flex flex-col space-y-1">
            {session?.user && (
              <div className="absolute top-0 right-0">
                <NotificationCourseBanner
                  user={session?.user}
                  coursePage={coursePage}
                />
              </div>
            )}
            <h1 className="text-xl max-w-[95%] text-wrap max-md:text-lg text-primary-black font-black">
              {subjectCode}:{code} - {name}
            </h1>
            <div className="flex flex-col space-y-1">
              <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                Reviews: <span className="font-normal">{reviews.length}</span>
              </h3>
              {reviews.length > 0 ? (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Rating:{" "}
                  <span className="font-normal">{rating.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/80 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs text-primary-white/80 font-normal">
                    based on {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </h3>
              ) : (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Rating: <span className="font-normal">?</span>
                </h3>
              )}
              {totalDifficultyRatings > 0 ? (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Difficulty:{" "}
                  <span className="font-normal">{difficulty.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/80 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs text-primary-white/80 font-normal">
                    based on {totalDifficultyRatings}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </h3>
              ) : (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Difficulty: <span className="font-normal">?</span>
                </h3>
              )}
              {totalWorkloadRatings > 0 ? (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Workload:{" "}
                  <span className="font-normal">
                    {workload.toFixed(1)} {workload > 1 ? "hrs" : "hr"} per week
                  </span>
                  <span className="text-xs text-primary-white/80 font-normal">
                    {" "}
                    based on {totalWorkloadRatings}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </h3>
              ) : (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Workload: <span className="font-normal">?</span>
                </h3>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <AddReviewBannerButton
              subjectCode={subjectCode}
              courseCode={code}
            />
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <Button className="max-w-fit text-xs cursor-not-allowed transition-all duration-150 bg-primary-black/80 text-primary-white/80 hover:bg-primary-black/80">
                    Compare Courses
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Coming soon...</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <ChartCourse reviews={reviews} />
    </div>
  );
}
