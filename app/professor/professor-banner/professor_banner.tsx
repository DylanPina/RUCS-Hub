"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useState } from "react";
import { ProfessorPage } from "@/lib/definitions/professor";
import { getCourseRoute, titleCase } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useRouter } from "next/navigation";
import RatingChart from "@/components/charts/rating-chart";

interface Props {
  professor: ProfessorPage;
  currentlyTeaching: number[];
}

export default function ProfessorBanner({
  professor,
  currentlyTeaching,
}: Props) {
  const [ratingChart, setRatingChart] = useState("Overall");
  const router = useRouter();

  const { firstName, lastName, overall, difficulty, reviews } = professor;
  const name = `${titleCase(firstName)} ${titleCase(lastName)}`;
  const totalOverallRatings = reviews.filter(
    (review) => review.professorQualityRating !== null,
  ).length;
  const totalDifficultyRatings = reviews.filter(
    (review) => review.professorDifficultyRating !== null,
  ).length;

  return (
    <div className="flex flex-col lg:flex-row justify-start lg:justify-between max-lg:space-y-3">
      <div className="flex w-full lg:w-1/2 bg-primary-red outline outline-1 outline-primary-white rounded py-3 px-4">
        <div className="flex flex-col place-content-between min-w-fit space-y-3">
          <div className="flex flex-col space-y-1">
            <h1 className="text-4xl text-primary-black font-black">{name}</h1>
            <div className="flex flex-col space-y-1">
              {totalOverallRatings > 0 ? (
                <h3 className="text-md text-primary-white font-bold">
                  Overall: <span className="font-normal">{overall}</span>
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
                  Difficulty: <span className="font-normal">{difficulty}</span>
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
                Total Reviews:{" "}
                <span className="font-normal">{reviews.length}</span>
              </h3>
              <h3 className="text-md text-primary-white font-bold">
                Currently Teaching:{" "}
                <span className="font-normal">
                  {currentlyTeaching.map(
                    (courseCode: number, index: number, array: number[]) => (
                      <React.Fragment key={courseCode}>
                        <span
                          className="underline cursor-pointer"
                          onClick={() =>
                            router.push(getCourseRoute(courseCode))
                          }
                        >
                          01:198:{courseCode}
                        </span>
                        <span className="font-normal">
                          {index < array.length - 1 && ", "}
                        </span>
                      </React.Fragment>
                    ),
                  )}
                </span>
              </h3>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
              Compare professors
            </Button>
            <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
              Leave a Review
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 space-y-3">
        <div className="w-fit">
          <Select value={ratingChart} onValueChange={setRatingChart}>
            <SelectTrigger className="ml-0 lg:ml-7 border-2 border-primary-white text-primary-white font-semibold">
              <SelectValue className="text-primary-black">
                {ratingChart}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="text-primary-black">
              <SelectItem value="Overall">Overall</SelectItem>
              <SelectItem value="Difficulty">Difficulty</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          {ratingChart === "Overall" && (
            <RatingChart reviews={reviews} attribute="professorQualityRating" />
          )}
          {ratingChart === "Difficulty" && (
            <RatingChart
              reviews={reviews}
              attribute="professorDifficultyRating"
            />
          )}
        </div>
      </div>
    </div>
  );
}
