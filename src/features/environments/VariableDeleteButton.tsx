/** @format */

import { toast } from "react-hot-toast";

import useDeleteVariable from "@/app/hook/useDeleteVariable";

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

interface VariableDeleteButtonProps {
  variableId: string;
}

export default function VariableDeleteButton({
  variableId,
}: VariableDeleteButtonProps) {
  const { mutate, isPending } = useDeleteVariable();

  function handleDelete() {
    mutate(variableId, {
      onSuccess() {
        toast.success("Variable deleted");
      },

      onError(error) {
        toast.error(error.message);
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isPending}
        className="rounded-lg border border-destructive px-3 py-1 text-sm text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Variable?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This variable will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
