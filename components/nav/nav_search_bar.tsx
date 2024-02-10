"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../shadcn/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import { Button } from "../shadcn/ui/button";
import { CourseTableColumn } from "@/lib/definitions/course";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { getProfessorRoute, titleCase } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  courses: CourseTableColumn[];
  professors: ProfessorTableColumn[];
}

export default function NavSearchBar({ courses, professors }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleCourseSelect(course: CourseTableColumn) {
    setOpen(false);
    router.push(`/course/${course.courseCode}`);
  }

  function handleProfessorSelect(professor: ProfessorTableColumn) {
    setOpen(false);
    router.push(getProfessorRoute(professor.lastName, professor.firstName));
  }

  return (
    <div className="flex place-items-center w-full">
      <div className="max-sm:hidden relative place-items-center w-full">
        <IoSearchSharp
          size={24}
          className="sm:absolute sm:left-2 sm:top-1/2 sm:transform sm:-translate-y-1/2"
        />
        <Button
          className="max-w-md max-sm:hidden pl-10 focus:border-2 focus:border-primary-red text-zinc-500 font-normal transition-all duration-150 ease-out hover:ease-in outline outline-1 outline-primary-white hover:outline-2 hover:outline-primary-red hover:shadow-primary-red"
          onClick={() => setOpen(true)}
        >
          Search courses & professors...
          <p className="text-xs text-muted-foreground">
            <kbd className="pointer-events-none inline-flex ml-3 select-none items-center gap-1 rounded bg-primary-white/10 px-1 text-muted-foreground opacity-100">
              <span className="text-sm">⌘</span>K
            </kbd>
          </p>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-primary-black">
          <CommandInput placeholder="Search courses & professors..." />
          <CommandList className="text-primary-white">
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Courses" className="text-primary-white">
              {courses.map((course: CourseTableColumn) => (
                <CommandItem
                  key={course.courseCode}
                  className="aria-selected:bg-primary-red/50 aria-selected:text-primary-white rounded cursor-pointer"
                  onSelect={() => handleCourseSelect(course)}
                >
                  ({course.courseCode}) {course.courseName}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Professors" className="text-primary-white">
              {professors.map((professor: ProfessorTableColumn) => (
                <CommandItem
                  key={`${professor.lastName}-${professor.firstName}`}
                  className="aria-selected:bg-primary-red/50 aria-selected:text-primary-white rounded cursor-pointer"
                  onSelect={() => handleProfessorSelect(professor)}
                >
                  {titleCase(professor.firstName)}{" "}
                  {titleCase(professor.lastName)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
      <Dialog>
        <DialogTrigger className="sm:hidden">
          <IoSearchSharp
            size={24}
            className="sm:absolute sm:left-2 sm:top-1/2 sm:transform sm:-translate-y-1/2"
          />
        </DialogTrigger>
        <DialogContent className="w-10/12 bg-primary-black pt-12 rounded">
          <DialogHeader>
            <DialogTitle>Search courses and professors</DialogTitle>
          </DialogHeader>
          <Input className="focus:border-2 focus:border-primary-red" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
