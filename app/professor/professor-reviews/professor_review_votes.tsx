import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

interface ProfessorReviewVotesProps {
  upvotes: number;
  downvotes: number;
}

export default function ProfessorReviewVotes({
  upvotes,
  downvotes,
}: ProfessorReviewVotesProps) {
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
