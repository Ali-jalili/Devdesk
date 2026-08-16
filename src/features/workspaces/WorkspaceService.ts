/** @format */

import supabase from "@/lib/supabase";

async function createWorkspace(
  workspaceName: string,
  workspaceDescription: string,
) {
  const { data: authData } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("CreateWorkspace").insert({
    user_id: authData.user?.id,
    name: workspaceName,
    description: workspaceDescription,
  });

  return { data, error };
}

async function getWorkspaces() {
  const { data, error } = await supabase.from("CreateWorkspace").select("*");
  if (error) throw new Error(error.message);

  return data;
}

async function getWorkspaceById(workspaceId: string) {
  const { data, error } = await supabase
    .from("CreateWorkspace")
    .select("*")
    .eq("id", workspaceId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateWorkspace(
  workspaceId: string,
  newName: string,
  newDescription: string,
) {
  console.log("UPDATE SERVICE", {
    workspaceId,
    newName,
    newDescription,
  });
  const { data, error } = await supabase
    .from("CreateWorkspace")
    .update({
      name: newName,
      description: newDescription,
    })
    .eq("id", workspaceId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export { createWorkspace, getWorkspaces, getWorkspaceById, updateWorkspace };
