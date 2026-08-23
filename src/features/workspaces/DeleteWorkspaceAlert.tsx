/** @format */

import useDeleteWorkspace from "@/app/hook/useDeleteWorkspace";
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
import { useNavigate } from "react-router-dom";

interface DeleteWorkspaceAlertProps {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteWorkspaceAlert({
  workspaceId,
  open,
  onOpenChange,
}: DeleteWorkspaceAlertProps) {
  const { mutate, isPending } = useDeleteWorkspace();

  const navigate = useNavigate();

  function handleDeleteWorkspace() {
    mutate(
      { workspaceId },
      {
        onSuccess() {
          onOpenChange(false);
          navigate("/app/workspaces");
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
          <AlertDialogTitle> Delete Workspace?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteWorkspace}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkspaceAlert;
