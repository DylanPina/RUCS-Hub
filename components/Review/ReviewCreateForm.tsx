"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Course, Professor, Subject } from "@prisma/client";
import {
  formatCourseName,
  formatProfessorName,
  formatSubjectName,
  getTermNameByValue,
  getTerms,
  getYears,
  hashEmailAddress,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { Input } from "../shadcn/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Textarea } from "../shadcn/ui/textarea";
import createReview from "@/lib/actions/review";
import { ReviewForm } from "@/lib/definitions/review";
import { LoaderButton } from "@/components/shadcn/ui/loader-button";
import { getIfUserReviewedCourse } from "@/lib/actions/user";
import { toast } from "react-toastify";
import { Button } from "../shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { getCoursesBySubjectCodeAction } from "@/lib/actions/course";
import { LoadingSpinner } from "../shadcn/ui/loading-spinner";

interface Props {
  subject: Subject | null;
  subjects: Subject[];
  course?: Course | null;
  professor?: Professor | null;
  professors: Professor[];
}

export default function ReviewCreateForm({
  subject,
  subjects,
  course,
  professor,
  professors,
}: Props) {
  const { user } = useUser();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(
    subject,
  );
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openProfessors, setOpenProfessors] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const terms = getTerms();
  const years = getYears();

  useEffect(() => {
    const updateFilteredCourses = async () => {
      setLoadingCourses(true);
      setFilteredCourses(
        await getCoursesBySubjectCodeAction(selectedSubject?.code ?? ""),
      );
      setLoadingCourses(false);
    };
    updateFilteredCourses();
  }, [selectedSubject]);

  const FormSchema = z.object({
    subject: z.string({
      required_error: "You must select a subject",
    }),
    course: z.string().min(1, {
      message: "You must select a course",
    }),
    professor: z.string().min(1, {
      message: "You must select a professor",
    }),
    year: z.string({
      required_error: "You must select a year",
    }),
    term: z.string({
      required_error: "You must select a term",
    }),
    courseRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10"),
    courseDifficultyRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    courseWorkload: z
      .number()
      .min(1, "Workload must be at least 1 hour")
      .max(60, "Workload cannot exceed 60 hours")
      .optional(),
    professorRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    professorDifficultyRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    lectureRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title cannot exceed 100 characters"),
    content: z
      .string()
      .min(1, "Review must have content")
      .max(10000, "Review cannot exceed 10000 characters"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      subject: subject ? formatSubjectName(subject) : "",
      course: course ? formatCourseName(course) : "",
      professor: professor
        ? formatProfessorName(professor.lastName, professor.firstName)
        : "",
    },
  });

  function clearCourseSelection() {
    form.setValue("course", "");
  }

  function clearProfessorSelection() {
    form.setValue("professor", "");
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const userId = hashEmailAddress(user?.email as string);

    const code = parseInt(data.course.split(" ")[0]);

    const alreadyReviewed = await getIfUserReviewedCourse(
      user?.email as string,
      code,
    );

    if (alreadyReviewed) {
      toast.error("You have already posted a review for the selected course");
      setSubmitting(false);
      return;
    }

    await createReview(data as ReviewForm, userId);

    toast.success("Your review has been submitted");

    clearForm();
    setSubmitting(false);
  }

  function clearForm() {
    form.reset(
      {
        year: "",
        term: "",
        title: "",
        content: "",
      },
      {
        keepErrors: false,
      },
    );
    clearCourseSelection();
    clearProfessorSelection();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 w-full max-w-screen-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Subject *</FormLabel>
                <Popover open={openSubjects} onOpenChange={setOpenSubjects}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex justify-between bg-primary-black w-full overflow-ellipsis",
                          !field.value && "text-muted-foreground",
                          "hover:text-primary-white hover:bg-primary-black truncate text-overflow-ellipsis",
                        )}
                      >
                        {field.value || ""}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-primary-black text-primary-white w-full max-sm:max-w-[375px] max-h-[400px] overflow-auto">
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
                        {subjects.map((subject: Subject) => (
                          <CommandItem
                            value={formatSubjectName(subject)}
                            key={subject.code}
                            onSelect={() => {
                              form.setValue(
                                `subject`,
                                formatSubjectName(subject),
                              );
                              setSelectedSubject(subject);
                              setOpenSubjects(false);
                            }}
                          >
                            {formatSubjectName(subject)}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                subject.name === field.value
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Course *</FormLabel>
                <Popover open={openCourses} onOpenChange={setOpenCourses}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={!selectedSubject}
                        className={cn(
                          "flex w-full justify-between bg-primary-black",
                          !field.value && "text-muted-foreground",
                          "hover:text-primary-white hover:bg-primary-black",
                        )}
                      >
                        {field.value || ""}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-primary-black text-primary-white w-full max-sm:max-w-[375px] max-h-[400px] overflow-auto">
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
                        placeholder="Search courses..."
                        className="h-9"
                      />
                      <CommandEmpty>No courses found</CommandEmpty>
                      <CommandGroup className="bg-primary-black text-primary-white">
                        {!loadingCourses ? (
                          filteredCourses.map((course) => (
                            <CommandItem
                              value={`${course.code} - ${course.name}`}
                              key={course.name}
                              onSelect={() => {
                                form.setValue(
                                  "course",
                                  formatCourseName(course),
                                );
                                setOpenCourses(false);
                              }}
                            >
                              {course.code} - {course.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  course.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))
                        ) : (
                          <LoadingSpinner />
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          <FormField
            control={form.control}
            name="professor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professor *</FormLabel>
                <Popover open={openProfessors} onOpenChange={setOpenProfessors}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex w-full justify-between bg-primary-black",
                          !field.value && "text-muted-foreground",
                          "hover:text-primary-white hover:bg-primary-black",
                        )}
                      >
                        {field.value}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-primary-black text-primary-white max-w-[400px] w-full max-h-[400px] overflow-auto">
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
                        placeholder="Search professors..."
                        className="h-9"
                      />
                      <CommandEmpty>No professors found</CommandEmpty>
                      <CommandGroup className="bg-primary-black text-primary-white">
                        {professors.map((professor) => (
                          <CommandItem
                            value={formatProfessorName(
                              professor.lastName,
                              professor.firstName,
                            )}
                            key={formatProfessorName(
                              professor.lastName,
                              professor.firstName,
                            )}
                            onSelect={() => {
                              form.setValue(
                                "professor",
                                formatProfessorName(
                                  professor.lastName,
                                  professor.firstName,
                                ),
                              );
                              setOpenProfessors(false);
                            }}
                            className="cursor-pointer"
                          >
                            {formatProfessorName(
                              professor.lastName,
                              professor.firstName,
                            )}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                formatProfessorName(
                                  professor.lastName,
                                  professor.firstName,
                                ) === field.value
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary-black text-primary-white">
                    {years?.map((year: number) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year.toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary-black text-primary-white">
                    {terms?.map((term: number) => (
                      <SelectItem key={term} value={term.toString()}>
                        {getTermNameByValue(term)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex max-sm:flex-col sm:space-x-3 max-sm:justify-center max-sm:align-center max-sm:space-y-3">
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="courseRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Rating *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="courseDifficultyRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Difficulty Rating</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="courseWorkload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workload (hours per week)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 60
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex max-sm:flex-col sm:space-x-3 max-sm:justify-center max-sm:align-center max-sm:space-y-3">
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="professorRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professor Rating</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="professorDifficultyRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professor Difficulty Rating</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 max-sm:w-full">
            <FormField
              control={form.control}
              name="lectureRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecture Rating</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Between 1 and 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-primary-white/50 text-xs">
                Max 100 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea className="min-h-[150px]" {...field} />
              </FormControl>
              <FormDescription className="text-primary-white/50 text-xs">
                Max 10000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex align-center space-x-2 ml-auto">
          <LoaderButton
            isLoading={submitting}
            className="place-self-end max-w-fit transition-all duration-150 bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white"
            onClick={() => clearForm()}
            type="reset"
          >
            Reset
          </LoaderButton>
          <LoaderButton
            isLoading={submitting}
            className="max-w-fit transition-all duration-150 bg-primary-red hover:bg-primary-red hover:shadow-primary-red"
            type="submit"
          >
            Submit
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
