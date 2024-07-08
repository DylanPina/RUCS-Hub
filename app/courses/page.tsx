import type { Metadata } from "next";
import CourseTable from "@/components/CourseTable/CourseTable";
import CourseTableHeader from "@/components/CourseTable/CourseTableHeader";
import { getAllCourseTableListing } from "@/lib/data/course";
import { CourseTableColumn } from "@/lib/definitions/course";
import { getSubjects } from "@/lib/data/subject";

export const metadata: Metadata = {
  title: "Courses",
};

export default async function Page() {
  const courseTableData: CourseTableColumn[] = await getAllCourseTableListing();
  const subjects = await getSubjects();

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <CourseTableHeader />
      <CourseTable courseData={courseTableData} subjects={subjects} />
    </div>
  );
}
