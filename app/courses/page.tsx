import type { Metadata } from "next";
import CourseTable from "@/components/CourseTable/CourseTable";
import CourseTableHeader from "@/components/CourseTable/CourseTableHeader";
import { queryCourseTableDataByYearTerm } from "@/lib/data/course";
import { CourseTableColumn } from "@/lib/definitions/course";
import { getTermByName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Courses",
};

export default async function Page({ searchParams }: { searchParams: string }) {
  const params = new URLSearchParams(searchParams);
  const year = params.get("year") ? Number(params.get("year")) : null;
  const term = getTermByName(params.get("term") || "");

  const courseTableData: CourseTableColumn[] =
    await queryCourseTableDataByYearTerm(year, term);

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <CourseTableHeader />
      <CourseTable data={courseTableData} />
    </div>
  );
}
