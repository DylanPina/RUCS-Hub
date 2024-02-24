"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useState } from "react";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import ProfessorOverallRatingChart from "./professor_overall_rating_chart";

interface Props {
  professor: ProfessorPage;
}

export default function ProfessorBanner({ professor }: Props) {
  const [ratingChart, setRatingChart] = useState("Overall");

  const { firstName, lastName, overall, difficulty, reviews } = professor;
  const name = `${titleCase(firstName)} ${titleCase(lastName)}`;

  return (
    <div className="flex justify-between space-x-10">
      <div className="flex w-1/2 bg-primary-red outline outline-1 outline-primary-white rounded py-3 px-4">
        <div className="flex flex-col place-content-between min-w-fit space-y-4">
          <div className="flex flex-col space-y-1">
            <h1 className="text-4xl text-primary-black font-black">{name}</h1>
            <div className="flex flex-col space-y-1">
              <h3 className="text-md text-primary-white">
                Overall: <span className="not-italic font-bold">{overall}</span>
                <span className="not-italic text-primary-white/50 text-xs">
                  /10
                </span>
              </h3>
              <h3 className="text-md text-primary-white">
                Difficulty:{" "}
                <span className="not-italic font-bold">{difficulty}</span>
                <span className="not-italic text-primary-white/50 text-xs">
                  /10
                </span>
              </h3>
              <h3 className="text-md text-primary-white">
                Would Take Again: <span className="font-bold">100%</span>
              </h3>
              <h3 className="text-md text-primary-white">
                Total Reviews:{" "}
                <span className="not-italic font-bold">{reviews.length}</span>
              </h3>
              <h3 className="text-md text-primary-white">
                Currently Teaching:{" "}
                <span className="not-italic font-bold">
                  <span className="underline">01:198:462</span>,{" "}
                  <span className="underline">01:198:440</span>
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
      <div className="flex flex-col w-1/2 space-y-4">
        <div className="w-fit">
          <Select value={ratingChart} onValueChange={setRatingChart}>
            <SelectTrigger className="ml-7 border-2 border-primary-white text-primary-white font-semibold">
              <SelectValue className="text-primary-black">
                {ratingChart}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="text-primary-black">
              <SelectItem value="Overall">Overall</SelectItem>
              <SelectItem value="Difficulty">Difficulty</SelectItem>
              <SelectItem value="Would Take Again">Would Take Again</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-full">
          <ProfessorOverallRatingChart reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
