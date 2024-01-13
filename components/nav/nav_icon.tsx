"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import Link from "next/link";

interface NavIconProps {
  children: React.ReactNode;
  link: string;
  tooltip?: string;
}

export default function NavIcon({ children, link, tooltip }: NavIconProps) {
  return (
    <>
      {tooltip ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <Link href={link} className="focus:outline-none ">
                {children}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link href={link} className="focus:outline-none">
          {children}
        </Link>
      )}
    </>
  );
}
