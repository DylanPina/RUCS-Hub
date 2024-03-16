import React from "react";
import { Button } from "../shadcn/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ReviewCreateModal } from "./review_create_modal";
import { CoursePage } from "@/lib/definitions/course";
import { ProfessorPage } from "@/lib/definitions/professor";

interface Props {
  course?: CoursePage;
  professor?: ProfessorPage;
}

export default function ReviewButton({ course, professor }: Props) {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <ReviewCreateModal course={course} professor={professor} />
      ) : (
        <Button
          className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black"
          onClick={() => toast.error("Must be signed in to leave a review")}
        >
          Leave a Review
        </Button>
      )}
    </>
  );
}
