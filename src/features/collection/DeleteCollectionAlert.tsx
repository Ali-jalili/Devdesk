/** @format */

import useDeleteCollection from "@/app/hook/useDeleteCollection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteCollectionAlertProps {
  collectionId: string;
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteCollectionAlert({
  collectionId,
  workspaceId,
  open,
  onOpenChange,
}: DeleteCollectionAlertProps) {
  const { mutate, isPending } = useDeleteCollection();

  function handleDeleteCollection() {
    mutate(
      { collectionId, workspaceId },
      {
        onSuccess() {
          onOpenChange(false);
          toast.success("Collection deleted successfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete collection?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteCollection}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCollectionAlert;
