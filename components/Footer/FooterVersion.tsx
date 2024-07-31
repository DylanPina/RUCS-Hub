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
import versionHistory from "@/version-history.json";
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
          {versionHistory.map((version: any, index: number) => (
            <React.Fragment key={version.version}>
              {index !== 0 && <Separator className="my-4" />}
              <div className="flex flex-col" key={version.version}>
                <div className="flex space-x-2">
                  <h3 className="font-bold">v{version.version}</h3>
                  <span className="text-primary-white/50"> {version.date}</span>
                </div>
                <ol className="list-disc list-outside ml-3 text-xs">
                  {version.changes.map((change: any) => (
                    <li key={change}>{change}</li>
                  ))}
                </ol>
              </div>
            </React.Fragment>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
