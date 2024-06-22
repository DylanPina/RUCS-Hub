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

    if (user) checkSubscription();
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

  if (!user || !user.email_verified) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <MdNotificationAdd
              onClick={() => {
                toast.error("Must be verified to turn on notifications");
              }}
              className="h-6 w-6"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-primary-red">
            Turn on notifications
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        {subscribed ? (
          <>
            <TooltipTrigger>
              <MdNotificationsOff onClick={unsubscribe} className="h-6 w-6" />
            </TooltipTrigger>
            <TooltipContent className="outline outline-1 outline-primary-white">
              Turn off notifications
            </TooltipContent>
          </>
        ) : (
          <>
            <TooltipTrigger>
              <MdNotificationAdd onClick={subscribe} className="h-6 w-6" />
            </TooltipTrigger>
            <TooltipContent className="outline outline-1 outline-primary-white">
              Turn on notifications
            </TooltipContent>
          </>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
