import { fetchCourseById } from "@/lib/data/course";
import { Course } from "@/lib/definitions/course";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const course: Course = await fetchCourseById(Number(id));

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
