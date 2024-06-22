"use client";

import Link from "next/link";
import NotificationButtonCourse from "../Notification/NotificationButtonCourse";

interface Props {
  course: any;
}

export default function SubscriptionCardCourse({ course }: Props) {
  const { reviews, rating, difficulty, workload } = course;

  const totalOverallRatings = reviews.filter(
    (review: any) => review.overallRating !== null,
  ).length;
  const totalDifficultyRatings = reviews.filter((review: any) => {
    return review.difficultyRating !== null;
  }).length;
  const totalWorkloadRatings = reviews.filter((review: any) => {
    return review.workload !== null;
  }).length;

  return (
    <div className="flex flex-col space-y-2 p-3 border rounded overflow-hidden border-primary-white relative">
      <h3 className="text-lg max-sm:text-base text-primary-white font-bold">
        Course:{" "}
        <Link
          href={`/course/${course.code}`}
          className="font-normal hover:underline"
        >
          {course.code} - {course.name}
        </Link>
      </h3>
      <ul className="flex flex-col space-y-1 text-md max-sm:text-sm">
        <li>
          <span className="font-semibold">Reviews:</span> {reviews.length}
        </li>
        <li>
          <span className="font-semibold">Rating:</span>{" "}
          {reviews.length ? (
            <>
              <span>{rating.toFixed(1)}</span>
              <span className="text-primary-white/80 text-xs">/10</span>{" "}
              <span className="text-primary-white/80 italic text-xs">
                based on {totalOverallRatings}{" "}
                {totalOverallRatings === 1 ? "review" : "reviews"}
              </span>
            </>
          ) : (
            <span>?</span>
          )}
        </li>
        <li>
          <span className="font-semibold">Difficulty:</span>{" "}
          {reviews.length ? (
            <>
              <span>{difficulty.toFixed(1)}</span>
              <span className="text-primary-white/80 text-xs">/10</span>{" "}
              <span className="text-primary-white/80 italic text-xs">
                based on {totalDifficultyRatings}{" "}
                {totalDifficultyRatings === 1 ? "review" : "reviews"}
              </span>
            </>
          ) : (
            <span>?</span>
          )}
        </li>
        <li>
          <span className="font-semibold">Workload: </span>
          {reviews.length ? (
            <>
              <span>{workload.toFixed(1)} hrs per week </span>
              <span className="text-primary-white/80 italic text-xs">
                based on {totalWorkloadRatings}{" "}
                {totalWorkloadRatings === 1 ? "review" : "reviews"}
              </span>
            </>
          ) : (
            <span>?</span>
          )}
        </li>
      </ul>
      <div className="absolute top-1 right-3">
        <NotificationButtonCourse course={course} />
      </div>
    </div>
  );
}
