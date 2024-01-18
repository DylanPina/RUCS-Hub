"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Term } from "@/lib/definitions/course";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getTermByName, validateCourseTermYear } from "@/lib/utils";

export default function CourseFilterTerm() {
  const [term, setTerm] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setTerm(searchParams.get("term") || "any");
    setYear(searchParams.get("year") || "any");
  }, [searchParams]);

  function setTermParam(term: string | null | undefined) {
    const params = new URLSearchParams(searchParams);
    if (term && term.toLowerCase() !== "any") {
      params.set("term", term);
    } else {
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function getValidTerms(): string[] {
    const terms: any[] = Object.values(Term).filter((value) =>
      isNaN(Number(value)),
    );
    const validTerms: string[] = [];
    console.log(`Terms: ${terms}`);
    terms.forEach((term: string) => {
      if (
        year == "any" ||
        validateCourseTermYear(Number(year), getTermByName(term))
      ) {
        validTerms.push(term);
      }
    });
    return validTerms;
  }

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-primary-white text-xs">Term</label>
      <Select value={term} onValueChange={setTermParam}>
        <SelectTrigger className="selection:border selection:border-red-400">
          <SelectValue placeholder="Select a term..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any" key="any">
            Any
          </SelectItem>
          {getValidTerms().map((term) => (
            <SelectItem value={term.toString()} key={term.toString()}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
