"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface ProfessorReviewSortByProps {
  selectedValue: string;
  onSelectChange: (value: string) => void;
}

export default function ProfessorReviewSortBy({
  selectedValue,
  onSelectChange,
}: ProfessorReviewSortByProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-primary-white text-xs">Sort By</label>
      <Select defaultValue={selectedValue} onValueChange={onSelectChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="upvotes">Upvotes</SelectItem>
          <SelectItem value="downvotes">Downvotes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
