"ues client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { getYears } from "@/lib/utils";

interface ProfessorReviewsFilterYearProps {
  selectedYear: string;
  onYearChange: (value: string) => void;
}

export default function ReviewsFilterYear({
  selectedYear,
  onYearChange,
}: ProfessorReviewsFilterYearProps) {
  const years = getYears().map((year) => year.toString());
  years.unshift("Any");

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
          {years.map((year: string) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
