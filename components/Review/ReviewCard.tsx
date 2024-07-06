"use client";

import React, { useState } from "react";
import {
  formatProfessorName,
  formatReviewDate,
  getCourseRoute,
  getProfessorRoute,
  getTermNameByValue,
  hashEmailAddress,
} from "@/lib/utils";
import { Review } from "@/lib/definitions/review";
import ReviewVotes from "./ReviewVotes";
import ReviewEditButton from "./ReviewEditButton";
import ReviewCardEditing from "./ReviewCardEditing";
import ReviewDeleteButton from "./ReviewDeleteButton";
import ReviewReportButton from "./ReviewReportButton";
import Link from "next/link";
import NotificationReviewButton from "../Notification/NotificationButtonReview";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(review);
  const isUserReview =
    user && hashEmailAddress(user?.email ?? "") === review.userId;

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
    <div
      className={`flex flex-col space-y-2 p-3 border rounded overflow-hidden relative ${
        isUserReview
          ? "border-primary-red shadow shadow-primary-red"
          : "border-primary-white"
      }`}
    >
      <h3 className="text-lg max-sm:text-base text-primary-white font-bold">
        {updatedReview.title}
      </h3>
      <div className="flex flex-col space-y-1">
        <p className="text-sm max-sm:text-xs  text-primary-white/50">
          <span className="font-semibold">Course:</span>{" "}
          <Link
            className="hover:underline"
            href={getCourseRoute(
              updatedReview.course.subjectCode,
              updatedReview.course.code,
            )}
          >
            {updatedReview.course.subjectCode}:{updatedReview.course.code} -{" "}
            {updatedReview.course.name}
          </Link>
        </p>
        <p className="text-sm max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Professor:</span>{" "}
          <Link
            className="hover:underline"
            href={getProfessorRoute(
              updatedReview.professor?.lastName ?? "",
              updatedReview.professor?.firstName ?? "",
            )}
          >
            {formatProfessorName(
              updatedReview.professor?.lastName ?? "",
              updatedReview.professor?.firstName ?? "",
            )}
          </Link>
        </p>
        <p className="text-sm max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Term:</span>{" "}
          {getTermNameByValue(updatedReview.semester)} {updatedReview.year}
        </p>
        <p className="text-sm  max-sm:text-xs text-primary-white/50">
          <span className="font-semibold">Created At:</span>{" "}
          {formatReviewDate(updatedReview.createdAt)}
        </p>
        {updatedReview.createdAt.toString() !==
          updatedReview.lastModified.toString() && (
          <p className="text-sm  max-sm:text-xs text-primary-white/50">
            <span className="font-semibold"> Last Modified At:</span>{" "}
            {formatReviewDate(updatedReview.lastModified)}
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
                  hrs per week
                </span>
              </>
            ) : (
              <span className="not-italic text-primary-white/50">N/A</span>
            )}
          </li>
        </ul>
        <ul className="flex flex-col space-y-1 text-sm max-sm:text-xs">
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
        <ReviewVotes review={review} user={user || null} />
        {isUserReview ? (
          <>
            <ReviewEditButton setEditing={() => setEditing(true)} />
            <ReviewDeleteButton review={review} />
            <div className="absolute top-3 right-3">
              <NotificationReviewButton user={user} review={review} />
            </div>
          </>
        ) : (
          <ReviewReportButton review={review} user={user} />
        )}
      </div>
    </div>
  );
}
