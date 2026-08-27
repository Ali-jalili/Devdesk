/** @format */

import { toast } from "react-hot-toast";

import useDeleteEnvironment from "@/app/hook/useDeleteEnvironment";

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

interface Props {
  environmentId: string;
}

export default function EnvironmentDeleteButton({ environmentId }: Props) {
  const { mutate, isPending } = useDeleteEnvironment();

  function handleDelete() {
    mutate(environmentId, {
      onSuccess() {
        toast.success("Environment deleted");
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
          <AlertDialogTitle>Delete Environment?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. All variables inside this environment
            will also be deleted.
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
