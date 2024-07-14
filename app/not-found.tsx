'use client'

import { Button } from '@/components/shadcn/ui/button';
import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    return (
      <div className="flex flex-col w-full items-center space-y-3">
        <h1 className="text-3xl text-primary-red font-bold">Not Found</h1>
        <p>You have ventured too far!</p>
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
            onClick={() => router.push("/courses")}
        >
          Home
        </Button>
      </div>
    );
}
  