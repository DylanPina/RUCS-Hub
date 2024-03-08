import React from "react";
import ProfessorReviewVotes from "./professor_review_votes";
import { formatReviewDate, getTermNameByValue, titleCase } from "@/lib/utils";
import { Review } from "@/lib/definitions/review";

interface ProfessorReviewProps {
  review: Review;
}

export default function ProfessorReview({ review }: ProfessorReviewProps) {
  return (
    <div className="flex flex-col space-y-3 p-2 outline outline-1 outline-primary-white rounded">
      <div className="flex flex-col space-y-1">
        <h3 className="text-sm text-primary-white font-semibold">
          {review.title}
        </h3>
        <p className="text-xs text-primary-white/50">
          Course: {review.course.name}
        </p>
        <p className="text-xs text-primary-white/50">
          Professor: {titleCase(review.professor.firstName)}{" "}
          {titleCase(review.professor.lastName)}
        </p>
        <p className="text-xs text-primary-white/50">
          Term: {getTermNameByValue(review.semester)} {review.year}
        </p>
        <p className="text-xs text-primary-white/50">
          Created at: {formatReviewDate(review.createdAt)}
        </p>
        {review.createdAt.toString() !== review.lastModified.toString() && (
          <p className="text-xs text-primary-white/50">
            Last modifed at: {formatReviewDate(review.lastModified)}
          </p>
        )}
      </div>
      <div className="flex space-x-10">
        <ul className="flex flex-col space-y-1 text-xs">
          <li className="text-xs">
            <span className="text-primary-white">Course Rating:</span>{" "}
            {review.rating}
            <span className="not-italic text-primary-white/50">/10</span>
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Course Difficulty:</span>{" "}
            {review.difficultyRating ? (
              <>
                {review.difficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Course Workload:</span>{" "}
            {review.workload ? (
              <>
                {review.workload}{" "}
                <span className="not-italic text-primary-white/50">
                  hours per week
                </span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
        </ul>
        <ul className="flex flex-col space-y-1 text-xs">
          <li className="text-xs">
            <span className="text-primary-white">Professor:</span>{" "}
            {review.professorQualityRating ? (
              <>
                {review.professorQualityRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Professor Difficulty:</span>{" "}
            {review.professorDifficultyRating ? (
              <>
                {review.professorDifficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Lectures:</span>{" "}
            {review.lectureRating ? (
              <>
                {review.lectureRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-1">
        <h3 className="text-sm text-primary-white font-semibold">Review:</h3>
        <p className="text-xs text-primary-white/50">{review.content}</p>
      </div>
      <div className="flex space-x-3">
        <ProfessorReviewVotes votes={review.votes} />
      </div>
    </div>
  );
}
