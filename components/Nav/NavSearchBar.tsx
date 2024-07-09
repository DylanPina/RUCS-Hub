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
  formatSubjectName,
  getCourseRoute,
  getProfessorRoute,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { Subject } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/shadcn/utils";
import { Label } from "../shadcn/ui/label";

interface Props {
  courses: CourseTableColumn[];
  subjects: Subject[];
  professors: ProfessorTableColumn[];
}

export default function NavSearchBar({ courses, professors, subjects }: Props) {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState<string>("professors");
  const [selectedSubject, setSelectedSubject] = useState<Subject>(subjects[0]);
  const [filteredCourses, setFilteredCourses] = useState<CourseTableColumn[]>(
    [],
  );
  const [openSubjects, setOpenSubjects] = React.useState(false);
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

  useEffect(() => {
    if (selectedSubject) {
      setFilteredCourses(
        courses.filter((course) => course.subjectCode === selectedSubject.code),
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedSubject, courses]);

  function handleCourseSelect(course: CourseTableColumn) {
    setOpen(false);
    router.push(getCourseRoute(course.subjectCode, course.code));
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
          className="max-w-md max-md:hidden pl-10 pr-2 focus:border-2 focus:border-primary-red text-zinc-500 font-normal transition-all duration-150 ease-out hover:ease-in border border-primary-white hover:border-primary-red hover:shadow-primary-red"
          onClick={() => setOpen(true)}
        >
          Search courses & professors...
          <p className="text-xs text-muted-foreground">
            <kbd className="pointer-events-none inline-flex ml-3 select-none items-center gap-1 rounded overflow-hidden bg-primary-white/10 px-1 text-muted-foreground opacity-100">
              <span className="text-sm">⌘</span>K
            </kbd>
          </p>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-primary-black text-primary-white max-sm:rounded overflow-hidden">
          <CommandInput
            placeholder={
              tabValue === "professors"
                ? "Search professors..."
                : "Search courses..."
            }
          />
          <Tabs
            onValueChange={(value) => setTabValue(value)}
            defaultValue={tabValue}
            className="w-full bg-primary-black"
          >
            <div className="flex flex-col space-y-2 justify-center align-center">
              <TabsList className="flex w-full bg-primary-black space-between">
                <TabsTrigger value="professors">Professors</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              {tabValue === "courses" && (
                <div className="flex flex-col space-y-1 !mt-[-0.5rem]">
                  <Label className="text-zinc-500 font-medium text-[0.75rem] ml-4 mb-1">
                    Subject
                  </Label>
                  <Popover open={openSubjects} onOpenChange={setOpenSubjects}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex justify-between bg-primary-black w-full border-x-0 overflow-ellipsis hover:text-primary-white hover:bg-primary-black truncate text-overflow-ellipsis",
                        )}
                      >
                        {!selectedSubject
                          ? "Any"
                          : formatSubjectName(selectedSubject)}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-primary-black text-primary-white w-full max-sm:max-w-[375px] max-h-[400px] overflow-scroll z-50">
                      <Command
                        filter={(value, search) => {
                          return value
                            .toLowerCase()
                            .includes(search.toLowerCase())
                            ? 1
                            : 0;
                        }}
                        className="bg-primary-black text-primary-white"
                      >
                        <CommandInput
                          placeholder="Search subjects..."
                          className="h-9"
                        />
                        <CommandEmpty>No subject found</CommandEmpty>
                        <CommandGroup className="bg-primary-black text-primary-white">
                          {subjects.map((subject: any) => (
                            <CommandItem
                              value={formatSubjectName(subject)}
                              key={subject.code}
                              onSelect={() => {
                                setSelectedSubject(subject);
                                setOpenSubjects(false);
                              }}
                            >
                              {formatSubjectName(subject)}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  subject.name === selectedSubject
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            <CommandList className="text-primary-white">
              <TabsContent value="professors">
                <CommandGroup
                  heading="Professors"
                  className="text-primary-white"
                >
                  {professors.map((professor: ProfessorTableColumn) => (
                    <CommandItem
                      key={formatProfessorName(
                        professor.lastName,
                        professor.firstName,
                      )}
                      className="aria-selected:bg-primary-red/50 aria-selected:text-primary-white rounded overflow-hidden cursor-pointer"
                      onSelect={() => handleProfessorSelect(professor)}
                    >
                      {formatProfessorName(
                        professor.lastName,
                        professor.firstName,
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </TabsContent>
              <TabsContent value="courses">
                <CommandGroup heading="Courses" className="text-primary-white">
                  {filteredCourses.map((course: CourseTableColumn) => (
                    <CommandItem
                      key={`${course.subjectCode}-${course.code}`}
                      className="aria-selected:bg-primary-red/50 aria-selected:text-primary-white rounded overflow-hidden cursor-pointer"
                      onSelect={() => handleCourseSelect(course)}
                    >
                      {`${course.subjectCode}:${course.code} - ${course.name}`}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </TabsContent>
            </CommandList>
          </Tabs>
          <CommandEmpty className="text-primary-white text-center !pb-4">
            No results found...
          </CommandEmpty>
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
