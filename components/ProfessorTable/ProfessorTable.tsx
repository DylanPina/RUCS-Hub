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
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import TableFilterSearch from "../Table/TableFilterSearch";
import TablePageSize from "../Table/TablePageSize";
import TableSelectPageSize from "../Table/TableSelectPage";
import { Button } from "../shadcn/ui/button";
import { columns } from "./ProfessorTableColumn";
import { getProfessorRoute } from "@/lib/utils";
import dynamic from "next/dynamic";
import LoadingTable from "../Table/LoadingTable";

interface ProfessorTableProps {
  data: ProfessorTableColumn[];
}

function ProfessorTable({ data }: ProfessorTableProps) {

  const LOCALSTORAGENAME = "professorTableStorage";

  const initialHookReturn = (defaultReturnValue:any, property:any) => {
    if(typeof window === "undefined") return defaultReturnValue;
    const storage = localStorage.getItem(LOCALSTORAGENAME);
    return (storage && storage!=='undefined') ? 
      (property ? JSON.parse(storage)?.[property] : JSON.parse(storage)) 
    : defaultReturnValue;
  }

  const [sorting, setSorting] = useState<SortingState>(()=>{return initialHookReturn([], "sorting")});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>(()=>{return initialHookReturn([], "globalFilter")});
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGENAME, 
      JSON.stringify({"sorting":sorting, "globalFilter":globalFilter}));
  }, [sorting, globalFilter]);

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
      <div className="max-sm:w-full sm:max-w-[300px] py-4">
        <TableFilterSearch
          filter={globalFilter}
          setFilter={setGlobalFilter}
          placeHolder="Filter professors..."
        />
      </div>
      <div className="rounded overflow-hidden-md border">
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
                    router.push(
                      getProfessorRoute(
                        row.original.lastName,
                        row.original.firstName,
                      ),
                    )
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

export default dynamic (() => Promise.resolve(ProfessorTable),{ssr :false, loading: () => <LoadingTable />});