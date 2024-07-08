import type { Metadata } from "next";
import CourseTable from "@/components/CourseTable/CourseTable";
import CourseTableHeader from "@/components/CourseTable/CourseTableHeader";
import { getAllCourseTableListing } from "@/lib/data/course";
import { CourseTableColumn } from "@/lib/definitions/course";

export const metadata: Metadata = {
  title: "Courses",
};

export default async function Page() {
  const courseTableData: CourseTableColumn[] = await getAllCourseTableListing();

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <CourseTableHeader />
      <CourseTable data={courseTableData} />
    </div>
  );
}
