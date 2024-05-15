"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
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
import { useState } from "react";

interface Props {
  course?: CoursePage;
  courses?: Course[];
  professor?: ProfessorPage;
  professors?: Professor[];
}

export default function ReviewCreateModal({
  course,
  courses,
  professor,
  professors,
}: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState<number[]>(getTerms());
  const [years, setYears] = useState<number[]>(getYears());

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
    courseRating: z.number({
      required_error: "You must select a course rating",
    }),
    courseDifficultyRating: z.number({
      required_error: "You must select a course difficulty rating",
    }),
    courseWorkload: z.number({
      required_error: "You must select a course workload",
    }),
    professorRating: z.number({
      required_error: "You must select a professor rating",
    }),
    professorDifficultyRating: z.number({
      required_error: "You must select a professor difficulty rating",
    }),
    lectureRating: z.number({
      required_error: "You must select a lecture rating",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
        <pre className="mt-2 w-[340px] rounded overflow-hidden-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-black max-w-[750px] max-md:w-[calc(100%-2rem)]">
        <DialogHeader className="m-auto">
          <DialogTitle className="text-center">Add Review</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3 w-full"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!course}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Course" />
                      </SelectTrigger>
                    </FormControl>
                    {!course && courses ? (
                      <SelectContent>
                        {courses.map((course: any) => (
                          <SelectItem
                            key={course.courseName}
                            value={`(${course.courseCode}) ${course.courseName}`}
                          >
                            {`(${course.courseCode}) ${course.courseName}`}
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
                  <FormLabel>Professor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!professor}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Professor" />
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
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Year" />
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
                      <FormLabel>Term</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Term" />
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
                      <FormLabel>Course Rating</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Course Rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (rating: number) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
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
                      <FormLabel>
                        Course Rating
                        <span className="text-primary-white/50 italic">
                          {" "}
                          optional
                        </span>
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (rating: number) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
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
                      <FormLabel>
                        Course Workload (avg. hours per week)
                        <span className="text-primary-white/50 italic">
                          {" "}
                          optional
                        </span>
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (rating: number) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
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
      </DialogContent>
    </Dialog>
  );
}
