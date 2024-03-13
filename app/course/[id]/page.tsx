import { queryCourseByCode } from "@/lib/data/course";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePage } from "@/lib/definitions/course";
import CourseBanner from "@/components/course/course-banner";
import CourseReviews from "@/components/course/course-reviews";

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
  const coursePage: CoursePage | null = await queryCourseByCode(Number(id));

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
