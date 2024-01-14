import CourseTable from "@/components/course-table/course_table";
import CourseListingHeader from "@/components/course-table/course_table_header";
import { courseTableMockData } from "@/lib/mock-data/coure-mock-data";

export default async function Page() {
  return (
    <div className="flex flex-col place-items-center justify-center space-y-10 w-full">
      <CourseListingHeader />
      <CourseTable data={courseTableMockData} />
    </div>
  );
}
