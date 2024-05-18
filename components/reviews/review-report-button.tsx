"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Review } from "@/lib/definitions/review";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { LoaderButton } from "../shadcn/ui/loader-button";
import { toast } from "react-toastify";
import { FaRegFlag } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { reportReasons } from "@/lib/definitions/report";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../shadcn/ui/textarea";

interface Props {
  review: Review;
}

export default function ReviewReportButton({ review }: Props) {
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    reason: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      reason: "",
      description: "",
    },
  });

  function onSubmit() {
    setLoading(true);
    setLoading(false);
    toast.info("Review reported");
    console.log(`Form: ${JSON.stringify(form.getValues())}`);
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger className="flex align-items-center">
              <FaRegFlag
                size={15}
                className="fill-primary-white hover:fill-primary-red transition duration-150 ease-in-out hover:ease-in"
              />
            </DialogTrigger>
            <Form {...form}>
              <DialogContent className="bg-primary-black max-sm:rounded overflow-hidden">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-3 w-full max-w-screen-lg"
                >
                  <DialogHeader className="flex align-items-center">
                    <DialogTitle className="text-center mb-2">
                      Submit a Report
                    </DialogTitle>
                    <DialogDescription className="flex flex-col space-y-2">
                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Select a reason for reporting:
                            </FormLabel>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full align-self-center text-primary-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {reportReasons.map((reason) => (
                                  <SelectItem key={reason} value={reason}>
                                    {reason}
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Include a brief description:</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-[150px] text-primary-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className="text-primary-white/50 text-xs">
                              Max 500 characters
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center space-x-2">
                    <DialogClose asChild>
                      <LoaderButton
                        type="button"
                        isLoading={loading}
                        className="text-xs bg-primary-white text-primary-black transition-all duration-150 hover:bg-primary-white hover:font-bold hover:shadow-primary-black"
                      >
                        Cancel
                      </LoaderButton>
                    </DialogClose>
                    <LoaderButton
                      isLoading={loading}
                      type="submit"
                      className="text-xs bg-primary-red hover:bg-primary-red transition-all duration-150 hover:font-bold hover:shadow-primary-black"
                    >
                      Submit
                    </LoaderButton>
                  </div>
                </form>
              </DialogContent>
            </Form>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-red">Report</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
