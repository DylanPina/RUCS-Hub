"use client";

import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Vote } from "@prisma/client";
import { Review } from "@/lib/definitions/review";
import { useSession } from "next-auth/react";
import { hashEmailAddress } from "@/lib/utils";

interface ProfessorReviewVotesProps {
  review: Review;
}

export default function ProfessorReviewVotes({
  review,
}: ProfessorReviewVotesProps) {
  const { votes } = review;
  const userId = hashEmailAddress(useSession().data?.user?.email ?? "");

  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    setUpvotes(votes.filter((vote: Vote) => vote.upvote).length);
    setDownvotes(votes.filter((vote: Vote) => !vote.upvote).length);

    if (userId) {
      setUpvoted(
        votes.some((vote: Vote) => vote.userId === userId && vote.upvote),
      );
      setDownvoted(
        votes.some((vote: Vote) => vote.userId === userId && !vote.upvote),
      );
    }
  }, [votes, userId]);

  async function handleUpvote() {
    if (upvoted) {
      setUpvotes(upvotes - 1);
      setUpvoted(false);
    } else if (downvoted) {
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setDownvoted(false);
      setUpvoted(true);
    } else {
      setUpvotes(upvotes + 1);
      setUpvoted(true);
    }

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
    if (downvoted) {
      setDownvotes(downvotes - 1);
      setDownvoted(false);
    } else if (upvoted) {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setUpvoted(false);
      setDownvoted(true);
    } else {
      setDownvotes(downvotes + 1);
      setDownvoted(true);
    }

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
                className={`${
                  upvoted ? "fill-primary-red" : "fill-primary-white"
                }  cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in`}
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
                className={`${
                  downvoted ? "fill-primary-red" : "fill-primary-white"
                } cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in`}
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
