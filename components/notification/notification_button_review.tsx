"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Review } from "@prisma/client";
import {
  MdNotificationAdd,
  MdNotifications,
  MdNotificationsOff,
} from "react-icons/md";
import { toast } from "react-toastify";
import { hashEmailAddress } from "@/lib/utils";
import {
  createReviewSubscription,
  deleteReviewSubscription,
  isUserSubscribedToReview,
} from "@/lib/actions/subscription";

interface Props {
  user: any;
  review: Review;
}

export default function NotificationReviewButton({ user, review }: Props) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const userId = hashEmailAddress(user.email ?? "");
      const subscribed = await isUserSubscribedToReview(userId, review.id);
      setIsSubscribed(!!subscribed);
    };

    if (user) checkSubscription();
  }, [user, review]);

  function handleTurnOffNotifications() {
    const userId = hashEmailAddress(user.email ?? "");
    deleteReviewSubscription(userId, review.id);
    setIsSubscribed(false);
    toast.success("Unsubscribed from review");
  }

  function handleTurnOnNotifications() {
    const userId = hashEmailAddress(user.email ?? "");
    createReviewSubscription(userId, review.id);
    setIsSubscribed(true);
    toast.success("Subscribed to review");
  }

  if (!user || !user.email_verified) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <MdNotifications
              size={20}
              onClick={() => {
                toast.error("Must be verified to turn on notifications");
              }}
              className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
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
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        {isSubscribed ? (
          <>
            <TooltipTrigger>
              <MdNotificationsOff
                onClick={handleTurnOffNotifications}
                size={20}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">
              Turn off notifications
            </TooltipContent>
          </>
        ) : (
          <>
            <TooltipTrigger>
              <MdNotificationAdd
                onClick={handleTurnOnNotifications}
                size={20}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">
              Turn on notifications
            </TooltipContent>
          </>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
