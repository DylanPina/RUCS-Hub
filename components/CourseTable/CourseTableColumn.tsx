import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { CourseTableColumn } from "@/lib/definitions/course";

export const columns: ColumnDef<CourseTableColumn>[] = [
  {
    accessorKey: "subjectCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start text-primary-white p-0 text-start min-w-[200px] hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "credits",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
  //       >
  //         Credits
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: (props: any) => <span>{props.getValue() ?? "?"}</span>,
  //   // meta: {
  //   //   align: "right",
  //   // },
  // },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props: any) => (
      <span>
        {props.row.original.difficulty !== -1
          ? props.getValue().toFixed(1)
          : "?"}
      </span>
    ),
  },
  {
    accessorKey: "workload",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Workload
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props: any) => (
      <span>
        {props.row.original.workload !== -1 ? props.getValue().toFixed(1) : "?"}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Overall
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props: any) => (
      <span>
        {props.row.original.rating !== -1 ? props.getValue().toFixed(1) : "?"}
      </span>
    ),
  },
  {
    accessorKey: "reviews",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Reviews
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
