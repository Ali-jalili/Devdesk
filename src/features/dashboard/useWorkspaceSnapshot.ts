/** @format */

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/context/useAuth";
import { getWorkspaceSnapshot } from "./DashboardService";

export default function useWorkspaceSnapshot() {
  const { user } = useAuth();
  const storageKey = user ? `devdesk:last-workspace:${user.id}` : null;
  const activeWorkspaceId = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("devdesk:last-workspace-changed", onStoreChange);
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener(
          "devdesk:last-workspace-changed",
          onStoreChange,
        );
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () => (storageKey ? localStorage.getItem(storageKey) : null),
    () => null,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-snapshot", user?.id, activeWorkspaceId],

    queryFn: () =>
      getWorkspaceSnapshot(user!.id, activeWorkspaceId ?? undefined),

    enabled: !!user,
  });

  return {
    data,
    isLoading,
    error,
  };
}
