import { Table } from "@tanstack/react-table";

interface CourseTablePageSizeProps {
  table: Table<any>;
}

export default function CourseTablePageSize({
  table,
}: CourseTablePageSizeProps) {
  return (
    <span className="flex items-center text-sm font-semibold">
      {` Page ${
        table.getState().pagination.pageIndex + 1
      } of ${table.getPageCount()}`}
    </span>
  );
}
