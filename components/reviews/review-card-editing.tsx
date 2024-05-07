import React, { useState } from "react";
import { Review, ReviewForm } from "@/lib/definitions/review";
import { Button } from "../shadcn/ui/button";
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
import { LoaderButton } from "../shadcn/ui/loading-button";

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
      courseRating: review.rating,
      courseDifficultyRating: review.difficultyRating,
      courseWorkload: review.workload,
      professorRating: review.professorQualityRating,
      professorDifficultyRating: review.professorDifficultyRating,
      lectureRating: review.lectureRating,
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
    };
    setUpdatedReview(updatedReview);
    toast.success("Successfully updated review!");
    setSubmitting(false);
    setEditing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3 p-2 outline outline-1 outline-primary-white rounded">
          <div className="flex flex-col w-full space-y-1">
            <h3 className="flex w-full text-sm text-primary-white font-semibold">
              Title:
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Input
                      {...field}
                      className="ml-2 text-xs max-w-[400px] h-5 focus-visible:ring-0"
                    />
                  </FormItem>
                )}
              ></FormField>
            </h3>
            <p className="text-xs text-primary-white/50">
              Course: {review.course.name}
            </p>
            <p className="text-xs text-primary-white/50">
              Professor:{" "}
              {formatProfessorName(
                review.professor.lastName,
                review.professor.firstName,
              )}
            </p>
            <p className="text-xs text-primary-white/50">
              Term: {getTermNameByValue(review.semester)} {review.year}
            </p>
            <p className="text-xs text-primary-white/50">
              Created at: {formatReviewDate(review.createdAt)}
            </p>
            {review.createdAt.toString() !== review.lastModified.toString() && (
              <p className="text-xs text-primary-white/50">
                Last modifed at: {formatReviewDate(review.lastModified)}
              </p>
            )}
          </div>
          <div className="flex space-x-10">
            <ul className="flex flex-col space-y-1 text-xs">
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">Course Rating:</span>
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">Course Difficulty:</span>
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">Course Workload:</span>
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
            <ul className="flex flex-col space-y-1 text-xs">
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">Professor:</span>
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
              <li className="flex flex-col space-y-1 text-xs">
                <span className="text-primary-white">Lectures:</span>
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
                          className="text-xs h-5 w-[100px] focus-visible:ring-0"
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
            <h3 className="text-sm text-primary-white font-semibold">
              Review:
            </h3>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="min-h-[150px] text-xs " {...field} />
                  </FormControl>
                  <FormDescription className="text-primary-white/50 text-xs">
                    Max 10000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-3">
            <LoaderButton
              type="submit"
              className="text-xs bg-primary-white text-primary-black transition-all duration-150 hover:bg-primary-white hover:font-bold hover:shadow-primary-black"
              isLoading={submitting}
            >
              Save
            </LoaderButton>
            <LoaderButton
              className="text-xs bg-primary-red hover:bg-primary-red transition-all duration-150 hover:font-bold hover:shadow-primary-black"
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
