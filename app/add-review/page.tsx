import ReviewCreateForm from "@/components/Review/ReviewCreateForm";
import { getAllProfessors } from "@/lib/data/professor";
import { Professor } from "@prisma/client";
import React from "react";
import type { Metadata } from "next";
import { getCourseBySubjectCourseCode } from "@/lib/data/course";
import { getSubjectByCode, getSubjects } from "@/lib/data/subject";

export const metadata: Metadata = {
  title: "Add Review",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { subjectCode, professorId, courseCode } = searchParams;
  const subject = await getSubjectByCode((subjectCode as string) || "198");
  const subjects = await getSubjects();
  const professors = await getAllProfessors();
  const professor = professorId
    ? professors.find(
        (p: Professor) => p.id == parseInt(professorId.toString()),
      )
    : null;
  const course = await getCourseBySubjectCourseCode(
    subjectCode as string,
    parseInt(courseCode as string),
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-white">
        Add Review
      </h1>
      <ReviewCreateForm
        subject={subject}
        subjects={subjects}
        professor={professor}
        professors={professors}
        course={course}
      />
    </div>
  );
}
