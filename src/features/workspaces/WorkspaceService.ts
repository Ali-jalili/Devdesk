/** @format */

import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

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

function getWorkspaces() {
  async function fetchWorkSpace() {
    const { data, error } = await supabase.from("CreateWorkspace").select("*");
    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchWorkSpace,
    queryKey: ["WorkSpace"],
  });

  return { data, isLoading, error };
}

export { createWorkspace, getWorkspaces };
