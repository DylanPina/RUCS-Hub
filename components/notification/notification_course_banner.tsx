"use client";

import {
  createCourseSubscription,
  deleteCourseSubscription,
  isUserSubscribedToCourse,
} from "@/lib/actions/subscription";
import { hashEmailAddress } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdNotificationAdd, MdNotificationsOff } from "react-icons/md";
import { toast } from "react-toastify";

interface Props {
  coursePage: any;
  user: any;
}

export default function NotificationCourseBanner({ coursePage, user }: Props) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      const isSubscribed = await isUserSubscribedToCourse(
        hashEmailAddress(user.email),
        coursePage.code,
      );
      setSubscribed(isSubscribed != null);
    }
    checkSubscription();
  }, [user.email, coursePage.code]);

  const subscribe = () => {
    createCourseSubscription(hashEmailAddress(user.email), coursePage.code);
    setSubscribed(true);
    toast.success(`Notifications turned on for ${coursePage.name}`);
  };

  const unsubscribe = () => {
    deleteCourseSubscription(hashEmailAddress(user.email), coursePage.code);
    setSubscribed(false);
    toast.success(`Notifications turned off for ${coursePage.name}`);
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
          <TooltipContent className="outline outline-1 outline-primary-white">
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
