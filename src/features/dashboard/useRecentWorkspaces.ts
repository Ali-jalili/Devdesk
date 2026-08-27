/** @format */

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "@/app/context/useAuth";
import { getRecentWorkspaces } from "./DashboardService";

const historySnapshots = new Map<
  string,
  { rawValue: string | null; value: string[] }
>();

function getWorkspaceHistory(userId?: string) {
  if (!userId) return emptyHistory;

  const storageKey = `devdesk:workspace-history:${userId}`;
  const rawValue = localStorage.getItem(storageKey);
  const previousSnapshot = historySnapshots.get(userId);

  if (previousSnapshot?.rawValue === rawValue) {
    return previousSnapshot.value;
  }

  try {
    const value = JSON.parse(rawValue ?? "[]") as string[];
    historySnapshots.set(userId, { rawValue, value });
    return value;
  } catch {
    historySnapshots.set(userId, { rawValue, value: emptyHistory });
    return emptyHistory;
  }
}

const emptyHistory: string[] = [];

export default function useRecentWorkspaces() {
  const { user } = useAuth();
  const userId = user?.id;
  const workspaceIds = useSyncExternalStore(
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
    () => getWorkspaceHistory(userId),
    () => [],
  );

  const query = useQuery({
    queryKey: ["recent-workspaces", userId, workspaceIds],
    queryFn: () => getRecentWorkspaces(userId!, workspaceIds),
    enabled: Boolean(userId),
  });

  return {
    ...query,
    hasLocalHistory: workspaceIds.length > 0,
  };
}
