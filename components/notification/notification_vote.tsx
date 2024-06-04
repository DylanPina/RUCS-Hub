import { formatProfessorName } from "@/lib/utils";
import React from "react";

interface Props {
  vote: any;
  review: any;
}

export default function NotificationVote({ vote, review }: Props) {
  const { upvote } = vote;

  return (
    <div className="flex flex-col p-1 text-primary-white text-xs">
      <h2 className="font-bold">
        Your review has been {upvote ? "upvoted" : "downvoted"}
      </h2>
      <div className="flex space-x-2">
        <h3 className="font-bold">Course:</h3>
        <p>
          {review.course.code} - {review.course.name}
        </p>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Professor:</h3>
        <p>
          {formatProfessorName(
            review.professor.lastName,
            review.professor.firstName,
          )}
        </p>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Review:</h3>
        <p>{review.title}</p>
      </div>
    </div>
  );
}
