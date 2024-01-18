import CourseTable from "@/components/course-table/course_table";
import CourseListingHeader from "@/components/course-table/course_table_header";
import { fetchCourseTableData } from "@/lib/data/course";
import { CourseTableColumn } from "@/lib/definitions/course";
import { getTermByName } from "@/lib/utils";

export default async function Page({ searchParams }: { searchParams: string }) {
  const params = new URLSearchParams(searchParams);
  const year = params.get("year") ? Number(params.get("year")) : null;
  const term = getTermByName(params.get("term") || "");

  const courseTableData: CourseTableColumn[] = await fetchCourseTableData(
    year,
    term,
  );

  return (
    <div className="flex flex-col place-items-center justify-center space-y-4">
      <CourseListingHeader />
      <CourseTable data={courseTableData} />
    </div>
  );
}
