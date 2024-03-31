"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { useSession } from "next-auth/react";
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
  const { status } = useSession();
  const router = useRouter();

  function handleClick() {
    if (status !== "authenticated") {
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
