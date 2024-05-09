import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdDeleteForever } from "react-icons/md";
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
import { deleteUser } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function DeleteUserButtion() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleDeleteUser() {
    setLoading(true);
    deleteUser(user?.sub as string, user?.email as string);
    router.push("/api/auth/logout");
    toast.info("Your account has been deleted.");
    setLoading(false);
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger className="flex align-items-center">
              <LoaderButton
                isLoading={loading}
                className="bg-primary-white text-primary-black hover:bg-primary-red hover:shadow-primary-red hover:text-primary-white transition duration-150 ease-out "
              >
                Delete
              </LoaderButton>
            </DialogTrigger>
            <DialogContent className="bg-primary-black max-sm:rounded">
              <DialogHeader className="flex align-items-center">
                <DialogTitle className="text-center">
                  Deleting Account
                </DialogTitle>
                <DialogDescription className="text-center">
                  This action cannot be undone. Your account as well as all your
                  reviews and votes will be permanently deleted. Are you sure?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center space-x-2">
                <DialogClose asChild>
                  <LoaderButton
                    type="button"
                    isLoading={loading}
                    className="text-xs bg-primary-white text-primary-black transition-all duration-150 hover:bg-primary-white hover:font-bold hover:shadow-primary-white"
                  >
                    Cancel
                  </LoaderButton>
                </DialogClose>
                <LoaderButton
                  isLoading={loading}
                  onClick={handleDeleteUser}
                  className="bg-primary-white text-primary-black hover:bg-primary-red hover:shadow-primary-red hover:text-primary-white transition duration-150 ease-out "
                >
                  Delete
                </LoaderButton>
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-red">Delete</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
