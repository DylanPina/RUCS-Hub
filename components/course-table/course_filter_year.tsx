import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getTermByName, validateCourseTermYear } from "@/lib/utils";
import { MIN_YEAR, MAX_YEAR } from "@/lib/constants";

export default function CourseFilterYear() {
  const [year, setYear] = useState<string>("");
  const [term, setTerm] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setYear(searchParams.get("year") || "any");
    setTerm(searchParams.get("term") || "any");
  }, [searchParams]);

  function setYearParam(year: string | null | undefined): void {
    const params = new URLSearchParams(searchParams);
    if (year && year.toLowerCase() !== "any") {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function getValidYears(): number[] {
    const years: number[] = [];
    for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
      if (
        (term != "any" && validateCourseTermYear(year, getTermByName(term))) ||
        term == "any"
      ) {
        years.push(year);
      }
    }
    return years;
  }

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-primary-white text-xs">Year</label>
      <Select value={year} onValueChange={setYearParam}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a year..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any" key="any">
            Any
          </SelectItem>
          {getValidYears().map((year: number) => (
            <SelectItem value={year.toString()} key={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
