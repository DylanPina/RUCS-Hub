"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdDeleteForever } from "react-icons/md";
import { Review } from "@/lib/definitions/review";
import { deleteReview } from "@/lib/actions/review";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { LoaderButton } from "../shadcn/ui/loader-button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  review: Review;
}

export default function ReviewDeleteButton({ review }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    deleteReview(review.id);
    setLoading(false);
    router.refresh();
    toast.info("Review deleted");
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger className="flex align-items-center">
              <MdDeleteForever
                size={18}
                className="fill-primary-white hover:fill-primary-red transition duration-150 ease-in-out hover:ease-in"
              />
            </DialogTrigger>
            <DialogContent className="bg-primary-black max-sm:rounded overflow-hidden">
              <DialogHeader className="flex align-items-center">
                <DialogTitle className="text-center">
                  Deleting Review
                </DialogTitle>
                <DialogDescription className="text-center">
                  This action cannot be undone. Are you sure?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center space-x-2">
                <DialogClose asChild>
                  <LoaderButton
                    type="button"
                    isLoading={loading}
                    className="text-xs bg-primary-white text-primary-black transition-all duration-150 hover:bg-primary-white hover:font-bold hover:shadow-primary-black"
                  >
                    Cancel
                  </LoaderButton>
                </DialogClose>
                <LoaderButton
                  isLoading={loading}
                  onClick={handleClick}
                  className="text-xs bg-primary-red hover:bg-primary-red transition-all duration-150 hover:font-bold hover:shadow-primary-black"
                >
                  Delete
                </LoaderButton>
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-red">Delete</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
