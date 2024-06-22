"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface Props {
  selectedValue: string;
  options: [string, string][];
  onSelectChange: (value: string) => void;
}

export default function TableSortBy({
  selectedValue,
  onSelectChange,
  options,
}: Props) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-primary-white text-xs">Sort By</label>
      <Select defaultValue={selectedValue} onValueChange={onSelectChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
