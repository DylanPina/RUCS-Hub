"use client";

import { Button } from "@/components/shadcn/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center space-y-4">
      <div className="flex flex-col space-y-2 place-items-center justify-center">
        <h1 className="text-4xl max-sm:text-2xl text-primary-red font-bold">
          Page Not Found
        </h1>
        <h4 className="text-md max-sm:text-sm font-semibold text-center text-primary-white">
          You have ventured too far!
        </h4>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          className={
            "bg-transparent text-primary-white hover:bg-primary-red/50 max-sm:text-xs max-sm:px-2 max-sm:py-1 hover:text-primary-white transition duration-150 ease-out hover:ease-in"
          }
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <Button
          variant="outline"
          className={
            "bg-transparent text-primary-white hover:bg-primary-red/50 max-sm:text-xs max-sm:px-2 max-sm:py-1 hover:text-primary-white transition duration-150 ease-out hover:ease-in"
          }
          onClick={() => router.push("/")}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
