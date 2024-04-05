"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  courseCode?: number;
  professorId?: number;
}

export default function AddReviewBannerButton({
  courseCode,
  professorId,
}: Props) {
  const { user } = useUser();
  const router = useRouter();

  function handleClick() {
    if (!user) {
      toast.error("Must be signed in to leave a review");
      return;
    }

    if (professorId && courseCode) {
      router.push(
        `/add-review?professorId=${professorId}&courseCode=${courseCode}`,
      );
    } else if (professorId) {
      router.push(`/add-review?professorId=${professorId}`);
    } else if (courseCode) {
      router.push(`/add-review?courseCode=${courseCode}`);
    }
  }

  return (
    <Button
      className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black"
      onClick={handleClick}
    >
      Leave a Review
    </Button>
  );
}
