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
import { CoursePage } from "@/lib/definitions/course";
import { ProfessorPage } from "@/lib/definitions/professor";
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
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Input } from "../shadcn/ui/input";

interface Props {
  course?: CoursePage;
  courses?: Course[];
  professor?: ProfessorPage;
  professors?: Professor[];
}

export default function ReviewCreateForm({
  course,
  courses,
  professor,
  professors,
}: Props) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState<number[]>(getTerms());
  const [years, setYears] = useState<number[]>(getYears());

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

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
      .max(10, "Rating cannot exceed 10"),
    courseWorkload: z
      .number()
      .min(1, "Workload must be at least 1 hour")
      .max(60, "Workload cannot exceed 60 hours")
      .optional(),
    professorRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10 hours")
      .optional(),
    professorDifficultyRating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(10, "Rating cannot exceed 10 hours")
      .optional(),
    lectureRating: z
      .number()
      .min(1, "Rating must be at least 1 hour")
      .max(10, "Rating cannot exceed 10 hours")
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      course: course ? `(${course.courseCode}) ${course.courseName}` : "",
      professor: professor
        ? formatProfessorName(
            professor?.lastName || "",
            professor?.firstName || "",
          )
        : "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Successfully submitted review:",
      className: "bg-primary-black text-primary-white",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    setOpen(false);
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!!course}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="placeholder-primary-white" />
                  </SelectTrigger>
                </FormControl>
                {!course && courses ? (
                  <SelectContent>
                    {courses.map((course: Course) => (
                      <SelectItem
                        key={course.code}
                        value={`(${course.code}) ${course.name}`}
                      >
                        {`(${course.code}) ${course.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                ) : (
                  <SelectContent>
                    <SelectItem
                      key={course?.courseCode}
                      value={`(${course?.courseCode}) ${course?.courseName}`}
                    >
                      {`(${course?.courseCode}) ${course?.courseName}`}
                    </SelectItem>
                  </SelectContent>
                )}
              </Select>
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!!professor}
              >
                <FormControl>
                  <SelectTrigger className="placeholder-primary-white/50">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                {!professor && professors ? (
                  <SelectContent>
                    {professors.map((professor: any) => (
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
                ) : (
                  <SelectContent>
                    <SelectItem
                      key={formatProfessorName(
                        professor?.lastName || "",
                        professor?.firstName,
                      )}
                      value={formatProfessorName(
                        professor?.lastName || "",
                        professor?.firstName,
                      )}
                    >
                      {formatProfessorName(
                        professor?.lastName || "",
                        professor?.firstName,
                      )}
                    </SelectItem>
                  </SelectContent>
                )}
              </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year: number) => (
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {terms.map((term: number) => (
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
        <Button
          className="place-self-end max-w-fit transition-all duration-150 bg-primary-red hover:bg-primary-red/90 hover:shadow-primary-red/90"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
