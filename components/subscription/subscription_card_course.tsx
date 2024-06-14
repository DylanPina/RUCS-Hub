"use client";

import React, { useState } from "react";

interface Props {
  course: any;
}

export default function SubscriptionCardCourse({ course }: any) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [totalOverallRatings, setTotalOverallRatings] = useState(0);
  const [totalDifficultyRatings, setTotalDifficultyRatings] = useState(0);

  return <div>{course.name}</div>;
}
