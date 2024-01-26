import { Table } from "@tanstack/react-table";

interface TablePageSizeProps {
  table: Table<any>;
}

export default function TablePageSize({ table }: TablePageSizeProps) {
  return (
    <span className="flex items-center text-sm font-semibold">
      {` Page ${
        table.getState().pagination.pageIndex + 1
      } of ${table.getPageCount()}`}
    </span>
  );
}
