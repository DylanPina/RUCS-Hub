import { getCoursePageBySubjectCourseCode } from "@/lib/data/course";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePage } from "@/lib/definitions/course";
import CourseBanner from "@/components/Course/CourseBanner";
import CourseReviews from "@/components/Course/CourseReviews";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.id.replace("%3A", ":"),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [subjectCode, code] = id.split("%3A");
  const coursePage: CoursePage | null = await getCoursePageBySubjectCourseCode(
    subjectCode,
    Number(code),
  );

  if (!coursePage) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-3">
      <CourseBanner coursePage={coursePage} />
      <CourseReviews reviews={coursePage.reviews} />
    </div>
  );
}
