import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { BiEdit } from "react-icons/bi";

interface Props {
  setEditing: () => void;
}

export default function ReviewEditButton({ setEditing }: Props) {
  return (
    <div className="flex space-x-2">
      <div className="flex space-x-1">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <BiEdit
                size={18}
                className="fill-primary-white hover:fill-primary-red transition duration-150 ease-in-out hover:ease-in"
                onClick={setEditing}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
