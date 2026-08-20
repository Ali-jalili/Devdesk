/** @format */

import supabase from "@/lib/supabase";

async function createCollection({
  workspaceId,
  name,
  description,
}: {
  workspaceId: string;
  name: string;
  description: string;
}) {
  const { data, error } = await supabase.from("collections").insert({
    name: name,
    description: description,
    workspace_id: workspaceId,
  });

  return { data, error };
}

async function getCollections(workspaceId: string) {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) throw new Error(error.message);

  return data;
}

export { createCollection, getCollections };
