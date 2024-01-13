import React from "react";
import { Input } from "../shadcn/ui/input";
import { IoSearchSharp } from "react-icons/io5";

export default function NavSearchBar() {
  return (
    <div className="sm:relative flex place-items-center w-full">
      <IoSearchSharp
        size={24}
        className="sm:absolute sm:left-2 sm:top-1/2 sm:transform sm:-translate-y-1/2"
      />
      <Input
        className="max-w-md max-sm:hidden focus:w-full focus:max-w-lg pl-10 focus:border-2 focus:border-primary-red"
        placeholder="Search for a course or a professor..."
      />
    </div>
  );
}
