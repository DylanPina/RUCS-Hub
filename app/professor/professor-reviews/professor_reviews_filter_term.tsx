"ues client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { getValidTerms } from "@/lib/utils";

interface ProfessorReviewsFilterTermProps {
  selectedTerm: string;
  onTermChange: (value: string) => void;
}

export default function ProfessorReviewsFilterTerm({
  selectedTerm,
  onTermChange,
}: ProfessorReviewsFilterTermProps) {
  const terms = getValidTerms(null);
  terms.push("Any");

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-primary-white text-xs">Term</label>
      <Select defaultValue={selectedTerm} onValueChange={onTermChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {terms.map((term) => (
            <SelectItem key={term} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
