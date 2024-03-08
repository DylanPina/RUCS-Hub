import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Vote } from "@prisma/client";
import { useSession } from "next-auth/react";

interface ProfessorReviewVotesProps {
  votes: Vote[];
}

export default function ProfessorReviewVotes({
  votes,
}: ProfessorReviewVotesProps) {
  const upvotes =
    votes && votes.length
      ? votes.filter((vote: Vote) => vote.upvote).length
      : 0;
  const downvotes =
    votes && votes.length
      ? votes.filter((vote: Vote) => !vote.upvote).length
      : 0;
  console.log(`Votes: ${JSON.stringify(votes, null, 2)}`);

  const session = useSession();
  console.log(`Session: ${JSON.stringify(session, null, 2)}`);

  return (
    <div className="flex space-x-2">
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <BiUpvote
                style={{ color: "primary-white" }}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
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
