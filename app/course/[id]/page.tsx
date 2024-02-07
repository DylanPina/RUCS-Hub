import { queryCourseByCode } from "@/lib/data/course";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePage } from "@/lib/definitions/course";

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
  const course: CoursePage | null = await queryCourseByCode(Number(id));

  console.log(course);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-x-2">
        <h3 className="font-bold">Code:</h3> <span>{course.courseCode}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Name:</h3> <span>{course.courseName}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Prereqs:</h3>
        {course.prereqs.length !== 0 ? (
          <ul className="flex flex-col space-y-5">
            {course.prereqs.map((prereq: string) => (
              <li key={prereq}>{prereq}</li>
            ))}
          </ul>
        ) : (
          <li className="ml-10">None</li>
        )}
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Overall rating:</h3>
        <span>{course.rating}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Difficulty rating:</h3>
        <span>{course.difficulty !== -1 ? course.difficulty : "?"}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Workload:</h3>
        <span>
          {course.workload !== -1 ? `${course.workload} hours per week` : "?"}
        </span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Lecture rating:</h3>
        <span>{course.lectureRating !== -1 ? course.lectureRating : "?"}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Piazza rating:</h3>{" "}
        <span>{course.piazzaRating !== -1 ? course.piazzaRating : "?"}</span>
      </div>
      <h2 className="font-bold">Reviews:</h2>
      {course.reviews.length !== 0 ? (
        <ul className="ml-10 flex flex-col space-y-5">
          {course.reviews.map((review: any) => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <span className="ml-10">No reviews found</span>
      )}
    </div>
  );
}
