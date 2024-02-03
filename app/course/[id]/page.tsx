import { queryCourseByCode } from "@/lib/data/course";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Course } from "@prisma/client";

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
  const course: Course | null = await queryCourseByCode(Number(id));

  if (!course) {
    notFound();
  }

  return (
    <ul className="flex flex-col space-y-5">
      <li>Course code: {course.code}</li>
      <li>Course name: {course.name}</li>
    </ul>
  );
}
