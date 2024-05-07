import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdDeleteForever } from "react-icons/md";
import { Review } from "@/lib/definitions/review";

interface Props {
  review: Review;
}

export default function ReviewDeleteButton({ review }: Props) {
  return (
    <div className="flex space-x-2">
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <MdDeleteForever
                size={18}
                className="fill-primary-white hover:fill-primary-red transition duration-150 ease-in-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
