import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase } from "@/lib/utils";
import ChartProfessor from "@/components/Chart/ChartProfessor";
import CurrentlyTeaching from "@/components/Professor/ProfessorCurrentlyTeaching";
import { getCoursesBeingTaughtByProfessor } from "@/lib/data/course";
import ReviewAddBannerButton from "@/components/Review/ReviewAddBannerButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import NotificationProfessorBanner from "@/components/Notification/NotificationProfessorBanner";
import { getSession } from "@auth0/nextjs-auth0";

interface Props {
  professor: ProfessorPage;
}

export default async function ProfessorBanner({ professor }: Props) {
  const session = await getSession();
  const { firstName, lastName, overall, difficulty, reviews } = professor;
  const name = `${titleCase(firstName)} ${titleCase(lastName)}`;
  const totalOverallRatings = reviews.filter(
    (review) => review.professorQualityRating !== null,
  ).length;
  const totalDifficultyRatings = reviews.filter(
    (review) => review.professorDifficultyRating !== null,
  ).length;

  const currentlyTeaching = await getCoursesBeingTaughtByProfessor(
    professor.id,
  );

  return (
    <div className="flex flex-col lg:flex-row justify-start lg:justify-between max-lg:space-y-3">
      <div className="flex w-full lg:w-1/2 bg-primary-red border border-primary-white rounded overflow-hidden py-3 px-4">
        <div className="flex flex-col place-content-between min-w-fit w-full space-y-3 relative">
          <div className="flex flex-col space-y-1">
            {session?.user && (
              <div className="absolute top-0 right-0">
                <NotificationProfessorBanner
                  user={session?.user}
                  professor={professor}
                />
              </div>
            )}
            <h1 className="text-xl max-w-[95%] text-wrap max-md:text-lg text-primary-black font-black">
              {name}
            </h1>
            <div className="flex flex-col space-y-1">
              <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                Reviews: <span className="font-normal">{reviews.length}</span>
              </h3>
              {totalOverallRatings > 0 ? (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Overall:{" "}
                  <span className="font-normal">{overall.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/80 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs text-primary-white/80 font-normal">
                    based on {totalOverallRatings}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </h3>
              ) : (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Overall: <span className="not-italic">?</span>
                </h3>
              )}
              {totalDifficultyRatings > 0 ? (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Difficulty:{" "}
                  <span className="font-normal">{difficulty.toFixed(1)}</span>
                  <span className="text-xs text-primary-white/70 font-normal">
                    /10
                  </span>{" "}
                  <span className="text-xs text-primary-white/70 font-normal">
                    based on {totalDifficultyRatings}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </h3>
              ) : (
                <h3 className="text-md max-md:text-sm text-primary-white font-bold">
                  Difficulty: <span className="font-normal">?</span>
                </h3>
              )}
              <CurrentlyTeaching currentlyTeaching={currentlyTeaching} />
            </div>
          </div>
          <div className="flex space-x-2">
            <ReviewAddBannerButton professorId={professor.id} />
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <Button className="max-w-fit text-xs cursor-not-allowed transition-all duration-150 bg-primary-black/80 text-primary-white/80 hover:bg-primary-black/80">
                    Compare Professors
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Coming soon...</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <ChartProfessor reviews={reviews} />
    </div>
  );
}
