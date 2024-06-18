import React from "react";
import ReviewCard from "../reviews/review-card";
import SubscriptionCardProfessor from "./subscription_card_professor";
import SubscriptionCardCourse from "./subscription_card_course";

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
