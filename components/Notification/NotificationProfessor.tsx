import {
  formatProfessorName,
  formatReviewDate,
  getProfessorRoute,
} from "@/lib/utils";
import React from "react";
import { HiMiniAcademicCap } from "react-icons/hi2";
import Link from "next/link";

interface Props {
  notification: any;
  professor: any;
  review: any;
}

export default function NotificationProfessor({
  notification,
  professor,
  review,
}: Props) {
  const { read } = notification;

  return (
    <div
      className={`flex flex-col py-1 px-2 text-primary-white text-xs ${
        !read && "bg-primary-white/10 rounded"
      } relative`}
    >
      {!read && (
        <span className="absolute top-0 right-2 text-md font-semibold italic text-primary-white/50">
          !
        </span>
      )}
      <div className="flex space-x-0.5">
        <HiMiniAcademicCap className="mt-0.5" />
        <h3 className="font-black">
          Review added for{" "}
          {formatProfessorName(professor.lastName, professor.firstName)}
        </h3>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-semibold">Course:</h3>
        <Link
          className="hover:underline"
          href={`/course/${review.course.code}`}
        >
          {review.course.code} - {review.course.name}
        </Link>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-semibold">Professor:</h3>
        <Link
          className="hover:underline"
          href={getProfessorRoute(
            review.professor?.lastName ?? "",
            review.professor?.firstName ?? "",
          )}
        >
          {formatProfessorName(
            review.professor?.lastName ?? "",
            review.professor?.firstName ?? "",
          )}
        </Link>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-semibold">Review:</h3>
        <span>{review.title}</span>
      </div>
      <span className="text-[0.6rem] text-primary-white/50">
        {formatReviewDate(notification.createdAt)}
      </span>
    </div>
  );
}
