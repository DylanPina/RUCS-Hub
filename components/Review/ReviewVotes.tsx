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
import { hashEmailAddress } from "@/lib/utils";
import { toast } from "react-toastify";
import { vote } from "@/lib/actions/review";

interface ReviewVotesProps {
  review: Review;
  user?: any;
}

export default function ReviewVotes({ review, user }: ReviewVotesProps) {
  const { votes } = review;
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [isSameUser, setIsSameUser] = useState(true);

  useEffect(() => {
    setUpvotes(votes.filter((vote: Vote) => vote.upvote).length);
    setDownvotes(votes.filter((vote: Vote) => !vote.upvote).length);

    if (user) {
      const userId = hashEmailAddress(user.email ?? "");
      setIsSameUser(userId === review.userId);

      setUpvoted(
        votes.some((vote: Vote) => vote.userId === userId && vote.upvote),
      );
      setDownvoted(
        votes.some((vote: Vote) => vote.userId === userId && !vote.upvote),
      );
    }
  }, [user, votes]);

  async function handleUpvote() {
    if (!user) {
      toast.error("Must be signed in to vote.");
      return;
    }

    if (!user.email_verified) {
      toast.error("Must verify email to vote.");
      return;
    }

    if (isSameUser) {
      toast.error("Cannot vote on your own review");
      return;
    }

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

    await vote(hashEmailAddress(user.email as string), review.id, true);
  }

  async function handleDownvote() {
    if (!user) {
      toast.error("Must be signed in to vote.");
      return;
    }

    if (!user.email_verified) {
      toast.error("Must verify email to vote.");
      return;
    }

    if (isSameUser) {
      toast.error("Cannot vote on your own review");
      return;
    }

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

    await vote(hashEmailAddress(user.email as string), review.id, false);
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
                } ${
                  isSameUser
                    ? "cursor-auto"
                    : "cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
                }`}
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
                }  ${
                  isSameUser
                    ? "cursor-auto"
                    : "cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
                }`}
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
