import {
  formatProfessorName,
  formatReviewDate,
  getCourseRoute,
  getProfessorRoute,
} from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaBook } from "react-icons/fa6";

interface Props {
  notification: any;
  review: any;
}

export default function NotificationCourse({ notification, review }: Props) {
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
        <FaBook className="mt-[0.175rem] h-[0.7rem] w-[0.7rem]" />
        <h3 className="font-black">Review added for {review.course.name}</h3>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-semibold">Course:</h3>
        <Link
          className="hover:underline"
          href={getCourseRoute(review.course.subjectCode, review.course.code)}
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
