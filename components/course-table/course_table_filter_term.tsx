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
import { getValidTerms } from "@/lib/utils";

export default function CourseFilterTerm() {
  const [term, setTerm] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [validTerms, setValidTerms] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setTerm(searchParams.get("term") || "any");
    setYear(searchParams.get("year") || "any");
    setValidTerms(getValidTerms(year == "any" ? null : Number(year)));
  }, [searchParams, year]);

  function setTermParam(term: string | null | undefined) {
    const params = new URLSearchParams(searchParams);
    if (term && term.toLowerCase() !== "any") {
      params.set("term", term);
    } else {
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);
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
          {validTerms.map((term) => (
            <SelectItem value={term.toString()} key={term.toString()}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
