import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase } from "@/lib/utils";
import ProfessorCharts from "@/components/charts/professor_charts";
import CurrentlyTeaching from "@/components/professor/currently_teaching";
import { getCoursesBeingTaughtByProfessor } from "@/lib/data/course";
import AddReviewBannerButton from "@/components/reviews/add_review_banner_button";

interface Props {
  professor: ProfessorPage;
}

export default async function ProfessorBanner({ professor }: Props) {
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
        <div className="flex flex-col place-content-between min-w-fit space-y-3">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl text-primary-black font-black">{name}</h1>
            <div className="flex flex-col space-y-1">
              {totalOverallRatings > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Overall:{" "}
                  <span className="font-normal">{overall.toFixed(1)}</span>
                  <span className="font-normal">/10</span>{" "}
                  <span className="text-xs italic text-primary-white/50">
                    based on{" "}
                    <span className="underline">
                      {totalOverallRatings} reviews
                    </span>
                  </span>
                </h3>
              ) : (
                <h3 className="text-md text-primary-white font-bold">
                  Overall: <span className="not-italic">?</span>
                </h3>
              )}
              {totalDifficultyRatings > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Difficulty:{" "}
                  <span className="font-normal">{difficulty.toFixed(1)}</span>
                  <span className="font-normal">/10</span>{" "}
                  <span className="text-xs italic text-primary-white/50">
                    based on{" "}
                    <span className="underline">
                      {totalDifficultyRatings} reviews
                    </span>
                  </span>
                </h3>
              ) : (
                <h3 className="text-md text-primary-white font-bold">
                  Difficulty: <span className="font-normal">?</span>
                </h3>
              )}
              <h3 className="text-md text-primary-white font-bold">
                Reviews: <span className="font-normal">{reviews.length}</span>
              </h3>
              <CurrentlyTeaching currentlyTeaching={currentlyTeaching} />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
              Compare professors
            </Button>
            <AddReviewBannerButton professorId={professor.id} />
          </div>
        </div>
      </div>
      <ProfessorCharts reviews={reviews} />
    </div>
  );
}
