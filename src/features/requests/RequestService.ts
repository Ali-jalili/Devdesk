/** @format */

import supabase from "@/lib/supabase";

async function createRequest({
  name,
  method,
  url,
  headers,
  params,
  body,
  description,
  collectionId,
}: {
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: string;
  description: string;
  collectionId: string;
}) {
  const { data, error } = await supabase.from("requests").insert({
    name: name,
    method: method,
    url: url,
    headers: headers,
    params: params,
    body: body,
    description: description,
    collection_id: collectionId,
  });

  return { data, error };
}

async function getRequests(collectionId: string) {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("collection_id", collectionId);

  if (error) throw new Error(error.message);

  return data;
}

async function getRequestById(requestId: string) {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("id", requestId)
    .single();
  if (error) throw new Error(error.message);

  return data;
}

export { createRequest, getRequests, getRequestById };
