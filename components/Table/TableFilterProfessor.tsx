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
  professors: string[];
  selectedProfessor: string;
  onProfessorChange: (value: string) => void;
}

export default function TableFilterProfessor({
  professors,
  selectedProfessor,
  onProfessorChange,
}: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-primary-white text-xs">Professor</label>
      <Select
        defaultValue={selectedProfessor}
        onValueChange={onProfessorChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {professors.map((professor) => (
            <SelectItem key={professor} value={professor}>
              {professor}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
