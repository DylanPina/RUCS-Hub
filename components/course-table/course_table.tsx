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
import { columns } from "./course_table_column";
import { rankItem } from "@tanstack/match-sorter-utils";
import CourseFilterTerm from "./course_table_filter_term";
import CourseFilterYear from "./course_table_filter_year";
import TableFilterSearch from "../table/table_filter_search";
import TableSelectPageSize from "../table/table_select_page_size";
import { useRouter } from "next/navigation";
import TablePageSize from "../table/table_page_size";

interface CourseTableProps {
  data: CourseTableColumn[];
}

export default function CourseTable({ data }: CourseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const router = useRouter();

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
    <div className="min-w-[75%] max-lg:w-screen max-lg:px-4">
      <div className="flex place-items-center py-4">
        <div className="flex w-full sm:content-center md:space-x-4 max-md:flex-col-reverse">
          <div className="max-sm:w-full sm:max-w-[300px] max-md:pt-4">
            <TableFilterSearch
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              placeHolder="Filter courses..."
            />
          </div>
          <div className="flex content-center items-center space-x-4 h-fit">
            <CourseFilterTerm />
            <CourseFilterYear />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="p-10">
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
                  onClick={() =>
                    router.push(`/course/${row.original.courseCode}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      align={(cell.column.columnDef.meta as any)?.align}
                    >
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
      <div className="flex max-sm:flex-col max-sm:place-content-start sm:place-content-between sm:space-x-2 max-sm:space-y-4 w-full py-4">
        <div className="flex space-x-4">
          <TablePageSize table={table} />
          <TableSelectPageSize table={table} />
        </div>
        <div className="flex space-x-2">
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
    </div>
  );
}
