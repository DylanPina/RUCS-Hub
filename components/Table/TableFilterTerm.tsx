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
  terms: any[];
  selectedTerm: string;
  onTermChange: (value: string) => void;
}

export default function TableFilterTerm({
  terms,
  selectedTerm,
  onTermChange,
}: Props) {
  const termsSet = Array.from(new Set(terms));

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-primary-white text-xs">Term</label>
      <Select defaultValue={selectedTerm} onValueChange={onTermChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="Any" value="Any">
            Any
          </SelectItem>
          {termsSet.map((term: any) => (
            <SelectItem key={term} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
