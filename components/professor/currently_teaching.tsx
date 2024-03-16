"use client";

import { getCourseRoute } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  currentlyTeaching: number[];
}

export default function CurrentlyTeaching({ currentlyTeaching }: Props) {
  const router = useRouter();

  return (
    <h3 className="text-md text-primary-white font-bold">
      Currently Teaching:{" "}
      <span className="font-normal">
        {currentlyTeaching.map(
          (courseCode: number, index: number, array: number[]) => (
            <React.Fragment key={courseCode}>
              <span
                className="underline cursor-pointer"
                onClick={() => router.push(getCourseRoute(courseCode))}
              >
                01:198:{courseCode}
              </span>
              <span className="font-normal">
                {index < array.length - 1 && ", "}
              </span>
            </React.Fragment>
          ),
        )}
      </span>
    </h3>
  );
}
