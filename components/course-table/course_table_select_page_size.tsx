import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Table } from "@tanstack/react-table";

interface CourseTableSelectPageSizeProps {
  table: Table<any>;
}

export default function CourseTableSelectPageSize({
  table,
}: CourseTableSelectPageSizeProps) {
  return (
    <Select
      value={table.getState().pagination.pageSize.toString()}
      onValueChange={(pageSize: string) => {
        console.log(pageSize);
        return table.setPageSize(Number(pageSize));
      }}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select a year..." />
      </SelectTrigger>
      <SelectContent>
        {[10, 20, 30, 40, 50].map((pageSize: number) => (
          <SelectItem value={pageSize.toString()} key={pageSize}>
            Show {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
