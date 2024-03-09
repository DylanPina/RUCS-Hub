"use client";

import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Vote } from "@prisma/client";
import { Review } from "@/lib/definitions/review";

interface ProfessorReviewVotesProps {
  review: Review;
}

export default function ProfessorReviewVotes({
  review,
}: ProfessorReviewVotesProps) {
  const { votes } = review;
  const upvotes =
    votes && votes.length
      ? votes.filter((vote: Vote) => vote.upvote).length
      : 0;
  const downvotes =
    votes && votes.length
      ? votes.filter((vote: Vote) => !vote.upvote).length
      : 0;

  async function handleUpvote() {
    await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: review.id,
        upvote: true,
      }),
    });
  }

  async function handleDownvote() {
    await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: review.id,
        upvote: false,
      }),
    });
  }

  return (
    <div className="flex space-x-2">
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <BiUpvote
                style={{ color: "primary-white" }}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
                onClick={() => handleUpvote()}
                size={18}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Upvote</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-primary-white text-xs">{upvotes}</span>
      </div>
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <BiDownvote
                style={{ color: "primary-white" }}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
                onClick={() => handleDownvote()}
                size={18}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Downvote</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-primary-white text-xs">{downvotes}</span>
      </div>
    </div>
  );
}
