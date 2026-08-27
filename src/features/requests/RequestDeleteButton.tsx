/** @format */

import { useState } from "react";
import { toast } from "react-hot-toast";

import useDeleteRequest from "./hooks/useDeleteRequest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RequestDeleteButtonProps {
  requestId: string;
  onSuccess: () => void;
}

export default function RequestDeleteButton({
  requestId,
  onSuccess,
}: RequestDeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useDeleteRequest();

  function handleDelete() {
    mutate(requestId, {
      onSuccess() {
        toast.success("Request deleted");

        setOpen(false);
        onSuccess();
      },

      onError(error) {
        toast.error(error.message);
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        disabled={isPending}
        className="inline-flex items-center rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete Request"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Request?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This request will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
