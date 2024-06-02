import React, { useState } from "react";
import { Review, ReviewForm } from "@/lib/definitions/review";
import { Input } from "../shadcn/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  formatProfessorName,
  formatReviewDate,
  getTermNameByValue,
} from "@/lib/utils";
import { Textarea } from "../shadcn/ui/textarea";
import { updateReview } from "@/lib/actions/review";
import { toast } from "react-toastify";
import { LoaderButton } from "../shadcn/ui/loader-button";

interface Props {
  review: Review;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedReview: React.Dispatch<React.SetStateAction<Review>>;
}

export default function ReviewCardEditing({
  review,
  setEditing,
  setUpdatedReview,
}: Props) {
  const [submitting, setSubmitting] = useState(false);

  const FormSchema = z.object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title cannot exceed 100 characters"),
    courseRating: z
      .number()
      .min(1, "Rating must be greater than 0")
      .max(10, "Rating cannot exceed 10"),
    courseDifficultyRating: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    courseWorkload: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(60, "Workload cannot exceed 60 hours")
      .optional(),
    professorRating: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    professorDifficultyRating: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    lectureRating: z
      .number()
      .min(0, "Rating cannot be negative")
      .max(10, "Rating cannot exceed 10")
      .optional(),
    content: z
      .string()
      .min(1, "Review must have content")
      .max(10000, "Review cannot exceed 10000 characters"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: review.title,
      courseRating: review.rating ?? undefined,
      courseDifficultyRating: review.difficultyRating ?? undefined,
      courseWorkload: review.workload ?? undefined,
      professorRating: review.professorQualityRating ?? undefined,
      professorDifficultyRating: review.professorDifficultyRating ?? undefined,
      lectureRating: review.lectureRating ?? undefined,
      content: review.content,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    await updateReview(review.id, data as ReviewForm);
    const updatedReview = {
      ...review,
      title: data.title,
      rating: Number(data.courseRating),
      difficultyRating: Number(data.courseDifficultyRating),
      workload: Number(data.courseWorkload),
      professorQualityRating: Number(data.professorRating),
      professorDifficultyRating: Number(data.professorDifficultyRating),
      lectureRating: Number(data.lectureRating),
      content: data.content,
      lastModified: new Date(),
    };
    setUpdatedReview(updatedReview);
    toast.success("Successfully updated review!");
    setSubmitting(false);
    setEditing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 p-3 border border-primary-white rounded overflow-hidden">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full flex align-center !space-y-0">
                <Input
                  {...field}
                  className="w-full h-[28px] max-w-[600px] text-sm focus-visible:ring-0"
                />
              </FormItem>
            )}
          ></FormField>
          <div className="flex flex-col space-y-1">
            <p className="text-sm max-sm:text-xs text-primary-white/50">
              <span className="font-semibold">Course:</span>{" "}
              {review.course.name}
            </p>
            <p className="text-sm max-sm:text-xs text-primary-white/50">
              <span className="font-semibold">Professor: </span>
              {formatProfessorName(
                review.professor?.lastName ?? "",
                review.professor?.firstName,
              )}
            </p>
            <p className="text-sm max-sm:text-xs text-primary-white/50">
              <span className="font-semibold">Term:</span>{" "}
              {getTermNameByValue(review.semester)} {review.year}
            </p>
            <p className="text-sm max-sm:text-xs text-primary-white/50">
              <span className="font-semibold">Created At:</span>{" "}
              {formatReviewDate(review.createdAt)}
            </p>
            {review.createdAt.toString() !== review.lastModified.toString() && (
              <p className="text-sm  max-sm:text-xs text-primary-white/50">
                <span className="font-semibold"> Last Modified At:</span>{" "}
                {formatReviewDate(review.lastModified)}
              </p>
            )}
          </div>
          <div className="flex space-x-10">
            <ul className="flex flex-col space-y-1 text-sm max-sm:text-xs">
              <li className="flex flex-col space-y-1 text-sm max-sm:text-xs">
                <span className="text-primary-white font-semibold">
                  Course Rating:
                </span>
                <FormField
                  control={form.control}
                  name="courseRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex flex-col space-y-1 text-sm max-sm:text-xs">
                <span className="text-primary-white font-semibold">
                  Course Difficulty:
                </span>
                <FormField
                  control={form.control}
                  name="courseDifficultyRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex flex-col space-y-1 text-sm max-sm:text-xs">
                <span className="text-primary-white font-semibold">
                  Course Workload:
                </span>
                <FormField
                  control={form.control}
                  name="courseWorkload"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
            </ul>
            <ul className="flex flex-col space-y-1 text-sm max-sm:text-xs ">
              <li className="flex flex-col space-y-1">
                <span className="text-primary-white font-semibold">
                  Professor Rating:
                </span>{" "}
                <FormField
                  control={form.control}
                  name="professorRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex flex-col space-y-1">
                <span className="text-primary-white font-semibold">
                  Professor Difficulty:
                </span>
                <FormField
                  control={form.control}
                  name="professorDifficultyRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex flex-col space-y-1">
                <span className="text-primary-white font-semibold">
                  Lectures:
                </span>
                <FormField
                  control={form.control}
                  name="lectureRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                          className="text-sm max-sm:text-xs h-5 w-[100px] focus-visible:ring-0"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? "N/A"
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg text-primary-white font-bold">Review:</h3>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-sm min-h-[150px] max-sm:text-xs text-primary-white whitespace-pre-wrap !leading-5"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-sm max-sm:text-xs">
                    Max 10000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-3 !mt-4">
            <LoaderButton
              type="submit"
              className="text-sm max-sm:text-xs bg-primary-white text-primary-black transition-all duration-150 hover:bg-primary-white hover:font-bold hover:shadow-primary-black"
              disabled={!form.formState.isDirty}
              isLoading={submitting}
            >
              Save
            </LoaderButton>
            <LoaderButton
              className="text-sm max-sm:text-xs bg-primary-red hover:bg-primary-red transition-all duration-150 hover:font-bold hover:shadow-primary-black"
              onClick={() => setEditing(false)}
              isLoading={submitting}
            >
              Cancel
            </LoaderButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
