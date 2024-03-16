"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Review } from "@/lib/definitions/review";
import RatingChart from "./rating_chart";

interface Props {
  reviews: Review[];
}

export default function CourseCharts({ reviews }: Props) {
  const [ratingChart, setRatingChart] = useState("Rating");

  return (
    <div className="flex flex-col w-full lg:w-1/2 space-y-3">
      <div className="w-fit">
        <Select value={ratingChart} onValueChange={setRatingChart}>
          <SelectTrigger className="ml-0 lg:ml-7 border-2 border-primary-white text-primary-white font-semibold">
            <SelectValue className="text-primary-black">
              {ratingChart}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="text-primary-black">
            <SelectItem value="Rating">Rating</SelectItem>
            <SelectItem value="Difficulty">Difficulty</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-full">
        {ratingChart === "Rating" && (
          <RatingChart reviews={reviews} attribute="rating" />
        )}
        {ratingChart === "Difficulty" && (
          <RatingChart reviews={reviews} attribute="difficultyRating" />
        )}
      </div>
    </div>
  );
}
