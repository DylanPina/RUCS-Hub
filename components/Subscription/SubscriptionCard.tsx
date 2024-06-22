import React from "react";
import ReviewCard from "../Review/ReviewCard";
import SubscriptionCardProfessor from "./SubscriptionCardProfessor";
import SubscriptionCardCourse from "./SubscriptionCardCourse";

interface Props {
  subscription: any;
}

export default function SubscriptionCard({ subscription }: Props) {
  const { review, professor, course } = subscription;

  return review ? (
    <ReviewCard review={review} />
  ) : professor ? (
    <SubscriptionCardProfessor professor={professor} />
  ) : (
    course && <SubscriptionCardCourse course={course} />
  );
}
