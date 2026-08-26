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

export async function getWorkspaceSnapshot(userId: string) {
  const { data: workspace, error } = await supabase
    .from("CreateWorkspace")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  if (error) throw error;

  if (!workspace) {
    return null;
  }

  const { count: collections } = await supabase
    .from("collections")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("workspace_id", workspace.id);

  const { data: collectionData } = await supabase
    .from("collections")
    .select("id")
    .eq("workspace_id", workspace.id);

  const collectionIds = collectionData?.map((item) => item.id) ?? [];

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
    .eq("workspace_id", workspace.id);

  return {
    name: workspace.name,

    collections: collections ?? 0,

    requests: requests ?? 0,

    environments: environments ?? 0,

    lastActivity: "Recently",
  };
}
