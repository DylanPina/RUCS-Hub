import { queryCourseByCode } from "@/lib/data/course";
import { notFound } from "next/navigation";
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
  const course: any | null = await queryCourseByCode(Number(id));

  if (!course) {
    notFound();
  }

  return (
    <ul className="flex flex-col space-y-5">
      <li>
        <span className="font-bold">Code:</span> {course.courseCode}
      </li>
      <li>
        <span className="font-bold">Name:</span> {course.courseName}
      </li>
      <li>
        <span className="font-bold">Overall rating:</span> {course.rating}
      </li>
      <li>
        <span className="font-bold">Difficulty rating:</span>{" "}
        {course.difficulty}
      </li>
      <li>
        <span className="font-bold">Workload:</span> {course.workload} hours per
        week
      </li>
      <li>
        <span className="font-bold">Lecture rating:</span>{" "}
        {course.lectureRating}
      </li>
      <li>
        <span className="font-bold">Piazza rating:</span> {course.piazzaRating}
      </li>
      <h2 className="font-bold">Reviews:</h2>
      <ul className="ml-10 flex flex-col space-y-5">
        {course.reviews.map((review: any) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </ul>
  );
}
