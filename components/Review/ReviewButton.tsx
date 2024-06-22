"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-toastify";
import { CoursePage } from "@/lib/definitions/course";
import { ProfessorPage } from "@/lib/definitions/professor";
import ReviewCreateModal from "./ReviewCreateModal";
import { Course, Professor } from "@prisma/client";

interface Props {
  course?: CoursePage;
  courses?: Course[];
  professor?: ProfessorPage;
  professors?: Professor[];
}

export default function ReviewButton({
  course,
  courses,
  professor,
  professors,
}: Props) {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <ReviewCreateModal
          course={course}
          courses={courses}
          professor={professor}
          professors={professors}
        />
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
