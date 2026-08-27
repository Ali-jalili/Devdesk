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

async function deleteWorkspace(workspaceId: string) {
  const { data: collections, error: collectionsError } = await supabase
    .from("collections")
    .select("id")
    .eq("workspace_id", workspaceId);

  if (collectionsError) throw new Error(collectionsError.message);

  const collectionIds = collections.map((collection) => collection.id);

  if (collectionIds.length > 0) {
    const { error: requestsError } = await supabase
      .from("requests")
      .delete()
      .in("collection_id", collectionIds);

    if (requestsError) throw new Error(requestsError.message);
  }

  const { data: environments, error: environmentsError } = await supabase
    .from("environments")
    .select("id")
    .eq("workspace_id", workspaceId);

  if (environmentsError) throw new Error(environmentsError.message);

  const environmentIds = environments.map((environment) => environment.id);

  if (environmentIds.length > 0) {
    const { error: variablesError } = await supabase
      .from("environment_variables")
      .delete()
      .in("environment_id", environmentIds);

    if (variablesError) throw new Error(variablesError.message);

    const { error: environmentsDeleteError } = await supabase
      .from("environments")
      .delete()
      .in("id", environmentIds);

    if (environmentsDeleteError) {
      throw new Error(environmentsDeleteError.message);
    }
  }

  if (collectionIds.length > 0) {
    const { error: collectionsDeleteError } = await supabase
      .from("collections")
      .delete()
      .in("id", collectionIds);

    if (collectionsDeleteError) {
      throw new Error(collectionsDeleteError.message);
    }
  }

  const { error } = await supabase
    .from("CreateWorkspace")
    .delete()
    .eq("id", workspaceId);
  if (error) throw new Error(error.message);
}

async function updateWorkspaceEnvironment(
  workspaceId: string,
  environmentId: string | null,
) {
  const { data, error } = await supabase
    .from("CreateWorkspace")
    .update({
      active_environment_id: environmentId,
    })
    .eq("id", workspaceId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  updateWorkspaceEnvironment,
};
