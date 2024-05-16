"use client";

import React, { useState } from "react";
import {
  formatProfessorName,
  formatReviewDate,
  getTermNameByValue,
} from "@/lib/utils";
import { Review } from "@/lib/definitions/review";
import ReviewVotes from "./review-votes";
import ReviewEditButton from "./review-edit-button";
import ReviewCardEditing from "./review-card-editing";
import ReviewDeleteButton from "./review-delete-button";

interface ReviewCardProps {
  review: Review;
  userId: any;
}

export default function ReviewCard({ review, userId }: ReviewCardProps) {
  const [editing, setEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(review);

  if (editing) {
    return (
      <ReviewCardEditing
        review={updatedReview}
        setEditing={setEditing}
        setUpdatedReview={setUpdatedReview}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-2 p-2 border border-primary-white rounded overflow-hidden">
      <h3 className="text-lg max-sm:text-base text-primary-white font-bold">
        {updatedReview.title}
      </h3>
      <div className="flex flex-col space-y-1">
        <p className="text-sm max-sm:text-xs  text-primary-white/50">
          <span className="font-semibold">Course:</span>{" "}
          {updatedReview.course.name}
        </p>
        <p className="text-sm max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Professor:</span>{" "}
          {formatProfessorName(
            updatedReview.professor.lastName,
            updatedReview.professor.firstName,
          )}
        </p>
        <p className="text-sm max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Term:</span>{" "}
          {getTermNameByValue(updatedReview.semester)} {updatedReview.year}
        </p>
        <p className="text-sm  max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Created at:</span>{" "}
          {formatReviewDate(updatedReview.createdAt)}
        </p>
        {updatedReview.createdAt.toString() !==
          updatedReview.lastModified.toString() && (
          <p className="text-sm  max-sm:text-xs text-primary-white/50">
            Last modifed at: {formatReviewDate(updatedReview.lastModified)}
          </p>
        )}
      </div>
      <div className="flex max-sm:flex-col space-y-1 sm:space-x-10">
        <ul className="flex flex-col space-y-1 text-sm max-sm:text-xs ">
          <li>
            <span className="text-primary-white font-semibold">
              Course Rating:
            </span>{" "}
            {updatedReview.rating}
            <span className="not-italic text-primary-white/50">/10</span>
          </li>
          <li>
            <span className="text-primary-white font-semibold">
              Course Difficulty:
            </span>{" "}
            {updatedReview.difficultyRating ? (
              <>
                {updatedReview.difficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li>
            <span className="text-primary-white font-semibold">
              Course Workload:
            </span>{" "}
            {updatedReview.workload ? (
              <>
                {updatedReview.workload}{" "}
                <span className="not-italic text-primary-white/50">
                  hours per week
                </span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
        </ul>
        <ul className="flex flex-col space-y-1 text-sm max-sm:text-xs ">
          <li>
            <span className="text-primary-white font-semibold">
              Professor Rating:
            </span>{" "}
            {updatedReview.professorQualityRating ? (
              <>
                {updatedReview.professorQualityRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li>
            <span className="text-primary-white font-semibold">
              Professor Difficulty:
            </span>{" "}
            {updatedReview.professorDifficultyRating ? (
              <>
                {updatedReview.professorDifficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li>
            <span className="text-primary-white font-semibold">
              Lecture Quality:
            </span>{" "}
            {updatedReview.lectureRating ? (
              <>
                {updatedReview.lectureRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg text-primary-white font-bold">Review:</h3>
        <p className="text-sm max-sm:text-xs text-primary-white whitespace-pre-wrap !leading-5">
          {updatedReview.content}
        </p>
      </div>
      <div className="flex space-x-3 !mt-4">
        <ReviewVotes review={review} />
        {userId === updatedReview.userId && (
          <div className="flex space-x-3">
            <ReviewEditButton setEditing={() => setEditing(true)} />
            <ReviewDeleteButton review={review} />
          </div>
        )}
      </div>
    </div>
  );
}
