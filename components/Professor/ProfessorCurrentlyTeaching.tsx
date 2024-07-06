"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  currentlyTeaching: number[];
}

export default function ProfessorCurrentlyTeaching({
  currentlyTeaching,
}: Props) {
  const router = useRouter();

  return (
    <div className="hidden lg:flex flex-col space-y-3">
      <h2>...</h2>
    </div>
    // <h3 className="text-md max-md:text-sm text-primary-white font-bold">
    //   Currently Teaching:{" "}
    //   <span className="font-normal">
    //     {currentlyTeaching.map(
    //       (
    //         subjectCode: string,
    //         code: number,
    //         index: number,
    //         array: number[],
    //       ) => (
    //         <React.Fragment key={code}>
    //           <span
    //             className="underline cursor-pointer"
    //             onClick={() => router.push(getCourseRoute(code))}
    //           >
    //             01:198:{code}
    //           </span>
    //           <span className="font-normal">
    //             {index < array.length - 1 && ", "}
    //           </span>
    //         </React.Fragment>
    //       ),
    //     )}
    //   </span>
    // </h3>
  );
}
