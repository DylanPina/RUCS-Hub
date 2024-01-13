import React from "react";
import { Input } from "../shadcn/ui/input";
import { IoSearchSharp } from "react-icons/io5";

export default function NavSearchBar() {
  return (
    <div className="relative w-full">
      <IoSearchSharp
        size={24}
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
      />
      <Input
        className="max-w-md focus:w-full focus:max-w-lg pl-10 focus:border-2 focus:border-primary-red"
        placeholder="Search for a course or a professor..."
      />
    </div>
  );
}
