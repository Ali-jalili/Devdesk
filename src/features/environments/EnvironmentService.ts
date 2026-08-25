/** @format */

import supabase from "@/lib/supabase";

export async function createEnvironment(data: {
  name: string;
  workspace_id: string;
}) {
  const { data: environment, error } = await supabase
    .from("environments")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return environment;
}

export async function getEnvironments(workspaceId: string) {
  const { data, error } = await supabase
    .from("environments")
    .select("*")
    .eq("workspace_id", workspaceId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
