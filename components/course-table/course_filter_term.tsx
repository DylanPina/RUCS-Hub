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

export default function CourseFilterTerm() {
  const [term, setTerm] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setTerm(searchParams.get("term") || "any");
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

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-primary-white text-xs">Term</label>
      <Select value={term} onValueChange={setTermParam}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a term..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any" key="any">
            Any
          </SelectItem>
          {Object.values(Term)
            .filter((value) => isNaN(Number(value)))
            .map((term) => (
              <SelectItem value={term.toString()} key={term.toString()}>
                {term}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
