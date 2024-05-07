"use client";

import { Button } from "@/components/shadcn/ui/button";
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
import { useToast } from "@/components/shadcn/ui/use-toast";
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
import { useEffect, useState, useTransition } from "react";
import { Input } from "../shadcn/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client";
import getProfessorsByCourse from "@/lib/actions/course";
import getCoursesByProfessor from "@/lib/actions/professor";
import { Textarea } from "../shadcn/ui/textarea";
import createReview from "@/lib/actions/review";
import { ReviewForm } from "@/lib/definitions/review";
import { LoaderButton } from "../shadcn/ui/loading-button";

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
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(
    courses ?? [],
  );
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>(
    professors ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const terms = getTerms();
  const years = getYears();

  useEffect(() => {
    if (course && professor) {
      startTransition(async () => {
        setFilteredProfessors(await getProfessorsByCourse(course.code));
        const filteredCourseCodes = await getCoursesByProfessor(professor.id);
        setFilteredCourses(
          courses?.filter((c) => filteredCourseCodes.includes(c.code)) ?? [],
        );
      });
    } else if (course) {
      startTransition(async () => {
        setFilteredProfessors(await getProfessorsByCourse(course.code));
      });
    } else if (professor) {
      startTransition(async () => {
        const filteredCourseCodes = await getCoursesByProfessor(professor.id);
        setFilteredCourses(
          courses?.filter((c) => filteredCourseCodes.includes(c.code)) ?? [],
        );
      });
    }
  }, [course, courses, professor, professors]);

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
      course: course ? `(${course.code}) ${course.name}` : "",
      professor: professor
        ? formatProfessorName(professor.lastName, professor.firstName)
        : "",
    },
  });

  function onCourseChange(course: any) {
    const courseCode = parseInt(course.split("(")[1].split(")")[0]);
    startTransition(async () => {
      setFilteredProfessors(await getProfessorsByCourse(courseCode));
    });
    form.setValue("course", course);
  }

  function onProfessorChange(professor: string) {
    const professorId = filteredProfessors?.find(
      (p) => formatProfessorName(p.lastName, p.firstName) === professor,
    )?.id;

    if (!professorId) return;

    startTransition(async () => {
      const filteredCourseCodes = await getCoursesByProfessor(professorId);
      setFilteredCourses(
        courses?.filter((c) => filteredCourseCodes.includes(c.code)) ?? [],
      );
    });
    form.setValue("professor", professor);
  }

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
    await createReview(data as ReviewForm, userId);

    toast({
      title: "Successfully submitted review:",
      className: "bg-primary-black text-primary-white",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset({
      year: "",
      term: "",
      title: "",
      content: "",
    });
    setSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 w-full max-w-screen-lg"
      >
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course *</FormLabel>
              <div className="flex items-center space-x-2">
                <Select
                  onValueChange={(value) => {
                    onCourseChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="placeholder-primary-white" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredCourses?.map((course: Course) => (
                      <SelectItem
                        key={course.code}
                        value={`(${course.code}) ${course.name}`}
                      >
                        {`(${course.code}) ${course.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={clearCourseSelection}
                  className="transition-all duration-150 bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white/90"
                >
                  Reset
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="professor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professor *</FormLabel>
              <div className="flex items-center space-x-2">
                <Select
                  onValueChange={(value) => {
                    onProfessorChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="placeholder-primary-white/50">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredProfessors?.map((professor: any) => (
                      <SelectItem
                        key={formatProfessorName(
                          professor.lastName,
                          professor.firstName,
                        )}
                        value={formatProfessorName(
                          professor.lastName,
                          professor.firstName,
                        )}
                      >
                        {formatProfessorName(
                          professor.lastName,
                          professor.firstName,
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={clearProfessorSelection}
                  className="transition-all duration-150 bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white/90"
                >
                  Reset
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    <SelectContent>
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
                    <SelectContent>
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
        <div className="flex space-x-3">
          <div className="w-1/3">
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
          <div className="w-1/3">
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
          <div className="w-1/3">
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
        <div className="flex space-x-3">
          <div className="w-1/3">
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
          <div className="w-1/3">
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
          <div className="w-1/3">
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
        <LoaderButton
          isLoading={submitting}
          className="place-self-end max-w-fit transition-all duration-150 bg-primary-red hover:bg-primary-red/90 hover:shadow-primary-red/90"
          type="submit"
        >
          Submit
        </LoaderButton>
      </form>
    </Form>
  );
}
