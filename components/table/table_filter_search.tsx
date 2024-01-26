import React from "react";
import { IoFilter } from "react-icons/io5";
import { Input } from "../shadcn/ui/input";

interface Props {
  globalFilter: any;
  setGlobalFilter: any;
  placeHolder: string;
}
export default function TableFilterSearch({
  globalFilter,
  setGlobalFilter,
  placeHolder,
}: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-primary-white text-xs">Filter</label>
      <div className="relative w-full">
        <IoFilter
          size={18}
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
        />
        <Input
          placeholder={placeHolder}
          value={globalFilter || ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm pl-8 focus:border-2 focus:border-primary-red transition-all duration-150 ease-out hover:ease-in"
        />
      </div>
    </div>
  );
}
