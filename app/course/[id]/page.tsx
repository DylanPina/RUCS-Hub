import { fetchCourseById } from "@/lib/data/course";
import { notFound } from "next/navigation";
import { Course } from "@/lib/definitions/course";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.id,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const course: Course = await fetchCourseById(Number(id));

  if (!course) {
    notFound();
  }

  return (
    <ul className="flex flex-col space-y-5">
      <li>Course code: {course.courseCode}</li>
      <li>Course name: {course.courseName}</li>
      <li>Synopsis URL: {course.synopsisUrl}</li>
      <li>Credits: {course.credits}</li>
      <ul>
        <li>Prereqs:</li>
        {course.prereqs?.map((s: string) => <li key={s}>({s})</li>)}
      </ul>
    </ul>
  );
}
