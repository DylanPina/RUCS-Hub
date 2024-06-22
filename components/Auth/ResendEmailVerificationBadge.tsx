"use client";

import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { resendEmailVerification } from "@/lib/actions/auth";
import { toast } from "react-toastify";
import { Badge } from "../shadcn/ui/badge";

interface Props {
  user: any;
  lastEmailVerification: any;
}

export default function ResendEmailVerificationBadge({
  user,
  lastEmailVerification,
}: Props) {
  const [alreadyClicked, setAlreadyClicked] = useState(false);
  const [timePassed, setTimePassed] = useState(false);
  const disabled = alreadyClicked || !timePassed;

  useEffect(() => {
    const currentDate = new Date();
    const difference = currentDate.getTime() - lastEmailVerification.getTime();
    const minutes = Math.floor(difference / 60000);

    if (minutes < 1) {
      setTimePassed(false);
      const timeout = setTimeout(
        () => {
          setTimePassed(true);
        },
        (1 - minutes) * 60000,
      );
      return () => clearTimeout(timeout);
    }
    setTimePassed(true);
  }, [user, lastEmailVerification]);

  function handleClick() {
    if (disabled) return;

    resendEmailVerification(user);
    setAlreadyClicked(true);
    setTimeout(() => setAlreadyClicked(false), 60000);
    toast.success(`Verification email has been sent to ${user.email}.`);
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="focus:outline-none">
          <Badge
            onClick={handleClick}
            className={`${
              disabled
                ? "cursor-not-allowed bg-primary-red/50 hover:bg-primary-red/50 hover:shadow-primary-red/50"
                : "cursor-pointer bg-primary-red hover:bg-primary-red hover:shadow-primary-red"
            } hover:text-primary-white transition duration-150 ease-out hover:ease-in`}
          >
            Resend
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-red">
          Resend Email Verification
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
