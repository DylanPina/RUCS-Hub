"ues client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface Props {
  years: any[];
  selectedYear: string;
  onYearChange: (value: string) => void;
}

export default function ReviewsFilterYear({
  years,
  selectedYear,
  onYearChange,
}: Props) {
  const yearsSet = Array.from(new Set(years));

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-primary-white text-xs">Year</label>
      <Select
        defaultValue={selectedYear.toString()}
        onValueChange={onYearChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="Any" value="Any">
            Any
          </SelectItem>
          {yearsSet.map((year: string) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
