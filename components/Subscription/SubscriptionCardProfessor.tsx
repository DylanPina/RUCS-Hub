import { formatProfessorName, getProfessorRoute } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import NotificationButtonProfessor from "../Notification/NotificationButtonProfessor";

interface Props {
  professor: any;
}

export default function SubscriptionCardProfessor({ professor }: Props) {
  const { reviews, overall: rating, difficulty } = professor;

  const totalOverallRatings = reviews.filter(
    (review: any) => review.overallRating !== null,
  ).length;
  const totalDifficultyRatings = reviews.filter(
    (review: any) => review.difficultyRating !== null,
  ).length;

  return (
    <div className="flex flex-col space-y-2 p-3 border rounded overflow-hidden border-primary-white relative">
      <h3 className="text-lg max-sm:text-base text-primary-white font-bold">
        Professor:{" "}
        <Link
          href={getProfessorRoute(
            professor?.lastName ?? "",
            professor?.firstName ?? "",
          )}
          className="font-normal hover:underline"
        >
          {formatProfessorName(professor.lastName, professor.firstName)}
        </Link>
      </h3>
      <ul className="flex flex-col space-y-1 text-md max-sm:text-sm">
        <li>
          <span className="font-semibold">Reviews:</span> {reviews.length}
        </li>
        <li>
          <span className="font-semibold">Rating:</span> {rating}
          <span className="text-primary-white/80 text-xs">/10</span>{" "}
          <span className="text-primary-white/80 italic text-xs">
            based on {totalOverallRatings}{" "}
            {totalOverallRatings === 1 ? "review" : "reviews"}
          </span>
        </li>
        <li>
          <span className="font-semibold">Difficulty:</span> {difficulty}
          <span className="text-primary-white/80 text-xs">/10</span>{" "}
          <span className="text-primary-white/80 italic text-xs">
            based on {totalDifficultyRatings}{" "}
            {totalDifficultyRatings === 1 ? "review" : "reviews"}
          </span>
        </li>
      </ul>
      <div className="absolute top-1 right-3">
        <NotificationButtonProfessor professor={professor} />
      </div>
    </div>
  );
}
