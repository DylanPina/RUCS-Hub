"use client";

import React, { useEffect, useState } from "react";
import ReviewCard from "../reviews/review-card";

interface Props {
  user: any;
  subscription: any;
}

export default function SubscriptionCard({ user, subscription }: Props) {
  const [review, setReview] = useState<any>();

  useEffect(() => {
    setReview(subscription.review);
  }, [subscription]);

  return review ? (
    <ReviewCard user={user} review={review} />
  ) : (
    <span>Fuck off</span>
  );
}
