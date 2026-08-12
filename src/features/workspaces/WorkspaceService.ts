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

export default createWorkspace;
