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
    mutate({ collectionId, workspaceId });

    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete collection?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDeleteCollection}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCollectionAlert;
