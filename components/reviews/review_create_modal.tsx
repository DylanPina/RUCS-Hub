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
import { formatProfessorName } from "@/lib/utils";

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

  const FormSchema = z.object({
    course: z.string({
      required_error: "You must select a course",
    }),
    professor: z.string({
      required_error: "You must select a professor",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course: course?.courseName,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
                            value={course.courseName}
                          >
                            {course.courseName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        <SelectItem
                          key={course?.courseName}
                          value={course?.courseName || ""}
                        >
                          {course?.courseName}
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
