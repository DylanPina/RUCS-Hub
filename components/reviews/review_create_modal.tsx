import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";
import { CoursePage } from "@/lib/definitions/course";
import { ProfessorPage } from "@/lib/definitions/professor";
import { Course } from "@prisma/client";

interface Props {
  course?: CoursePage;
  professor?: ProfessorPage;
}

export function ReviewCreateModal({ course, professor }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-black min-w-[425px] max-w-fit">
        <DialogHeader className="m-auto">
          <DialogTitle className="text-center">Add Review</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select disabled={!!course}>
              <SelectTrigger>
                <SelectValue
                  placeholder={course ? course.courseName : "Select a course"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Courses</SelectLabel>
                  {courses.map((c) => (
                    <SelectItem
                      key={c.code.toString()}
                      value={c.code.toString()}
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="max-w-fit transition-all duration-150 bg-primary-red hover:bg-primary-red/90 hover:shadow-primary-red/90"
            type="submit"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
