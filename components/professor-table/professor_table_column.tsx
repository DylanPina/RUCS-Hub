import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../shadcn/ui/button";
import { ArrowUpDown } from "lucide-react";
import { titleCase } from "@/lib/utils";

export const columns: ColumnDef<ProfessorTableColumn>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props: any) => <span>{titleCase(props.getValue())}</span>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-white p-0 hover:bg-transparent hover:font-black hover:text-primary-white"
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props: any) => (
      <span>{props.getValue() !== "" ? titleCase(props.getValue()) : "?"}</span>
    ),
  },
  {
    accessorKey: "overall",
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
      <span>{props.row.original.overall !== -1 ? props.getValue() : "?"}</span>
    ),
    // meta: {
    //   align: "right",
    // },
  },
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
        {props.row.original.difficulty !== -1 ? props.getValue() : "?"}
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
    cell: (props: any) => (
      <span>{props.row.original.reviews ? props.getValue() : "?"}</span>
    ),
  },
];
