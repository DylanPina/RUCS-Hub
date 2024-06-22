import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { CURRENT_VERSION } from "@/lib/constants";
import { Separator } from "@/components/shadcn/ui/separator";

export default function FooterVersion() {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-bold flex align-center justify-center text-xs cursor-pointer hover:underline text-center">
                v{CURRENT_VERSION}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-black outline outline-1 outline-primary-white">
              Version
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="bg-primary-black text-primary-white max-w-[95%] w-[625px] overflow-auto max-h-[90vh] rounded">
        <DialogHeader>
          <DialogTitle className="font-bold text-center">
            Version History
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col space-y-4 text-primary-white overflow-auto">
          <div className="flex flex-col">
            <div className="flex space-x-2">
              <h3 className="font-bold">v{CURRENT_VERSION}</h3>
              <span className="text-primary-white/50"> June 19, 2024</span>
            </div>
            <ol className="list-disc list-outside ml-3 text-xs">
              <li>Added subscriptions for professors, courses, & reviews</li>
              <li>Added subscriptions page for managing subscriptions</li>
              <li>Added notifications panel to navigation bar</li>
              <li>
                Added notifications for subscribed professors, courses, &
                reviews
              </li>
            </ol>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col">
            <div className="flex space-x-2">
              <h3 className="font-bold">v1.0.0</h3>
              <span className="text-primary-white/50"> May 22, 2024</span>
            </div>
            <ol className="list-disc list-outside ml-3 text-xs">
              <li>Initial release</li>
            </ol>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
