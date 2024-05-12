"use client";

import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
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
import {
  formatProfessorName,
  getCourseRoute,
  getProfessorRoute,
} from "@/lib/utils";
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
    router.push(getCourseRoute(course.courseCode));
  }

  function handleProfessorSelect(professor: ProfessorTableColumn) {
    setOpen(false);
    router.push(getProfessorRoute(professor.lastName, professor.firstName));
  }

  return (
    <div className="flex place-items-center w-full">
      <div className="max-md:hidden relative place-items-center w-full">
        <IoSearchSharp
          size={24}
          className="md:absolute md:left-2 md:top-1/2 md:transform md:-translate-y-1/2"
        />
        <Button
          className="max-w-md max-md:hidden pl-10 pr-2 focus:border-2 focus:border-primary-red text-zinc-500 font-normal transition-all duration-150 ease-out hover:ease-in outline outline-1 outline-primary-white hover:outline-primary-red hover:shadow-primary-red"
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
        <Command className="bg-primary-black max-sm:rounded">
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
                  {course.courseCode} - {course.courseName}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Professors" className="text-primary-white">
              {professors.map((professor: ProfessorTableColumn) => (
                <CommandItem
                  key={formatProfessorName(
                    professor.lastName,
                    professor.firstName,
                  )}
                  className="aria-selected:bg-primary-red/50 aria-selected:text-primary-white rounded cursor-pointer"
                  onSelect={() => handleProfessorSelect(professor)}
                >
                  {formatProfessorName(professor.lastName, professor.firstName)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
      <IoSearchSharp
        size={24}
        className="md:hidden md:absolute md:left-2 md:top-1/2 md:transform md:-translate-y-1/2 w-8 h-8 fill-primary-white"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}
