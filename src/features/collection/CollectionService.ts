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

export { createCollection };
