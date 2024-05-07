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
    <div className="flex flex-col space-y-3 p-2 outline outline-1 outline-primary-white rounded">
      <div className="flex flex-col space-y-1">
        <h3 className="text-sm text-primary-white font-semibold">
          {updatedReview.title}
        </h3>
        <p className="text-xs text-primary-white/50">
          Course: {updatedReview.course.name}
        </p>
        <p className="text-xs text-primary-white/50">
          Professor:{" "}
          {formatProfessorName(
            updatedReview.professor.lastName,
            updatedReview.professor.firstName,
          )}
        </p>
        <p className="text-xs text-primary-white/50">
          Term: {getTermNameByValue(updatedReview.semester)}{" "}
          {updatedReview.year}
        </p>
        <p className="text-xs text-primary-white/50">
          Created at: {formatReviewDate(updatedReview.createdAt)}
        </p>
        {updatedReview.createdAt.toString() !==
          updatedReview.lastModified.toString() && (
          <p className="text-xs text-primary-white/50">
            Last modifed at: {formatReviewDate(updatedReview.lastModified)}
          </p>
        )}
      </div>
      <div className="flex space-x-10">
        <ul className="flex flex-col space-y-1 text-xs">
          <li className="text-xs">
            <span className="text-primary-white">Course Rating:</span>{" "}
            {updatedReview.rating}
            <span className="not-italic text-primary-white/50">/10</span>
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Course Difficulty:</span>{" "}
            {updatedReview.difficultyRating ? (
              <>
                {updatedReview.difficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Course Workload:</span>{" "}
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
        <ul className="flex flex-col space-y-1 text-xs">
          <li className="text-xs">
            <span className="text-primary-white">Professor:</span>{" "}
            {updatedReview.professorQualityRating ? (
              <>
                {updatedReview.professorQualityRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Professor Difficulty:</span>{" "}
            {updatedReview.professorDifficultyRating ? (
              <>
                {updatedReview.professorDifficultyRating}
                <span className="not-italic text-primary-white/50">/10</span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
          <li className="text-xs">
            <span className="text-primary-white">Lectures:</span>{" "}
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
      <div className="flex flex-col space-y-1">
        <h3 className="text-sm text-primary-white font-semibold">Review:</h3>
        <p className="text-xs text-primary-white/50">{updatedReview.content}</p>
      </div>
      <div className="flex space-x-3">
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
