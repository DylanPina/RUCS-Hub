"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getTermByName, getValidYears } from "@/lib/utils";

export default function CourseFilterYear() {
  const [year, setYear] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [validYears, setValidYears] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setYear(searchParams.get("year") || "any");
    setTerm(searchParams.get("term") || "any");
    setValidYears(getValidYears(term == "any" ? null : getTermByName(term)));
  }, [searchParams, term, year]);

  function setYearParam(year: string | null | undefined): void {
    const params = new URLSearchParams(searchParams);
    if (year && year.toLowerCase() !== "any") {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    replace(`${pathname}?${params.toString()}`);
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
          {validYears.map((year: number) => (
            <SelectItem value={year.toString()} key={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
