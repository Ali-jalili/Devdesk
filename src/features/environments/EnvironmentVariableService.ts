/** @format */

import supabase from "@/lib/supabase";

export async function getVariables(environmentId: string) {
  const { data, error } = await supabase
    .from("environment_variables")
    .select("*")
    .eq("environment_id", environmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createVariable(data: {
  environment_id: string;
  key: string;
  value: string;
}) {
  const { data: variable, error } = await supabase
    .from("environment_variables")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return variable;
}
/**
 * آپدیت کردن یک Variable
 */

export async function updateVariable(
  variableId: string,
  data: {
    key: string;
    value: string;
  },
) {
  const { data: variable, error } = await supabase
    .from("environment_variables")
    .update(data)
    .eq("id", variableId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return variable;
}
