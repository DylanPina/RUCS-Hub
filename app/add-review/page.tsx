import ReviewCreateForm from "@/components/reviews/review_create_form";
import { queryAllCourses } from "@/lib/data/course";
import { queryAllProfessors } from "@/lib/data/professor";
import React from "react";

export default async function Page() {
  const professors = await queryAllProfessors();
  const courses = await queryAllCourses();

  console.log(`Courses: ${JSON.stringify(courses, null, 2)}`);
  console.log(`Professors: ${JSON.stringify(professors, null, 2)}`);

  return (
    <div className="flex w-full justify-center">
      <ReviewCreateForm professors={professors} courses={courses} />
    </div>
  );
}
