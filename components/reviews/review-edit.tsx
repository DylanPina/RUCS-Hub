import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Review } from "@/lib/definitions/review";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BiEdit } from "react-icons/bi";

interface ReviewVotesProps {
  review: Review;
}

export default function ReviewEdit({ review }: ReviewVotesProps) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <BiEdit
                size={18}
                className="fill-primary-white hover:fill-primary-red transition duration-150 ease-in-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
