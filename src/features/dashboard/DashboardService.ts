/** @format */

import supabase from "@/lib/supabase";

async function getDashboardStats(userId: string) {
  const { data: workspaces, error } = await supabase
    .from("CreateWorkspace")
    .select("id")
    .eq("user_id", userId);

  if (error) throw error;

  const workspaceIds = workspaces.map((item) => item.id);

  if (!workspaceIds.length) {
    return {
      workspaces: 0,
      collections: 0,
      requests: 0,
      environments: 0,
    };
  }

  const { count: collections } = await supabase
    .from("collections")
    .select("id", {
      count: "exact",
      head: true,
    })
    .in("workspace_id", workspaceIds);

  const { data: collectionsData } = await supabase
    .from("collections")
    .select("id")
    .in("workspace_id", workspaceIds);

  const collectionIds = collectionsData?.map((item) => item.id) ?? [];

  const { count: requests } = await supabase
    .from("requests")
    .select("id", {
      count: "exact",
      head: true,
    })
    .in("collection_id", collectionIds);

  const { count: environments } = await supabase
    .from("environments")
    .select("id", {
      count: "exact",
      head: true,
    })
    .in("workspace_id", workspaceIds);

  return {
    workspaces: workspaceIds.length,

    collections: collections ?? 0,

    requests: requests ?? 0,

    environments: environments ?? 0,
  };
}

export default getDashboardStats;
