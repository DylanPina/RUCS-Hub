"use client";

import {
  createProfessorSubscription,
  deleteProfessorSubscription,
  isUserSubscribedToProfessor,
} from "@/lib/actions/subscription";
import { formatProfessorName, hashEmailAddress } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { MdNotificationAdd, MdNotificationsOff } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { toast } from "react-toastify";

interface Props {
  professor: any;
  user: any;
}

export default function NotificationProfessorBanner({
  professor,
  user,
}: Props) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      const isSubscribed = await isUserSubscribedToProfessor(
        hashEmailAddress(user.email),
        professor.id,
      );
      setSubscribed(isSubscribed != null);
    }
    checkSubscription();
  }, [user.email, professor.id]);

  const subscribe = () => {
    createProfessorSubscription(hashEmailAddress(user.email), professor.id);
    setSubscribed(true);
    toast.success(
      `Notifications turned on for ${formatProfessorName(
        professor.lastName,
        professor.firstName,
      )}`,
    );
  };

  const unsubscribe = () => {
    deleteProfessorSubscription(hashEmailAddress(user.email), professor.id);
    setSubscribed(false);
    toast.success(
      `Notifications turned off for ${formatProfessorName(
        professor.lastName,
        professor.firstName,
      )}`,
    );
  };

  return subscribed ? (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <MdNotificationsOff
            onClick={unsubscribe}
            className="absolute right-0 top-0 h-6 w-6"
          />
        </TooltipTrigger>
        <TooltipContent className="outline outline-1 outline-primary-white">
          Turn off notifications
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <MdNotificationAdd
            onClick={subscribe}
            className="absolute right-0 top-0 h-6 w-6"
          />
        </TooltipTrigger>
        <TooltipContent className="outline outline-1 outline-primary-white">
          Turn on notifications
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
