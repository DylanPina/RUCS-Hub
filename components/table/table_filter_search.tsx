"use client";

import React, { useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-lg flex-col space-y-1">
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
          ref={inputRef}
          className="pl-8 pr-8 focus:border-2 focus:border-primary-red hover:border-primary-red transition-all duration-150 ease-out hover:ease-in"
        />
        <p className="max-sm:hidden absolute text-xs text-zinc-400 right-2 top-1/2 transform -translate-y-1/2">
          <kbd className="inline-flex ml-3 select-none items-center gap-1 rounded overflow-hidden bg-primary-white/10 px-2 py-1 text-muted-foreground">
            /
          </kbd>
        </p>
      </div>
    </div>
  );
}
