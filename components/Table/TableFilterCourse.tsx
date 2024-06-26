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
  courses: string[];
  selectedCourse: string;
  onCourseChange: (value: string) => void;
}

export default function TableFilterCourse({
  courses,
  selectedCourse,
  onCourseChange,
}: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-primary-white text-xs">Course</label>
      <Select defaultValue={selectedCourse} onValueChange={onCourseChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {courses.map((course) => (
            <SelectItem key={course} value={course}>
              {course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
