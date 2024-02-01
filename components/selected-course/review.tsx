"use client";

import React, { useState } from "react";
interface ReviewProps {
  title: string;
  semester: string;
  dateTime: string;
  ratings: {
    overallRating: number;
    difficulty: number;
    workload: number;
    textbook: number;
    lectures: number;
    professor: number;
    piazzaSupport: number;
  };
  description: string;
}

export default function Review({ title, semester, dateTime, ratings, description }: ReviewProps) {
  const [voteStatus, setVoteStatus] = useState<"upvoted" | "downvoted" | "none">("none");

  const toggleUpvote = () => {
    setVoteStatus((prevStatus) => {
      if (prevStatus === "upvoted") {
        return "none";
      } else {
        return "upvoted";
      }
    });
  };

  const toggleDownvote = () => {
    setVoteStatus((prevStatus) => {
      // Toggle logic
      if (prevStatus === "downvoted") {
        return "none";
      } else {
        return "downvoted";
      }
    });
  };

  const voteDisplay = voteStatus === "upvoted" ? 1 : voteStatus === "downvoted" ? -1 : 0;
  return (
    <div className="p-4 border rounded-lg shadow w-9/12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex items-center">
          <button
            className={`mr-2 px-2 py-1 ${voteStatus === "upvoted" ? "bg-zinc-800" : "bg-zinc-700"} text-white rounded`}
            onClick={() => setVoteStatus(voteStatus !== "upvoted" ? "upvoted" : "none")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V6M5 12l7-7 7 7" />
            </svg>
          </button>
          <span className="mx-2 text-center" style={{ minWidth: "2rem" }}>
            {voteDisplay}
          </span>
          <button
            className={`px-2 py-1 ${voteStatus === "downvoted" ? "bg-zinc-800" : "bg-zinc-700"} text-white rounded`}
            onClick={() => setVoteStatus(voteStatus !== "downvoted" ? "downvoted" : "none")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v13M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-400">
        {semester} • {new Date(dateTime).toLocaleString()}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-2">
        <p>Rating: {ratings.overallRating.toFixed(1)}</p>
        <p>Difficulty: {ratings.difficulty.toFixed(1)}</p>
        <p>Textbook: {ratings.textbook.toFixed(1)}</p>
        <p>Lectures: {ratings.lectures.toFixed(1)}</p>
        <p>Professor: {ratings.professor.toFixed(1)}</p>
        <p>Piazza Support: {ratings.piazzaSupport.toFixed(1)}</p>
        <p>Workload: {ratings.workload} hours per a week</p>
      </div>
      <div className="border my-2"></div>
      <p>{description}</p>
    </div>
  );
}
