"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { CourseTableColumn } from "@/lib/definitions/course";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import { columns } from "./course_column";
import { Input } from "@/components/shadcn/ui/input";
import { rankItem } from "@tanstack/match-sorter-utils";
import { IoFilter } from "react-icons/io5";
import CourseFilterTerm from "./course_filter_term";
import CourseFilterYear from "./course_filter_year";

interface CourseTableProps {
  data: CourseTableColumn[];
}

export default function CourseTable({ data }: CourseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const fuzzyFilter: FilterFn<any> = (
    row: any,
    columnId: any,
    value: any,
    addMeta: any,
  ) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="max-lg:w-screen max-lg:p-4">
      <div className="flex items-center py-4">
        <div className="flex flex-col space-y-4">
          <CourseFilterTerm />
          <CourseFilterYear />
          <div className="relative w-full">
            <IoFilter
              size={18}
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            />
            <Input
              placeholder="Filter courses..."
              value={globalFilter || ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm pl-8 focus:border-2 focus:border-primary-red transition-all duration-150 ease-out hover:ease-in"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="transition-colors bg-primary-white/[0.05] hover:bg-primary-white/[0.05] hover:font-bold"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-primary-red/20 hover:font-bold"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-primary-white text-primary-black hover:bg-primary-red border-0 disabled:bg-primary-white/90 transition duration-150 ease-out hover:ease-in"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-primary-white text-primary-black hover:bg-primary-red border-0 disabled:bg-primary-white/90 transition duration-150 ease-out hover:ease-in"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
