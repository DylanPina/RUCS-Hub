import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Table } from "@tanstack/react-table";

interface TableSelectPageSizeProps {
  table: Table<any>;
}

export default function TableSelectPageSize({
  table,
}: TableSelectPageSizeProps) {
  return (
    <Select
      value={table.getState().pagination.pageSize.toString()}
      onValueChange={(pageSize: string) => table.setPageSize(Number(pageSize))}
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
