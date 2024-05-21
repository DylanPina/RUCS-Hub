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
import { Course, Professor } from "@prisma/client";
import {
  formatProfessorName,
  getTermNameByValue,
  getTerms,
  getYears,
  hashEmailAddress,
} from "@/lib/utils";
import { useState } from "react";
import { Input } from "../shadcn/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Textarea } from "../shadcn/ui/textarea";
import createReview from "@/lib/actions/review";
import { ReviewForm } from "@/lib/definitions/review";
import { LoaderButton } from "../shadcn/ui/loader-button";
import { getIfUserReviewedCourse } from "@/lib/actions/user";
import { toast } from "react-toastify";
import { Button } from "../shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

interface Props {
  course?: Course | null;
  courses: Course[];
  professor?: Professor | null;
  professors: Professor[];
}

export default function ReviewCreateForm({
  course,
  courses,
  professor,
  professors,
}: Props) {
  const { user } = useUser();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(
    courses ?? [],
  );
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>(
    professors ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openProfessors, setOpenProfessors] = useState(false);
  const terms = getTerms();
  const years = getYears();

  const FormSchema = z.object({
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
      course: course ? `${course.code} - ${course.name}` : "",
      professor: professor
        ? formatProfessorName(professor.lastName, professor.firstName)
        : "",
    },
  });

  function clearCourseSelection() {
    setFilteredProfessors(professors ?? []);
    form.setValue("course", "");
  }

  function clearProfessorSelection() {
    setFilteredCourses(courses ?? []);
    form.setValue("professor", "");
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const userId = hashEmailAddress(user?.email as string);

    const courseCode = parseInt(data.course.split(" ")[0]);

    const alreadyReviewed = await getIfUserReviewedCourse(
      user?.email as string,
      courseCode,
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
        <div className="flex max-sm:flex-col sm:space-x-3 max-sm:justify-center max-sm:align-center max-sm:space-y-4 mt-3">
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
                    <Command className="bg-primary-black text-primary-white">
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="bg-primary-black text-primary-white">
                        {filteredCourses.map((course) => (
                          <CommandItem
                            value={`${course.code} - ${course.name}`}
                            key={course.name}
                            onSelect={() => {
                              form.setValue(
                                "course",
                                `${course.code} - ${course.name}`,
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
            name="professor"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
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
                    <Command className="bg-primary-black text-primary-white">
                      <CommandInput
                        placeholder="Search Professors"
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="bg-primary-black text-primary-white">
                        {filteredProfessors.map((professor) => (
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
        </div>
        <div className="flex space-x-3">
          <div className="w-1/2">
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
          </div>
          <div className="w-1/2">
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
